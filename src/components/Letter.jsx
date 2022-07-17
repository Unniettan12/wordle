import { useContext } from "react";
import { AppContext } from "../App";
import React from "react";
const Letter = ({ letterPos, attempVal }) => {
  const { board, correctWord, currAttempt, isCorrect } = useContext(AppContext);
  const letter = board[attempVal][letterPos];

  const correct = correctWord[letterPos] === letter;
  const almost = !correct && letter !== "" && correctWord.includes(letter);
  const wrong = letter !== "" && !correctWord.includes(letter);

  const bgcolor = correct
    ? "Letter flex justify-center items-center border border-white h-16 w-16 mx-1 bg-[#538D4E]"
    : almost
    ? "Letter flex justify-center items-center border border-white h-16 w-16 mx-1 bg-[#B59F3B]"
    : wrong
    ? "Letter flex justify-center items-center border border-white h-16 w-16 mx-1 bg-[#3A3A3C]"
    : "Letter flex justify-center items-center border border-white h-16 w-16 mx-1";

  if (currAttempt.attempt > attempVal || isCorrect === true)
    return <div className={bgcolor}>{letter}</div>;
  else
    return (
      <div className="Letter flex justify-center items-center border border-white h-16 w-16 mx-1">
        {letter}
      </div>
    );
};

export default Letter;
