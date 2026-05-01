import type { Piece } from '../tetris/types'
import './NextPiece.css'

export function NextPiece({ piece }: { piece: Piece }) {
	const sizeX = piece.shape[0]?.length || 0
	const sizeY = 2
	const grid = Array.from({ length: sizeY }, (_, y) =>
		Array.from({ length: sizeX }, (_, x) =>
			piece.shape[y]?.[x] ? piece.color : null
		)
	)

	return (
		<div className="NextPiece">
			<div className="NextPiece-title">NEXT</div>
			<div className="cut-corners-wrapper cut-corners">
				<div className="NextPiece-content cut-corners">
					<div
						className="NextPiece-grid"
						style={{ gridTemplateColumns: `repeat(${sizeX}, 20px)` }}
					>
						{grid.flatMap((row, y) =>
							row.map((cell, x) => (
								<div
									key={`${y}-${x}`}
									className="NextPiece-cell"
									style={cell ? { background: 'var(--cell-color)' } : undefined}
								/>
							))
						)}
					</div>
				</div>
			</div>
		</div>
	)
}
