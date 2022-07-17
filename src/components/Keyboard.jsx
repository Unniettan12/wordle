import Keys from "./Keys";
import React, { useCallback, useEffect, useContext } from "react";
import { AppContext } from "../App";

const keys = [
  "Q",
  "W",
  "E",
  "R",
  "T",
  "Y",
  "U",
  "I",
  "O",
  "P",
  "A",
  "S",
  "D",
  "F",
  "G",
  "H",
  "J",
  "K",
  "L",
  "ENTER",
  "Z",
  "X",
  "C",
  "V",
  "B",
  "N",
  "M",
  "«",
];

const Keyboard = () => {
  const { onEnter, onDelete, onSelect } = useContext(AppContext);

  const handleKeyboard = useCallback((event) => {
    console.log(event.key);
    if (event.key === "Enter") {
      event.preventDefault();
      onEnter();
      // console.log(event.key);
    } else if (event.key === "Backspace") {
      onDelete();
    } else {
      keys.map((key) => {
        if (event.key.toLowerCase() === key.toLowerCase()) {
          onSelect(key);
          // console.log("Key press " + key);
        }
      });
    }
  });

  useEffect(() => {
    document.addEventListener("keydown", handleKeyboard);

    return () => {
      document.removeEventListener("keydown", handleKeyboard);
    };
  }, [handleKeyboard]);

  return (
    <div className="flex w-3/4 items-center flex-col justify-center">
      <input className="invisible" autofocus onKeyDown={handleKeyboard} />
      <div className="keyDiv">
        {keys.map((key, keyIndex) => {
          return <Keys keyVal={key} keyInd={keyIndex} />;
        })}
      </div>
    </div>
  );
};

export default Keyboard;
