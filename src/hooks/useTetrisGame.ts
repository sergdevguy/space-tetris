import { useCallback, useMemo, useState } from 'react'
import { DROP_MS_BY_LEVEL, LINES_PER_LEVEL } from '../constants'
import type { BoardGrid, GameStatus, Piece } from '../tetris/types'
import {
	clearFullLines,
	createEmptyBoard,
	getRandomPiece,
	getScoreForLineClear,
	hasCollision,
	mergePiece,
	tryRotate
} from '../tetris/engine'
import { useInterval } from './useInterval'

type Stats = {
	score: number
	level: number
	lines: number
}

function clampLevel(level: number) {
	return Math.max(0, Math.min(level, DROP_MS_BY_LEVEL.length - 1))
}

export function useTetrisGame() {
	const [status, setStatus] = useState<GameStatus>('idle')
	const [board, setBoard] = useState<BoardGrid>(() => createEmptyBoard())
	const [active, setActive] = useState<Piece>(() => getRandomPiece())
	const [next, setNext] = useState<Piece>(() => getRandomPiece())
	const [stats, setStats] = useState<Stats>({ score: 0, level: 0, lines: 0 })

	const dropMs = useMemo(() => {
		if (status !== 'running') return null
		return DROP_MS_BY_LEVEL[clampLevel(stats.level)] ?? 100
	}, [status, stats.level])

	const reset = useCallback(() => {
		setBoard(createEmptyBoard())
		setActive(getRandomPiece())
		setNext(getRandomPiece())
		setStats({ score: 0, level: 0, lines: 0 })
		setStatus('running')
	}, [])

	const togglePause = useCallback(() => {
		setStatus(s => {
			if (s === 'running') return 'paused'
			if (s === 'paused') return 'running'
			return s
		})
	}, [])

	const lockPiece = useCallback(
		(pieceToLock: Piece) => {
			const merged = mergePiece(board, pieceToLock)
			const { board: clearedBoard, cleared } = clearFullLines(merged)

			setBoard(clearedBoard)
			setStats(s => {
				const nextLines = s.lines + cleared
				const nextLevel = Math.floor(nextLines / LINES_PER_LEVEL)
				return {
					score: s.score + getScoreForLineClear(cleared, s.level),
					lines: nextLines,
					level: nextLevel
				}
			})

			const spawned = { ...next }
			setNext(getRandomPiece())

			if (hasCollision(clearedBoard, spawned)) {
				setStatus('gameover')
			}

			return spawned
		},
		[board, next]
	)

	const hardDrop = useCallback(() => {
		if (status !== 'running') return
		setActive(prev => {
			let candidate = prev
			while (!hasCollision(board, { ...candidate, y: candidate.y + 1 })) {
				candidate = { ...candidate, y: candidate.y + 1 }
			}
			return lockPiece(candidate)
		})
	}, [board, lockPiece, status])

	const move = useCallback(
		(dx: number) => {
			if (status !== 'running') return
			setActive(prev => {
				const candidate = { ...prev, x: prev.x + dx }
				return hasCollision(board, candidate) ? prev : candidate
			})
		},
		[board, status]
	)

	const softDrop = useCallback(() => {
		if (status !== 'running') return
		setActive(prev => {
			const moved = { ...prev, y: prev.y + 1 }
			if (!hasCollision(board, moved)) return moved
			return lockPiece(prev)
		})
	}, [board, lockPiece, status])

	const rotate = useCallback(() => {
		if (status !== 'running') return
		setActive(prev => tryRotate(board, prev))
	}, [board, status])

	useInterval(() => {
		if (status !== 'running') return
		setActive(prev => {
			const moved = { ...prev, y: prev.y + 1 }
			if (!hasCollision(board, moved)) return moved
			return lockPiece(prev)
		})
	}, dropMs)

	const visibleBoard = useMemo(() => mergePiece(board, active), [board, active])

	return {
		status,
		board: visibleBoard,
		active,
		next,
		stats,
		actions: {
			reset,
			togglePause,
			moveLeft: () => move(-1),
			moveRight: () => move(1),
			softDrop,
			hardDrop,
			rotate
		}
	}
}

