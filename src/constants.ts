export const BOARD_SIZE = {
	width: 10,
	height: 20
}

export const TETROMINOES = {
	I: {
		color: '#FF4444',
		shape: [
			[0, 0, 0, 0],
			[1, 1, 1, 1],
			[0, 0, 0, 0],
			[0, 0, 0, 0]
		]
	},
	J: {
		color: '#FFBB33',
		shape: [
			[1, 0, 0],
			[1, 1, 1],
			[0, 0, 0]
		]
	},
	L: {
		color: '#00C851',
		shape: [
			[0, 0, 1],
			[1, 1, 1],
			[0, 0, 0]
		]
	},
	O: {
		color: '#33B5E5',
		shape: [
			[1, 1],
			[1, 1]
		]
	},
	S: {
		color: '#AA66CC',
		shape: [
			[0, 1, 1],
			[1, 1, 0],
			[0, 0, 0]
		]
	},
	T: {
		color: '#FF8800',
		shape: [
			[0, 1, 0],
			[1, 1, 1],
			[0, 0, 0]
		]
	},
	Z: {
		color: '#2BBBAD',
		shape: [
			[1, 1, 0],
			[0, 1, 1],
			[0, 0, 0]
		]
	}
}

export const LINE_CLEAR_SCORES: Record<number, number> = {
	1: 100,
	2: 300,
	3: 500,
	4: 800
}

export const LINES_PER_LEVEL = 10

export const DROP_MS_BY_LEVEL = [
	800, 700, 600, 520, 450, 380, 320, 260, 210, 170, 140, 115, 95, 80, 70
]
