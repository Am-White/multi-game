import React, { useState, useEffect, useReducer } from 'react';
import './main.css';
import {
    Button,
    TextField
} from '@material-ui/core'

function Home() {
    //Generate 2 numbers between 1-10
    function getRandomInt1(max) {
        return Math.floor(Math.random() * max);
      }
      function getRandomInt2(max) {
        return Math.floor(Math.random() * max);
      }
    const num1 = getRandomInt1(10);
    const num2 = getRandomInt2(10);
    const answer = num1 * num2;

    // If input === num1 * num2 then add +1 to score

    //Score
    // const userAnswer = [];
     //const score = [];
    //attempt 1
    // function input (userAnswer, score) {
    //     if (userAnswer === answer) {
    //         return { score: +1
    //         }
    //     }
    // }

        //attempt 2
        // const [score, setScore] = useState(1);
        // useEffect(() => {
        //     if (userAnswer === answer) {
        //         setScore(score +1)}; 

          //attempt 3
          const [score, setScore] = useState(1);
          useEffect(() => {
              if(score < 10) {
                  //setTimeout is wrong
              score > 0 && setTimeout(() => setScore(score +1), 1000);
              } else {
                  setScore('game over')
              }
          }, [score]);  


    //Timer
    const [counter, setCounter] = useState(10);
    useEffect(() => {
        if(counter > 0) {
        counter > 0 && setTimeout(() => setCounter(counter -1), 1000);
        } else {
            setCounter('next question')
        }
    }, [counter]);  

  return (
    <div className="App">
      <header className="App-header">
       Multiplication Game
      </header>
        <br></br>
      <div>
        <span id="timer" >Time: {counter} || </span>
    
        <span id="score">Score: {score}</span>
      </div>
        <br></br>
      <Button 
        /*
        onClick={reset game} */
        variant="contained"
        className="btn btn-default" 
        id="play">Start Game
      </Button>
        <br></br>
        <br></br>
      <div className="game-container">
        <span id="question">{num1} x {num2} = {answer}</span>
        <form>
        <TextField variant="outlined" id="answer" /*key={userAnswer}*/></TextField>
        </form>
      </div>
        <br></br>
      <Button variant="contained">Restart</Button>
      
    </div>
  );
}

export default Home;
