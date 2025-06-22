import Die from "./components/Die"
import { useState } from "react"
import { nanoid } from "nanoid"

export default function App(){
  const [dice, setDice] = useState(generateAllNewDice())
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
  return (
    <main>
      <h1 className="title">Tenzies</h1>
      <p className="instructions">Roll until all dice are the same. Click each die to freeze it at its current value between rolls.</p>
      <div className="dice-container">
        {dice.map((die) => <Die key={die.id} id={die.id}value={die.value} isHeld={die.isHeld} hold={hold}/> )}
      </div>
      <button className="roll-dice" onClick={rollDice}>
        {gameWon? "New Game": "Roll"}
      </button>
    </main>
  )
}