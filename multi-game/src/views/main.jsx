import React, { useState, useEffect, useReducer } from 'react';
import './main.css';


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

    //

  return (
    <div className="App">
      <header className="App-header">
       Multiplication Game
      </header>
        <br></br>
      <button 
      //onclick="startGame(); return false;" 
      className="btn btn-default" 
      id="play">Start Game</button>
        <br></br>
      <div>
        <span id="timer">Time: {/*countDown*/}</span>
      </div>
      <div>
        <span id="score">Score: {/*score*/}</span>
      </div>
        <br></br>
      <div className="game-container">
        <span id="question">{num1} x {num2} = {answer}</span>
        <input type="number" id="answer"></input>
      </div>
        <br></br>
      <button>Restart</button>
      
    </div>
  );
}

export default Home;
