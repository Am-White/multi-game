const URL = 'http://localhost:3000';


async function getGames() {
  const response = await fetch(`${URL}/games`);

  const games = await response.json();
  return games;
}

async function getAnswers() {
  const response = await fetch(`${URL}/answers`);

  const answers = await response.json();
  return answers;
}


export  {getGames, getAnswers};