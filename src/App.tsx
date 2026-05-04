import { useState } from 'react'
import './App.css'
import { Game } from './components/Game'
import { Intro } from './components/Intro'

export function App() {
	const [introDone, setIntroDone] = useState(false)

	function handlerOnFinish() {
		setIntroDone(true)
	}

	return (
		 <>
		 <Game />
      {!introDone && <Intro onFinish={handlerOnFinish} />}
    </>
	)
}
