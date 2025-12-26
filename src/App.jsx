import Die from './Die.jsx'
import {useState} from 'react'


export default function App() {
    
    function generateAllNewDice() {

        return new Array(10)
            .fill(0)
            .map(() => ({value: Math.ceil(Math.random() * 6), isHeld: false}))
        
    }


    const [dice, setDice] = useState(generateAllNewDice())

    function rollDice() {
        setDice(generateAllNewDice())
    }

    console.log(dice)


    const diceElements = dice.map((diceObj, index) => (
        <Die key={index} value={diceObj.value} />
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