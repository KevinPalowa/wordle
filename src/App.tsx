import Keyboard from "./components/Keyboard";
import { WordBox } from "./components/WordBox";
import useWordle from "./hooks/wordle";

function App() {
  const wordle = useWordle();
  return (
    <div className="container mx-auto max-w-3xl">
      <button onClick={() => wordle.resetGame()}>Reset The game</button>
      <p>{`Your Attempt: ${wordle.attempts}`}</p>
      <p>{`The Word is: ${wordle.word}`}</p>
      <p>{`The History Word is: ${wordle.yourGuessed.join(", ")}`}</p>
      <p>{wordle.isYouWin && "Kamu Menang!!!"}</p>
      <p>{wordle.isGameOver && "Game Over :(("}</p>
      <div className="grid grid-cols-5 gap-2 max-w-xs mx-auto my-5">
        {Array.from(Array(6).keys()).map((verticalIndex) =>
          Array.from(Array(5).keys()).map((horizontalIndex) => (
            <WordBox
              key={horizontalIndex}
              variant={
                wordle.yourGuessed[verticalIndex]?.[horizontalIndex] ===
                wordle.word[horizontalIndex]
                  ? "success"
                  : "base"
              }
            >
              {wordle.attempts === verticalIndex &&
                wordle.guess[horizontalIndex]}
              {wordle.yourGuessed[verticalIndex]?.[horizontalIndex]}
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
