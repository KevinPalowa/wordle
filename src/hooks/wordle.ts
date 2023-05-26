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
  const [yourGuessed, setYourGuessed] = useState<string[]>([]);

  useEffect(() => {
    if (attempts >= maxAttempts) {
      setIsGameOver(true);
    }
  }, [attempts, maxAttempts]);

  const checkGuess = () => {
    const isAnswerAllowed = allowed.has(guess);
    if (isAnswerAllowed) {
      setGuess("");
      setYourGuessed([...yourGuessed, guess]);
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
