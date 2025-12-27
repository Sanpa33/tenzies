import Die from "./Die.jsx";
import { useState } from "react";
import { nanoid } from "nanoid";

/**
 * Challenge:
 * Log "Game won!" to the console only if the 2 winning
 * conditions are met.
 *
 * 1. all the dice are being held, and
 * 2. all the dice have the same value
 *
 * For now, no need to even save a variable!
 */

export default function App() {
  const [dice, setDice] = useState(generateAllNewDice());

  const gameWon =
    dice.every((die) => die.isHeld) &&
    dice.every((die) => die.value === dice[0].value);

  function generateAllNewDice() {
    return new Array(10).fill(0).map(() => ({
      value: Math.ceil(Math.random() * 6),
      isHeld: false,
      id: nanoid(),
    }));
  }

  function hold(id) {
    setDice((prevDice) =>
      prevDice.map((dice) => {
        return dice.id == id ? { ...dice, isHeld: !dice.isHeld } : dice;
      })
    );
  }

  function rollDice() {
    setDice((prevDice) =>
      prevDice.map((dice) => {
        return dice.isHeld
          ? dice
          : { ...dice, value: Math.ceil(Math.random() * 6) };
      })
    );
  }

  const diceElements = dice.map((dieObj) => (
    <Die
      key={dieObj.id}
      value={dieObj.value}
      isHeld={dieObj.isHeld}
      hold={() => hold(dieObj.id)}
    />
  ));

  return (
    <main>
      <h1 className="title">Tenzies</h1>
      <p className="instructions">
        Roll until all dice are the same. Click each die to freeze it at its
        current value between rolls.
      </p>
      <div className="dice-container">{diceElements}</div>

      <button className="roll-dice" onClick={rollDice}>
        {gameWon ? "New game" : "Roll"}
      </button>
    </main>
  );
}
