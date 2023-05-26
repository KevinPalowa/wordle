import Keyboard from "./components/Keyboard";
import { WordBox } from "./components/WordBox";
import useWordle from "./hooks/wordle";

function App() {
  const wordle = useWordle();
  console.log(wordle);
  return (
    <div className="container mx-auto max-w-3xl">
      <button onClick={() => wordle.resetGame()}>Reset The game</button>
      <p>{`Your Attempt: ${wordle.attempts}`}</p>
      <p>{`The Word is: ${wordle.word}`}</p>
      <p>{wordle.isYouWin && "Kamu Menang!!!"}</p>
      <p>{wordle.isGameOver && "Game Over :(("}</p>
      <div className="grid grid-cols-5 gap-2 max-w-xs mx-auto my-5">
        {Array.from(Array(6).keys()).map((verticalIndex) =>
          Array.from(Array(5).keys()).map((horizontalIndex) => (
            <WordBox
              key={horizontalIndex}
              variant={
                wordle.guess[horizontalIndex] ===
                  wordle.word[horizontalIndex] &&
                wordle.attempts === verticalIndex &&
                wordle.guess[horizontalIndex]
                  ? "success"
                  : "base"
              }
            >
              {wordle.attempts === verticalIndex &&
                wordle.guess[horizontalIndex]}
            </WordBox>
          ))
        )}
      </div>
      <Keyboard
        onSubmit={(word) => {
          wordle.setGuess(word);
          wordle.checkGuess();
        }}
        value={wordle.guess}
        setValue={wordle.setGuess}
        disabled={wordle.isGameOver || wordle.isYouWin}
      />
    </div>
  );
}

export default App;
