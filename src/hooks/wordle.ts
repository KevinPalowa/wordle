import { useState, useEffect } from "react";
import { allowed, words } from "../const/words";

const getRandomWords = () => words[Math.ceil(Math.random() * words.length)];
const useWordle = () => {
  const [word, setWord] = useState(getRandomWords());
  const [guess, setGuess] = useState("");
  const [attempts, setAttempts] = useState(0);
  const [maxAttempts] = useState(6);
  const [isGameOver, setIsGameOver] = useState(false);
  const [isYouWin, setIsYouWin] = useState(false);
  const [yourGuessed, setYourGuessed] = useState<
    { word: string; state: string }[]
  >([]);

  useEffect(() => {
    if (attempts >= maxAttempts) {
      setIsGameOver(true);
    }
  }, [attempts, maxAttempts]);

  const checkGuess = () => {
    const isAnswerAllowed = allowed.has(guess);
    if (isAnswerAllowed) {
      setGuess("");
      /* setYourGuessed([...yourGuessed, guess]); */
      const foo = Array(5).fill("_");
      const soo = Array.from(word);
      for (let index = 0; index < word.length; index++) {
        if (word[index] === guess[index]) {
          foo[index] = "x";
          soo[index] = " ";
        }
      }

      for (let i = 0; i < 5; i += 1) {
        if (foo[i] === "_") {
          const index = soo.indexOf(guess[i]);
          if (index !== -1) {
            foo[i] = "c";
            soo[index] = " ";
          }
        }
      }
      setYourGuessed([...yourGuessed, { word: guess, state: foo.join("") }]);
      /* console.log(foo.join(""), soo.join("")); */
      setAttempts(attempts + 1);
      if (word === guess) {
        setIsYouWin(true);
      }
    }
  };

  const resetGame = () => {
    setWord(getRandomWords());
    setGuess("");
    setYourGuessed([]);
    setAttempts(0);
    setIsGameOver(false);
    setIsYouWin(false);
  };

  return {
    word,
    setWord,
    guess,
    setGuess,
    attempts,
    maxAttempts,
    isGameOver,
    checkGuess,
    resetGame,
    isYouWin,
    yourGuessed,
  };
};

export default useWordle;
