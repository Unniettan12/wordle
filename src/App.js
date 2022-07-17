import "./App.css";
import Board from "./components/Board";
import Keyboard from "./components/Keyboard";
import { boardDefault } from "./components/Words";
import React, { createContext, useEffect, useState } from "react";
import axios from "axios";

export const AppContext = createContext();

function App() {
  const [board, setBoard] = useState(boardDefault);
  const [currAttempt, setCurrAttempt] = useState({ attempt: 0, pos: 0 });
  const [correctWord, setCorrectWord] = useState("RIGHT");
  const [isCorrect, setIsCorrect] = useState(false);
  const [check, setCheck] = useState(true);

  const onEnter = () => {
    if (currAttempt.pos !== 5) return;

    axios
      .get("https://dictionary35.p.rapidapi.com/wordSearchEnglish", {
        params: { query: board[currAttempt.attempt].join("") },
        headers: {
          "X-RapidAPI-Key":
            "e426368d4emsh91900c45f639e28p1cc9a1jsna124da19cb9f",
          "X-RapidAPI-Host": "dictionary35.p.rapidapi.com",
        },
      })
      .then((response) => {
        console.log(response.data.success);
        setCheck(response.data.success);
      })
      .catch((e) => console.log(e));

    if (check === false) alert("Word not found");
    else {
      setIsCorrect(
        board[currAttempt.attempt].join("").toLowerCase() ===
          correctWord.toLowerCase()
      );

      if (
        board[currAttempt.attempt].join("").toLowerCase() ===
        correctWord.toLowerCase()
      ) {
        alert("Correct");
        console.log("correct");
      } else setCurrAttempt({ attempt: currAttempt.attempt + 1, pos: 0 });
      if (currAttempt.attempt === 5 && !isCorrect) alert("Game Over");
    }
  };

  const onDelete = () => {
    if (currAttempt.pos === 0) return;
    const newBoard = [...board];
    newBoard[currAttempt.attempt][currAttempt.pos - 1] = "";
    setBoard(newBoard);
    setCurrAttempt({ ...currAttempt, pos: currAttempt.pos - 1 });
  };

  const onSelect = (keyVal) => {
    // console.log("This is inside onSelect" + keyVal);
    if (currAttempt.pos > 4) return;
    if (isCorrect) return;
    const newBoard = [...board];
    newBoard[currAttempt.attempt][currAttempt.pos] = keyVal;
    setBoard(newBoard);
    setCurrAttempt({ ...currAttempt, pos: currAttempt.pos + 1 });
  };

  useEffect(() => {
    axios
      .get("https://random-words5.p.rapidapi.com/getMultipleRandom", {
        params: { count: 2, wordLength: 5 },
        headers: {
          "X-RapidAPI-Key":
            "e426368d4emsh91900c45f639e28p1cc9a1jsna124da19cb9f",
          "X-RapidAPI-Host": "random-words5.p.rapidapi.com",
        },
      })
      .then((response) => {
        // setCorrectWord(response.data[0]);
        console.log(response.data);
      })
      .catch((e) => console.log(e));
  }, []);

  return (
    <div className="bg-[#121213] h-screen text-white flex items-center flex-col">
      <AppContext.Provider
        value={{
          board,
          setBoard,
          currAttempt,
          setCurrAttempt,
          onEnter,
          onDelete,
          onSelect,
          correctWord,
          isCorrect,
        }}
      >
        <Board />
        <Keyboard />
      </AppContext.Provider>
    </div>
  );
}

export default App;
