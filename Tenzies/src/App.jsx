import Die from "./components/Die"
import { useState } from "react"

export default function App(){
  const [diceNumbers, setDiceNumbers] = useState(generateAllNewDice())

  function rollDice(){
    setDiceNumbers(generateAllNewDice())
  }
  function generateAllNewDice(){
        const randomNumbers = []

        for (let i = 0; i < 10; i++){
            randomNumbers.push(Math.floor(Math.random() * 6) + 1);
        }
        return randomNumbers
    }
    
  return (
    <main>
      <div className="dice-container">
        {diceNumbers.map((diceNumber) => <Die value={diceNumber}/>)}
      </div>
      <button className="roll-dice" onClick={rollDice}>Roll</button>
    </main>
  )
}