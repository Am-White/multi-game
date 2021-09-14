import React from "react";
import "./gameContainer";
import { motion } from "framer-motion";
import EndButton from "./endBtn";
import SubmitHandle from "./submitHandle";

const Display = ({
  firstParam,
  secondParam,
  setUserInput,
  handleInput,
  endGame,
  reset,
  hasWon,
  isActive,
  setHasWon,
  setIsActive,
  seconds
}) => {
  return (
    <div>
      <motion.div className="welcome" id="welcome" style={{ display: "block" }}>
        <div className="welcomeText">
          Welcome to the multiplcation game!
          <br></br>
          <br></br>
          Answer as many questions as you can, you will have 
          10 seconds and infinate attempts for each question.
          <br />
          X
          <br/>
          You can pause and resume whenever you want.
          <br />
          If you get 10 points in a row you WIN!
          <br></br>
          But, if you miss a question your score goes back to 0. 
          <br/>
          =
          <br/>
          🍀GOOD LUCK!🍀
        </div>
      </motion.div>

      <div className="displayGame" id="displayGame" style={{ display: "none" }}>
        <motion.div
          className="game-container"
          whileHover={{ scale: 1.23, width: 465, height: 228 }}
        >
          <span className="question" id="question">
            {firstParam} x {secondParam} = __
          </span>

          <br></br>
          <br></br>

          <SubmitHandle
            setUserInput={setUserInput}
            handleInput={handleInput}
            firstParam={firstParam}
            secondParam={secondParam}
            hasWon={hasWon}
            setIsActive={setIsActive}
          />

          <br></br>
          <br></br>

          <EndButton endGame={endGame} reset={reset} />
        </motion.div>
      </div>
    </div>
  );
};

export default Display;
