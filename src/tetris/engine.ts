import type { BoardGrid, Piece } from './types'
import { BOARD_SIZE, LINE_CLEAR_SCORES, TETROMINOES } from '../constants'

export function createEmptyBoard(): BoardGrid {
	return Array.from({ length: BOARD_SIZE.height }, () =>
		Array.from({ length: BOARD_SIZE.width }, () => null)
	)
}

export function cloneBoard(board: BoardGrid): BoardGrid {
	return board.map(row => row.slice())
}

export function rotateMatrixCW(matrix: number[][]): number[][] {
	const h = matrix.length
	const w = matrix[0]?.length ?? 0
	const rotated: number[][] = Array.from({ length: w }, () =>
		Array.from({ length: h }, () => 0)
	)

	for (let y = 0; y < h; y++) {
		for (let x = 0; x < w; x++) {
			rotated[x][h - 1 - y] = matrix[y][x]
		}
	}

	return rotated
}

export function getRandomPiece(rng: () => number = Math.random): Piece {
	const entries = Object.entries(TETROMINOES)
	const [key, def] = entries[Math.floor(rng() * entries.length)]

	// Spawn near top-middle.
	const shape = def.shape
	const x = Math.floor((BOARD_SIZE.width - shape[0].length) / 2)
	const y = -getTopPadding(shape)

	return { key, color: def.color, shape, x, y }
}

function getTopPadding(shape: number[][]) {
	let padding = 0
	for (let y = 0; y < shape.length; y++) {
		if (shape[y].some(v => v !== 0)) break
		padding++
	}
	return padding
}

export function hasCollision(board: BoardGrid, piece: Piece): boolean {
	const { shape, x: px, y: py } = piece

	for (let y = 0; y < shape.length; y++) {
		for (let x = 0; x < shape[y].length; x++) {
			if (!shape[y][x]) continue

			const bx = px + x
			const by = py + y

			if (bx < 0 || bx >= BOARD_SIZE.width) return true
			if (by >= BOARD_SIZE.height) return true

			// allow being above the board (negative y) during spawn
			if (by >= 0 && board[by][bx] !== null) return true
		}
	}

	return false
}

export function mergePiece(board: BoardGrid, piece: Piece): BoardGrid {
	const next = cloneBoard(board)
	const { shape, x: px, y: py, color } = piece

	for (let y = 0; y < shape.length; y++) {
		for (let x = 0; x < shape[y].length; x++) {
			if (!shape[y][x]) continue
			const bx = px + x
			const by = py + y
			if (by < 0) continue
			if (by >= BOARD_SIZE.height) continue
			if (bx < 0 || bx >= BOARD_SIZE.width) continue
			next[by][bx] = color
		}
	}

	return next
}

export function clearFullLines(board: BoardGrid): { board: BoardGrid; cleared: number } {
	const remaining = board.filter(row => row.some(cell => cell === null))
	const cleared = BOARD_SIZE.height - remaining.length
	if (cleared === 0) return { board, cleared: 0 }

	const newRows: BoardGrid = Array.from({ length: cleared }, () =>
		Array.from({ length: BOARD_SIZE.width }, () => null)
	)

	return { board: [...newRows, ...remaining], cleared }
}

export function getScoreForLineClear(linesCleared: number, level: number): number {
	const base = LINE_CLEAR_SCORES[linesCleared] ?? 0
	return base * (level + 1)
}

export function tryRotate(board: BoardGrid, piece: Piece): Piece {
	const rotatedShape = rotateMatrixCW(piece.shape)

	// Basic wall-kicks: try small horizontal offsets.
	const kicks = [0, -1, 1, -2, 2]
	for (const dx of kicks) {
		const candidate: Piece = { ...piece, shape: rotatedShape, x: piece.x + dx }
		if (!hasCollision(board, candidate)) return candidate
	}

	return piece
}

