import Letter from "./Letter";
import React from "react";

const aCount = [0, 1, 2, 3, 4, 5];
const pCount = [0, 1, 2, 3, 4];

const Board = () => {
  return (
    <div className="board grid grid-rows-6 gap-4 w-1/2">
      {aCount.map((i) => {
        return (
          <div className="row grid grid-cols-5">
            {pCount.map((j) => {
              return <Letter letterPos={j} attempVal={i} />;
            })}
          </div>
        );
      })}
    </div>
  );
};

export default Board;
