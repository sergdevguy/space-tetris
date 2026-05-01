export function CutCorners({ children }: { children: React.ReactNode }) {
	return (
		<div className="cut-corners-wrapper cut-corners">
			<div className="cut-corners">{children}</div>
		</div>
	)
}
