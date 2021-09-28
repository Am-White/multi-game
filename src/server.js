const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
var cors = require('cors')

app.use(cors());

// CREATE=INSERT=POST
// READ=SELECT=GET
// UPDATE=UPDATE=PUT
// DELETE=DELETE=DELETE

// //This displays message that the server running and listening to specified port
app.listen(port, () => console.log(`listening on port ${port}`))

//how do i pull in data
const FAKE_GAMES = [
  {
    id: 1,
    didWin: true,
    time: 111
  },
  {
    id: 2,
    didWin: true,
    time: 112
  }
]

//get game
// create a GET route
app.get('/games/:id', (req, res) => {
  const game = FAKE_GAMES[req.params.id - 1]
  res.send('id: ' + JSON.stringify(game));
});


//get games
// create a GET route
app.get('/games', (req, res) => {
  res.send(JSON.stringify(FAKE_GAMES)); /// not right, but imagine this was accessing a database.

  // dynamodb.tables.games.find({id: req.params.id}, (game) => {
  //   res.send(game)
  // })
});

// //create game
app.post('/game', (req, res) => {
    res.send('id:' + req.params.id);
    // var newGame = {

    // };
    
});

const FAKE_ANSWERS = [
  {
    gameId: 1,
    wasCorrect: true,
    userInput: 40,
    time: '00-0-000'
  },
  {
    gameId: 2,
    wasCorrect: true,
    userInput: 23,
    time: '00-0-000'
  }
]


//get game
// create a GET route
app.get('/answers/:gameId', (req, res) => {
  const answer = FAKE_ANSWERS[req.params.gameId - 1]
  res.send('gameId: ' + JSON.stringify(answer));
});


//get answer
app.get('/answers', (req, res) => {
  res.send(JSON.stringify(FAKE_ANSWERS)); /// not right, but imagine this was accessing a database.

  // dynamodb.tables.games.find({id: req.params.id}, (game) => {
  //   res.send(game)
  // })
});

//create answer
app.post('/answer', (req, res) => {
    res.send('gameId:' + req.params.gameId);
    // var newGame = {

    // };
    
});

//get answers
app.get('/answers/:gameId', (req, res) => {
 const answer = data[req.params.gameId -1]
  res.send(JSON.stringify(FAKE_ANSWERS));
});


// //create answer
// app.post('/answer', (req, res) => {
//    res.send('id:' + req.params.id);
// })

// //update game
// app.put('/', () => {
  
// })