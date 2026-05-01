import './Hud.css'

export function Hud({
	score,
	level,
	lines
}: {
	score: number
	level: number
	lines: number
}) {
	return (
		<div className="Hud">
			<div className="Hud-stat">
				<div className="Hud-label">Score</div>
				<div className="Hud-value">{score}</div>
			</div>
			<div className="Hud-stats">
				<div className="Hud-stat">
					<div className="Hud-label">Level</div>
					<div className="Hud-value">{level}</div>
				</div>
				<div className="Hud-stat">
					<div className="Hud-label">Lines</div>
					<div className="Hud-value">{lines}</div>
				</div>
			</div>
		</div>
	)
}
