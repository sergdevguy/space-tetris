import { gsap } from 'gsap'
import { useEffect, useRef } from 'react'
import { isTouchDevice } from '../utils'

const CELL = isTouchDevice() ? 12 : 24

const layout = [
	[1, 1, 1, 0, 1, 1, 1, 0, 1, 1, 1, 0, 1, 1, 1, 0, 1, 0, 1, 1, 1],
	[0, 1, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 1, 0, 1, 0, 1, 0, 1, 0, 0],
	[0, 1, 0, 0, 1, 1, 1, 0, 0, 1, 0, 0, 1, 1, 1, 0, 1, 0, 1, 1, 1],
	[0, 1, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 1, 1, 0, 0, 1, 0, 0, 0, 1],
	[0, 1, 0, 0, 1, 1, 1, 0, 0, 1, 0, 0, 1, 0, 1, 0, 1, 0, 1, 1, 1]
]

export function Intro({ onFinish }: { onFinish: () => void }) {
	const containerRef = useRef<HTMLDivElement>(null)

	useEffect(() => {
		const ctx = gsap.context(() => {
			const blocks: HTMLElement[] = gsap.utils.toArray('.block')

			const tl = gsap.timeline({
				onComplete: onFinish
			})

			// падение
			tl.fromTo(
				blocks,
				{
					y: -200,
					opacity: 0
				},
				{
					y: 0,
					opacity: 1,
					duration: 0.4,
					ease: 'bounce.out',
					stagger: {
						each: 0.01,
						from: 'random'
					}
				}
			)

			// удар
			tl.to(blocks, {
				scale: 1.05,
				duration: 0.1,
				yoyo: true,
				repeat: 1
			})

			// пауза
			tl.to({}, { duration: 1 })

			// исчезновение
			tl.to(containerRef.current, {
				opacity: 0,
				duration: 0.5,
				ease: 'power2.out',
				onComplete: onFinish
			})
		}, containerRef)

		return () => ctx.revert()
	}, [onFinish])

	return (
		<div
			ref={containerRef}
			style={{
				position: 'absolute',
				inset: 0,
				display: 'flex',
				justifyContent: 'center',
				alignItems: 'center',
				background: '#0f0f0f',
				overflow: 'hidden',
				zIndex: '1000'
			}}
		>
			<div
				style={{
					display: 'grid',
					gridTemplateColumns: `repeat(${layout[0].length}, ${CELL}px)`,
					gap: 4
				}}
			>
				{layout.flatMap((row, y) =>
					row.map((cell, x) => {
						if (!cell) {
							return (
								<div
									key={`${x}-${y}`}
									style={{ width: CELL, height: CELL }}
								/>
							)
						}

						return (
							<div
								key={`${x}-${y}`}
								className="block"
								style={{
									width: CELL,
									height: CELL,
									background: 'var(--cell-color)',
									borderRadius: 2,
									opacity: 0
								}}
							/>
						)
					})
				)}
			</div>
		</div>
	)
}
