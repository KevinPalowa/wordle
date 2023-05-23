import { useState } from "react";
import Keyboard from "./components/Keyboard";
import { words } from "./const/words";

function App() {
  const [wordToGuess, _] = useState(
    words[Math.ceil(Math.random() * words.length)]
  );
  return (
    <div className="container mx-auto max-w-3xl">
      {wordToGuess}
      <div className="grid grid-cols-5 gap-2 max-w-xs mx-auto my-5">
        {Array.from(Array(30).keys()).map(() => (
          <div className="bg-gray-200 h-12 rounded-md flex items-center justify-center font-bold text-xl">
            A
          </div>
        ))}
      </div>
      <Keyboard />
    </div>
  );
}

export default App;
