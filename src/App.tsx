import Keyboard from "./components/Keyboard";
import { WordBox } from "./components/WordBox";
import useWordle from "./hooks/wordle";

function App() {
  const wordle = useWordle();
  const getClassName = (param: string): "base" | "warning" | "success" => {
    switch (param) {
      case "x":
        return "success";
      case "c":
        return "warning";
      default:
        return "base";
    }
  };
  return (
    <div className="container mx-auto max-w-3xl">
      <button onClick={() => wordle.resetGame()}>Reset The game</button>
      <p>{wordle.isYouWin && "Kamu Menang!!!"}</p>
      <p>{wordle.isGameOver && "Game Over :(("}</p>
      <div className="grid grid-cols-5 gap-2 max-w-xs mx-auto my-5">
        {Array.from(Array(wordle.maxAttempts).keys()).map((verticalIndex) =>
          Array.from(Array(5).keys()).map((horizontalIndex) => (
            <WordBox
              key={horizontalIndex}
              variant={getClassName(
                wordle.yourGuessed[verticalIndex]?.state[horizontalIndex]
              )}
            >
              {wordle.attempts === verticalIndex &&
                wordle.guess[horizontalIndex]}
              {wordle.yourGuessed[verticalIndex]?.word[horizontalIndex]}
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
