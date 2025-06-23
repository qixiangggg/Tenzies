import Die from "./components/Die"
import { useState,useRef,useEffect } from "react"
import { nanoid } from "nanoid"
import { useWindowSize } from "react-use"
import Confetti from "react-confetti"
export default function App(){
  const [dice, setDice] = useState(() => generateAllNewDice())
  const { width, height } = useWindowSize()
  const rollButton = useRef(null)
  let gameWon = 
    dice.every(die => die.isHeld) && 
    dice.every(die => die.value === dice[0].value)

  function rollDice(){
    setDice(prev => prev.map(prevDie =>
      prevDie.isHeld ? prevDie : ({...prevDie, value: Math.floor(Math.random() * 6) + 1})
    ))
  }
  function generateAllNewDice(){
        const dice = []

        for (let i = 0; i < 10; i++){
          const randomNumber = Math.floor(Math.random() * 6) + 1
          const die = {
            value: randomNumber,
            isHeld: false,
            id: nanoid()
          }
          dice.push(die);
        }
        return dice
    }

  function hold(id){
    setDice(prev => prev.map(prevDie =>
      prevDie.id === id ? {...prevDie, isHeld: !prevDie.isHeld}: prevDie))
  }  

  function newGame(){
    setDice(generateAllNewDice())
  }

  useEffect(() => {
    if (gameWon){
      rollButton.current.focus()
    }
  },[gameWon])
  
  return (
    <main>
      <h1 className="title">Tenzies</h1>
      <p className="instructions">Roll until all dice are the same. Click each die to freeze it at its current value between rolls.</p>
      <div className="dice-container">
        {dice.map((die) => <Die key={die.id} id={die.id}value={die.value} isHeld={die.isHeld} hold={hold}/> )}
      </div>
      <button className="roll-dice" onClick={gameWon? newGame : rollDice} ref={rollButton}>
        {gameWon? "New Game": "Roll"}
      </button>
      {gameWon && <Confetti width={width} height={height}/>}
      <div aria-live="polite" className="sr-only">
        {gameWon && <p>Congratulations! You won! Press "New Game" to start again.</p>}
      </div>
    </main>
  )
}