import React, { useState, useEffect } from "react";
import AddRounded from "@material-ui/icons/AddRounded";
import { motion } from "framer-motion";
import Confetti from "react-dom-confetti";
import StartButton from "./startBtn";
import Display from "./display";
import moment from 'moment';
import { v4 as uuidv4 } from 'uuid';

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

  const [currentGameId, setCurrentGameId] = useState(uuidv4())

  useEffect(() => {
    if(hasWon) {
      setCurrentGameId(uuidv4())
    }
  }, [currentGameId, hasWon])

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
  const [games, setGames] = useState([])
  
  function createGame() {
    const calender = moment().format('lll');

    const game = {
      id: currentGameId,
      didWin: true,
      time: calender,
    }
    setGames([game, ...games])
  }

  function createLoss(gameId) {
    const calender = moment().format('lll');

    const game = {
      id: currentGameId,
      didWin: false,
      time: calender,
    }
    setGames([game, ...games])
  }

  console.log({games});
  // setGameHistory([that, ...gameHistory])
  ////////////////////////////////////////////////////////
  const [checkAnswers, setCheckAnswers] = useState([])

  function checkCorrect(gameId) {
    const calender = moment().format('lll');

    const answer = {
      //id,
      gameId,
      wasCorrect: true,
      userInput: userInput,
      time: calender,
    }
    setCheckAnswers([answer, ...checkAnswers])
  }

  function checkFalse(gameId) {
    const calender = moment().format('lll');

    const answer = {
      gameId: currentGameId,
      wasCorrect: false,
      userInput: userInput,
      time: calender,
    }
    setCheckAnswers([answer, ...checkAnswers])
  }
  console.log({checkAnswers});


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
      createLoss();
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
      createGame();
      confetti();


    }
  }, [score, createGame]);

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
      checkCorrect(currentGameId);
    } else {
      console.log(answer, userInput, hasWon);
      console.log("incorrect");
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
          {games.map((games) => (
          <li>{JSON.stringify(games)}</li>
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
          {checkAnswers.map((checkAnswers) => (
          <li>{JSON.stringify(checkAnswers)}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default GameContainer;
