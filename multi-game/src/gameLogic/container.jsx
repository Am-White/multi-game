import React, {useState, useEffect} from 'react';
import AddRounded from '@material-ui/icons/AddRounded';
import { motion } from "framer-motion";
import Confetti from "react-dom-confetti";
import StartButton from "../gameLogic/startBtn";
import Display from "../gameLogic/display";

function Functions () {

    const [userInput, setUserInput] = useState("");

    const [score, setScore] = useState(0);
    const [hasWon, setHasWon] = useState(false);

    const random = () => (Math.floor(Math.random() * 10) + 1);
    const [firstParam, setFirstParam] = useState(random());
    const [secondParam, setSecondParam] = useState(random());
    const answer = firstParam * secondParam;

    // Const [seconds, setSeconds] = useState(0);
    //10 secondCountDown
      const [seconds, setSeconds] = useState(10);
      const [isActive, setIsActive] = useState(false);

      /////////////////////////////////////////////////////////////////////////////
      const [active, setActive] = useState(false);
        //CONFETTI FUNCTION !!!Change to start on call, instead of display
            // const {width, height} = useWindowSize();
            function confetti() {
              setActive(true)
            }


      function toggle() {
        setIsActive(!isActive);
      }

      //Resets
      function reset() {
        setSeconds(10);
        setIsActive(false);
        setActive(false);
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
          confetti();
        }
      }, [seconds])

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

 
/////////////////////////////////////////////////////////////////////////////
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
      }
    }, [hasWon, userInput, answer ])

    //If you get all 10 points = you get this message and game ends
    useEffect(() => {
      if(score >= 2) {
          setScore(0)
          //end timer
          reset();
          //Hide questions and input
          display();
          //start confetti
          setActive(true);
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
    }

    return(
            <div className="App">
     
      <div className="App-header">

        <header className="header">
        Multiplication Game
        </header>
      
      <br></br>
      </div>

        <br></br>

      <div>
      </div>

        <motion.div className="functionDiv">

        <div className="timeScore">
          <span className="time">Time: {seconds}s</span>
            <AddRounded fontSize="small"/>
          <span className="score">Score: {score} </span>
        </div>

          <div className="confetti-button">
            <Confetti active={active} />
          </div>
        
          <StartButton 
          startGame={startGame} 
          toggle={toggle}/>

          <br></br>
          <br></br>

          <Display 
          endGame={endGame} 
          handleInput={handleInput} 
          setUserInput={setUserInput}
          firstparam = {firstParam}
          secondParam= {secondParam}
          setUserInput={setUserInput}
          handleInput={handleInput}/>

        </motion.div>

    <br></br>
        
  </div>
    )
}

export default Functions;