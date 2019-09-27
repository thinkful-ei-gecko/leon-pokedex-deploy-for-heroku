require('dotenv').config();
const express = require('express');
const morgan = require('morgan');

const app = express();

app.use(morgan('tiny'));


app.use(function validateBearerToken(req, res, next) {
  const apiToken = process.env.API_TOKEN;
  const authToken = req.get('Authorization')

  if (!authToken || authToken.split(' ')[1] !== apiToken) {
    return res.status(401).json({ error: 'Unauthorized request' })
  }
  // move to the next middleware
  next();
});

const validTypes = [`Bug`, `Dark`, `Dragon`, `Electric`, `Fairy`, `Fighting`, `Fire`, `Flying`, `Ghost`, `Grass`, `Ground`, `Ice`, `Normal`, `Poison`, `Psychic`, `Rock`, `Steel`, `Water`];

function handleGetTypes(req, res) {
  res.json(validTypes);
}


function handleGetPokemon(req, res) {
  res.send('Hello, Pokemon!');
}

app.get('/', handleGetPokemon);
  
app.get('/pokemon', handleGetPokemon);

app.get('/types', handleGetTypes);