    /**
     * Challenge: Update the array of numbers in state to be
     * an array of objects instead. Each object should look like:
     * { value: <random number>, isHeld: false }
     * 
     * Making this change will break parts of our code, so make
     * sure to update things so we're back to a working state
     */

import Die from './Die.jsx'
import {useState} from 'react'


export default function App() {
    
    function generateAllNewDice() {

        return new Array(10)
            .fill(0)
            .map(() => Math.floor(Math.random() * 6))
        
    }

    const [dice, setDice] = useState(generateAllNewDice())

    function rollDice() {
        setDice(generateAllNewDice())
    }


    const diceElements = dice.map((value, index) => (
        <Die key={index} value={value} />
    ))

    


    return (
        <main>
            <div className="dice-container">
                {diceElements}
            </div>

            <button className="roll-dice" onClick={rollDice}>Roll</button>

        </main>
    )
}