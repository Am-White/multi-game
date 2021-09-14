import React from "react";
import "./gameContainer";
import { Button, TextField } from "@material-ui/core";

const SubmitHandle = ({
  handleInput,
  setUserInput,
  userInput,
  isActive,
  setIsActive,
  hasWon,
  seconds,
  reset,
  
}) => {
  return (
    <div>
      <TextField
        className="input"
        onChange={(e) => setUserInput(e.target.value)}
        variant="outlined"
        label="Answer"
      />

      <br></br>

      <Button
        className="submit"
        onClick={() => handleInput()}
        variant="outlined"
        color="primary"
      >
        Submit Answer
      </Button>
    </div>
  );
};

export default SubmitHandle;
