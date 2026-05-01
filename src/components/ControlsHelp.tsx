import './ControlsHelp.css'

export function ControlsHelp() {
	return (
		<div className="ControlsHelp">
			<div className="ControlsHelp-title">Controls</div>
			<ul className="ControlsHelp-list">
				<li className="ControlsHelp-item">
					<div>
						<span className="ControlsHelp-key">←</span>
						<span className="ControlsHelp-key">→</span>
					</div>
					Move
				</li>
				<li className="ControlsHelp-item">
					<span className="ControlsHelp-key">↑</span> Rotate
				</li>
				<li className="ControlsHelp-item">
					<span className="ControlsHelp-key">↓</span> Soft drop
				</li>
				<li className="ControlsHelp-item">
					<span className="ControlsHelp-key">Space</span> Hard drop
				</li>
			</ul>
		</div>
	)
}
