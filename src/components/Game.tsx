import { useCallback } from 'react'
import { useTetrisGame } from '../hooks/useTetrisGame'
import { useWindowEvent } from '../hooks/useWindowEvent'
import { isTouchDevice } from '../utils'
import { Board } from './Board'
import { Button } from './Button'
import { ControlsHelp } from './ControlsHelp'
import { CutCorners } from './CutCorners'
import './Game.css'
import { Hud } from './Hud'
import { MobileButtons } from './MobileButtons'
import { NextPiece } from './NextPiece'

export function Game() {
	const { status, board, next, stats, actions } = useTetrisGame()

	const onKeyDown = useCallback(
		(ev: KeyboardEvent) => {
			const key = ev.key

			const preventFor = new Set([
				'ArrowLeft',
				'ArrowRight',
				'ArrowUp',
				'ArrowDown',
				' ',
				'Spacebar'
			])
			if (preventFor.has(key)) ev.preventDefault()

			if (status !== 'running') return

			if (key === 'ArrowLeft') return actions.moveLeft()
			if (key === 'ArrowRight') return actions.moveRight()
			if (key === 'ArrowUp') return actions.rotate()
			if (key === 'ArrowDown') return actions.softDrop()
			if (key === ' ' || key === 'Spacebar') return actions.hardDrop()
		},
		[actions, status]
	)

	useWindowEvent('keydown', onKeyDown, true)

	return (
		<div className="GameLayout">
			<div className="GameSide">
				<Hud
					score={stats.score}
					level={stats.level}
					lines={stats.lines}
				/>
				<div className="GameSide-tools">
					<NextPiece piece={next} />

					<div className="GameButtonsRow">
						{status === 'idle' ? (
							<Button
								label="Start"
								onClick={actions.reset}
							/>
						) : (
							<Button
								label={status === 'paused' ? 'Resume' : 'Pause'}
								onClick={actions.togglePause}
								disabled={status === 'gameover'}
							/>
						)}
					</div>
				</div>
			</div>

			<div className="GameMain">
				<Board board={board} />
				{(status === 'idle' || status === 'gameover') && (
					<div className="GameOverlay">
						<CutCorners>
							<div className="GameOverlay-card">
								<div className="GameOverlay-title">
									{status === 'gameover' ? 'Game Over' : 'Ready'}
								</div>
								<div className="GameOverlay-actions">
									<Button
										label={status === 'gameover' ? 'Restart' : 'Start'}
										onClick={actions.reset}
									/>
								</div>
								{status === 'idle' && <ControlsHelp />}
							</div>
						</CutCorners>
					</div>
				)}
				{isTouchDevice() && <MobileButtons actions={actions} />}
			</div>
		</div>
	)
}
