import React from 'react';
import "./container";
import { motion } from "framer-motion";
import EndButton from "../gameLogic/endBtn";
import Input from "../gameLogic/input";

const Display = ({firstParam, secondParam, setUserInput, handleInput}) => {
    return(
    <div>
    <motion.div 
        className="welcome" 
        id="welcome" 
        style={{display:"block"}}>       
          <div className="welcomeText">
            Welcome to the multiplcation game!
            <br></br> 
            <br></br>
            Answer as many questions
            <br/>
            as you can, you will have 10 seconds for each question.
            <br/>
            You can pause and resume whenever.
            <br/>
            If you get 10 points you win! GOOD LUCK!
          </div>
        </motion.div>

      <div 
        className="displayGame" 
        id="displayGame" 
        style={{display:"none"}}>
        <motion.div className="game-container" whileHover={{ scale: 1.23, width: 465, height: 228}}>
            <span className="question" id="question" >
              {firstParam} x {secondParam} = __
            </span>

            <br></br>
            <br></br>

            <Input 
            setUserInput={setUserInput}
            handleInput={handleInput}/>

            <br></br>
            <br></br>

            <EndButton/>  
        </motion.div> 
      </div>
    </div>
    )
}

export default Display;