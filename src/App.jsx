import Die from "./Die.jsx";
import { useState } from "react";
import { nanoid } from "nanoid";

/**
 * Critical thinking time!
 *
 * We want to indicate to the user that the game is over
 * if (1) all the dice are held, and (2) all the dice have
 * the same value.
 *
 * How might we do this? Some questions to consider:
 *
 * 1. Do we need to save a `gameWon` value in state? If so, why?
 *    If not, why not?
 *
 *
 *
 * 2. Do we need to create a side effect to synchronize the `gameWon`
 *    value (whether it's in state or not) with the current state of
 *    the dice?
 *
 *
 * Conclusion:
 *
 *
 *
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
        Roll
      </button>
    </main>
  );
}
