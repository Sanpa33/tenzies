import Die from "./Die.jsx";
import { useState } from "react";
import { nanoid } from "nanoid";

/**
 * Challenge: Update the `hold` function to flip
 * the `isHeld` property on the object in the array
 * that was clicked, based on the `id` prop passed
 * into the function.
 *
 * Hint: as usual, there's more than one way to
 * accomplish this.
 */

export default function App() {
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

  const [dice, setDice] = useState(generateAllNewDice());

  function rollDice() {
    setDice(generateAllNewDice());
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
      <div className="dice-container">{diceElements}</div>

      <button className="roll-dice" onClick={rollDice}>
        Roll
      </button>
    </main>
  );
}
