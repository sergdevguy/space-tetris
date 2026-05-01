import type { BoardGrid } from '../tetris/types'
import './Board.css'

export function Board({ board }: { board: BoardGrid }) {
	return (
		<div className="cut-corners-wrapper cut-corners">
			<div
				className="Board cut-corners"
				style={{
					gridTemplateColumns: `repeat(${board[0]?.length ?? 0}, var(--cell))`
				}}
			>
				{board.flatMap((row, y) =>
					row.map((cell, x) => (
						<div
							key={`${y}-${x}`}
							className="Cell"
							style={
								cell
									? ({
											background: 'var(--cell-color)',
											borderRadius: '4px',
											border: '1px solid #04090c'
										} as const)
									: undefined
							}
						/>
					))
				)}
			</div>
		</div>
	)
}
