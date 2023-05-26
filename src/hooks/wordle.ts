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

  useEffect(() => {
    if (attempts >= maxAttempts) {
      setIsGameOver(true);
    }
  }, [attempts, maxAttempts]);

  const checkGuess = () => {
    // Add your logic here to check the guess against the word
    // and update the attempts, game over state, etc.
    // This could involve comparing the letters, tracking correct
    // and incorrect guesses, etc.
    const isAnswerAllowed = allowed.has(guess);
    if (isAnswerAllowed) {
      setGuess("");
      setAttempts(attempts + 1);
      if (word === guess) {
        setIsYouWin(true);
      }
    }
  };

  const resetGame = () => {
    setWord(getRandomWords());
    setGuess("");
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
  };
};

export default useWordle;
