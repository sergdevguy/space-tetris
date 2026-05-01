import { CutCorners } from './CutCorners'

export function Button({
	label,
	disabled,
	onClick
}: {
	label: string
	disabled?: boolean
	onClick: () => void
}) {
	return (
		<CutCorners>
			<button
				className="GameButton"
				disabled={disabled}
				onClick={onClick}
			>
				{label}
			</button>
		</CutCorners>
	)
}
