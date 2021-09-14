import React, { useState, useEffect } from "react";
import AddRounded from "@material-ui/icons/AddRounded";
import { motion } from "framer-motion";
import Confetti from "react-dom-confetti";
import StartButton from "./startBtn";
import Display from "./display";
import moment from 'moment';

function GameContainer() {
  const [userInput, setUserInput] = useState("");

  const [score, setScore] = useState(0);
  const [hasWon, setHasWon] = useState(false);

  const random = () => Math.floor(Math.random() * 10) + 1;
  const [firstParam, setFirstParam] = useState(random());
  const [secondParam, setSecondParam] = useState(random());
  const answer = firstParam * secondParam;

  // console.log({score, hasWon});

  // Const [seconds, setSeconds] = useState(0);
  //10 secondCountDown
  const [seconds, setSeconds] = useState(10);
  const [isActive, setIsActive] = useState(false);

  // console.log({seconds, isActive});

  const [active, setActive] = useState(false);
  //CONFETTI FUNCTION !!!Change to start on call, instead of display
  // const {width, height} = useWindowSize();
  function confetti() {
    setActive(true);
  }

  function toggle() {
    setIsActive(!isActive);
  }

  /////////////////////////////////////////////////////////
  const [winInformation, setWinInformation] = useState([])


  function addWin() {
    const calender = moment().format('MMMM Do YYYY, h:mm:ss a');


    const winInfo = {
      didWin: true,
      time: calender,
    }
    setWinInformation([winInfo, ...winInformation])
  }

  function addLoss() {
    const calender = moment().format('MMMM Do YYYY, h:mm:ss a');


    const winInfo = {
      didWin: false,
      time: calender,
    }
    setWinInformation([winInfo, ...winInformation])
    
  }
  // setGameHistory([that, ...gameHistory])

  const [checkIfCorrect, setCheckIfCorrect] = useState([])

  function checkCorrect() {
    const calender = moment().format('lll');


    const winInfo = {
      wasCorrect: true,
      userInput: userInput,
      time: calender,
    }
    setCheckIfCorrect([winInfo, ...checkIfCorrect])
  }

  function checkFalse() {
    const calender = moment().format('lll');


    const winInfo = {
      wasCorrect: false,
      userInput: userInput,
      time: calender,
    }
    setCheckIfCorrect([winInfo, ...checkIfCorrect])
    
  }


  //Resets
  function reset() {
    setSeconds(10);
    setActive(false);
    setIsActive(true);
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
      addLoss();
      setScore(0);
    }
  }, [seconds]);

  //Start Game function
  const startGame = () => {
    //Show question
    display();
  };

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

  /////////////////////////////////////////////////////////////////////////////
  //Checks if correct and refreshes question if true
  useEffect(() => {
    if (answer === userInput && !!answer) {
      //NEEDS TO clear input
      clearInterval(userInput);
      //shows correct answer
      setHasWon(true);
    }
    if (hasWon) {
      //resets question if true
      setFirstParam(random());
      setSecondParam(random());
      setHasWon(false);
      //Resets timer if true and starts
      reset();
    }
  }, [hasWon, userInput, reset]);

  //If you get all 10 points = you get this message and game ends
  useEffect(() => {
    if (score >= 2) {
      setScore(0);
      //Hide questions and input
      //end timer
      endGame()
      //start confetti
      setActive(true);
      addWin();
      confetti();


    }
  }, [score, addWin]);

  //console.log({winInformation})

  //OnSubmit check if correct or not in console and add points
  const handleInput = (callback = () => {}) => {
    if (userInput == answer) {
      console.log(answer, userInput);
      console.log("correct");
      //add one point to score
      setScore(score + 1);
      //Sets haswon
      setHasWon(true);
      //If correct- print
      checkCorrect();
    } else {
      console.log(answer, userInput, hasWon);
      console.log("incorrect");
      addLoss();
      checkFalse();
    }
    callback();
  };

  //console.log({checkIfCorrect});

  //End game button
  const endGame = () => {
    setScore(0);
    display();
    setIsActive(false);
    setSeconds(10);
    setActive(false);
  };
  


  return (
    <div className="App">
      <div className="App-header">
        <header className="header">Multiplication Game</header>

        <br></br>
      </div>

      <br></br>

      <div></div>

      <motion.div className="functionDiv">
        <div className="timeScore">
          <span className="time">Time: {seconds}s</span>
          <AddRounded fontSize="small" />
          <span className="score">Score: {score} </span>
        </div>

        <div className="confetti-button">
          <Confetti active={active} />
        </div>

        <StartButton startGame={startGame} toggle={toggle} reset={reset} />

        <br></br>
        <br></br>

        <Display
          endGame={endGame}
          handleInput={handleInput}
          setUserInput={setUserInput}
          firstParam={firstParam}
          secondParam={secondParam}
          reset={reset}
        />
      </motion.div>

      <br></br>
      <br></br>

      <div className="table">
        <div className="scoreBoard">
        Your Wins:
        </div>
        <ul>
          {winInformation.map((winInformation) => (
          <li>{JSON.stringify(winInformation)}</li>
          ))}
        </ul>
      </div>

      <div>
      </div>


      <div className="tableTwo">
        <div className="scoreBoard">
          Your Answers:
        </div>
        <ul>
          {checkIfCorrect.map((checkIfCorrect) => (
          <li>{JSON.stringify(checkIfCorrect)}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default GameContainer;
