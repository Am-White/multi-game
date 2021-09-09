import React, { useState, useEffect} from 'react';
import './main.css';
import {
    Button,
    TextField,
} from '@material-ui/core'
import PlayCircleFilledWhiteTwoToneIcon from '@material-ui/icons/PlayCircleFilledWhiteTwoTone';
import PauseCircleFilledTwoToneIcon from '@material-ui/icons/PauseCircleFilledTwoTone';
import AddRounded from '@material-ui/icons/AddRounded';
import { green } from '@material-ui/core/colors';
import { motion } from "framer-motion"
import Confetti from "react-confetti";
import useWindowSize from 'react-use/lib/useWindowSize'

function Home() {

    const [userInput, setUserInput] = useState("");

    const [score, setScore] = useState(0);
    const [hasWon, setHasWon] = useState(false);

    const random = () => (Math.floor(Math.random() * 10) + 1);
    const [firstParam, setFirstParam] = useState(random());
    const [secondParam, setSecondParam] = useState(random());
    const answer = firstParam * secondParam;

    const {width, height} = useWindowSize();

    // Const [seconds, setSeconds] = useState(0);
    //10 secondCountDown
/////////////////////////////////////////////////////////////////////////////
      const [seconds, setSeconds] = useState(10);
      const [isActive, setIsActive] = useState(false);

      function toggle() {
        setIsActive(!isActive);
      }
      //Resets
      function reset() {
        setSeconds(10);
        setIsActive(false);
      }

      useEffect(() => {
        let interval = null;
        if (isActive) {
          interval = setInterval(() => {
            setSeconds((seconds) => seconds - 1);
          }, 1000);
        } else if (!isActive && seconds !== 0) {
          clearInterval(interval);
        }
        return () => clearInterval(interval);
      }, [isActive, seconds]);

      useEffect(() => {
        if (seconds === 0) {
          setFirstParam(random());
          setSecondParam(random());
          reset();
          setIsActive(true);
        }
      }, [seconds])


/////////////////////////////////////////////////////////////////////////////
    //Start Game function
    const startGame = () => {
      //Show question
      display()
    }

    //function to display content on start
    //USEREF?
    function display() {
      const showDisplay = document.getElementById("displayGame");
      const showWelcome = document.getElementById("welcome");
      if (showDisplay.style.display === "none") {
        showDisplay.style.display = "block";
        showWelcome.style.display = "none";
      } else {
        showDisplay.style.display = "none";
        showWelcome.style.display = "block";
      }
    }

  //Checks if correct and refreshes question if true
    useEffect(() => {
      if(answer === userInput && !!answer) {
        //NEEDS TO clear input
        clearInterval(userInput)
        //shows correct answer
        setHasWon(true)
      }
      if (hasWon) {
        //resets question if true
        setFirstParam(random())
        setSecondParam(random())
        setHasWon(false)
        //Resets timer if true and starts
        reset();
        setIsActive(true);
      }
    }, [hasWon, userInput, answer ])

    //If you get all 10 points = you get this message and game ends
    useEffect(() => {
      if(score >= 10) {
          setScore('YOU WON!')
          //end timer
          reset();
          //Hide questions and input
          display();
          //start confetti
          confettiDisplay()
            
      }
  }, [score]); 
 
    //OnSubmit check if correct or not in console and add points
    const handleInput = () => {

        if (userInput == answer) {
          console.log(answer, userInput,);
          console.log ("correct"); 
          //add one point to score
          setScore(score +1)
          //Sets haswon
          setHasWon(true)
        } else {
          console.log(answer, userInput, hasWon);
          console.log ("incorrect");
        }
    };

    //End game button
    const endGame = () => {
      setScore(0)
      display()
      confettiDisplay()
    }
    
    //CONFETTI FUNCTION !!!Change to start on call, instead of display
      function confettiDisplay() {
      const confettiDisplay = document.getElementById("confetti");
      if (confettiDisplay.style.display === "none") {
        confettiDisplay.style.display = "block";
      } else {
        confettiDisplay.style.display = "none";
      }
    }

 
  return (
    <div className="App" id="appConfetti">
      
      <div className="App-header">
        <Confetti id="confetti" style={{display: "none"}}/>
        <header 
        className="header">
        Multiplication Game
        </header>
      
      <br></br>

        <motion.div 
        className="timeScore">
          <span 
          className="time">Time: {seconds}s</span>
            <AddRounded fontSize="small"/>
          <span className="score">Score: {score} </span>
        </motion.div>
      </div>

        <br></br>

      <div>

      </div>
        <br></br>
        <motion.button
          onClick={() => {startGame(); toggle();}}
          className={`startBtn btn-primary btn-primary-${
            isActive ? "active" : "inactive"
          }`}
          className="startBtn btn-default" 
          whileHover={{ scale: 2 }}
          whileTap={{ scale: 2 }}
          > 
          {isActive ? 
          <PauseCircleFilledTwoToneIcon 
          fontSize="large"/>
           : 
          <PlayCircleFilledWhiteTwoToneIcon 
          fontSize="large" 
          style={{ color: green[500] }}/>}
        </motion.button>

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
          <motion.div className="game-container" whileHover={{ scale: 1.23 }}>
            <span className="question" id="question" >
              {firstParam} x {secondParam} = __
            </span>

            <br></br>
            <br></br>

            <TextField 
              className="input"
              onChange={e => setUserInput(e.target.value)}
              variant="outlined"
              label="Answer"/>

            <br></br>

            <Button 
              className="submit"
              onClick={() => handleInput()}
              variant="outlined"
              color="primary"
              >Submit Answer
            </Button>

            <br></br>
            <br></br>
            <br></br>

            <motion.button 
                onClick={() => {endGame(); reset(); }}
                > End Game
            </motion.button>
          </motion.div>
      </div>
      
    </div>
  );
}

export default Home;
