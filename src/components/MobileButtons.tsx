import { Button } from './Button'
import './MobileButtons.css'

export function MobileButtons({
	actions
}: {
	actions: {
		moveLeft: () => void
		moveRight: () => void
		rotate: () => void
		softDrop: () => void
		hardDrop: () => void
	}
}) {
	return (
		<div className="MobileButtons">
			<div className="MobileButtons-row">
				<Button
					label="↓↓"
					onClick={actions.hardDrop}
				/>
				<Button
					label="↓"
					onClick={actions.softDrop}
				/>
				<Button
					label="←"
					onClick={actions.moveLeft}
				/>
			</div>
			<div className="MobileButtons-row">
				<Button
					label="↻"
					onClick={actions.rotate}
				/>
				<Button
					label="→"
					onClick={actions.moveRight}
				/>
			</div>
		</div>
	)
}
