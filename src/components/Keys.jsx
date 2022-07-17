import { useContext } from "react";
import { AppContext } from "../App";
import React from "react";

const Keys = ({ keyVal, keyInd }) => {
  const { onEnter, onDelete, onSelect } = useContext(AppContext);

  const letterSel = () => {
    if (keyVal === "ENTER") {
      onEnter();
      console.log(keyVal);
    } else if (keyVal === "«") {
      onDelete();
    } else {
      onSelect(keyVal);
      console.log(keyVal);
    }
  };

  return (
    <button
      className="keys rounded border border-white p-5"
      id={keyInd}
      onClick={letterSel}
    >
      {keyVal}
    </button>
  );
};

export default Keys;
