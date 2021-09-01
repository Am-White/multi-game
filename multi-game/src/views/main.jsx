import React, { useState, useEffect,} from 'react';
import './main.css';
import {
    Button,
} from '@material-ui/core'

function Home() {

    //display one question- if userInput matches answer = score +1
    const [userInput, setInput] = useState('');
    const [score, setScore] = useState(0);

    // const RandomNumber = Math.floor(Math.random() * 10) + 1 ;
    // const RandomNumber2 = Math.floor(Math.random() * 10) + 1 ;
    const RandomNumber = 5;
    const RandomNumber2 = 2;
    const answer = RandomNumber * RandomNumber2;

    const startGame = () => {
      //Start Timer
      setSeconds(10);
      //Show question

      //Score = 0
    }

  //10 secondCountDown
  const [seconds, setSeconds] = useState('');


  useEffect(() => {
    if (seconds > 0) {
      setTimeout(() => setSeconds(seconds - 1), 1000);
    } else {
      setSeconds('hello')
    }
  }, [seconds]);


    //If you get all 10 points = you get this message (for now)
    useEffect(() => {
      if(score > 10) {
          setScore('Good Job!')
      }
  }, [score]); 
 
    //OnSubmit check if correct or not in console and add points
    const handleInput = () => {

        console.log(userInput);

        if (userInput == answer) {
          console.log ("correct"); 
          //add one point to score
          setScore(score +1)
          //reset timer (!!!THERE IS GLITCH!!!)
          setSeconds('')
          //change question
        } else {
          console.log ("incorrect");
          //Print "try again"
        }
    };

    



  return (
    <div className="App">
      <header className="App-header">
       Multiplication Game
      </header>
        <br></br>
      <div>
        <span id="timer" >Time: {seconds} || </span>
        <span id="score">Score: {score}</span>
      </div>
        <br></br>
      <Button
        onClick={() => startGame()}
        variant="contained"
        className="btn btn-default" 
        >Start
      </Button>
        <br></br>
        <br></br>
      <div className="game-container" >
        <span id="question" style={{display:"none"}}
        // key={activeQ}
        >
          {/* {questions[activeQ].q} x {questions[activeQ].q2} =  */}
          {RandomNumber} x {RandomNumber2} = 
          </span>
        <span id="answer" style={{display:"none"}}> {answer}</span>
        <br></br>
        <input onChange={e => setInput(e.target.value)}></input>

        <button onClick={() => handleInput()}>submit</button>
      </div>
        <br></br>
      <Button 
      //onclick
      variant="contained">End</Button>
      
    </div>
  );
}

export default Home;
