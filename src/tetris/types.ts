export type Cell = string | null

export type BoardGrid = Cell[][]

export type Piece = {
	key: string
	color: string
	shape: number[][]
	x: number
	y: number
}

export type GameStatus = 'idle' | 'running' | 'paused' | 'gameover'

