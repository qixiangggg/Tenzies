import Die from "./components/Die"
import { useState } from "react"
import { nanoid } from "nanoid"

export default function App(){
  const [dice, setDice] = useState(generateAllNewDice())

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
      <div className="dice-container">
        {dice.map((die) => <Die key={die.id} id={die.id}value={die.value} isHeld={die.isHeld} hold={hold}/> )}
      </div>
      <button className="roll-dice" onClick={rollDice}>Roll</button>
    </main>
  )
}