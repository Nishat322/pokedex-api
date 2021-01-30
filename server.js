/* eslint-disable quotes */
/* eslint-disable indent */
'use strict';
require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const POKEDEX =require('./POKEDEX.json');

const app = express();
app.use(morgan('dev'));

console.log(process.env.API_TOKEN);

app.use(function validateBearerToken(req,res,next){
    const apiToken = process.env.API_TOKEN;
    const authToken = req.get('Authorization');
    if (!authToken || authToken.split(' ')[1] !== apiToken){
        return res.status(401).json({ error: 'Unauthorized request' });
    }
    next();
});

const validTypes = [`Bug`, `Dark`, `Dragon`, `Electric`, `Fairy`, `Fighting`, `Fire`, `Flying`, `Ghost`, `Grass`, `Ground`, `Ice`, `Normal`, `Poison`, `Psychic`, `Rock`, `Steel`, `Water`];
function handleGetTypes(req,res){
    res.json(validTypes);
}

app.get('/types', handleGetTypes);

function handleGetPokemon(req,res){
    const {name,type} = req.query;
    //set variable to access the pokemon array within the data
    let response = POKEDEX.pokemon;
    //if name exist within the parameter
    if(name){
        response = response.filter(pokemon => 
            pokemon.name.toLowerCase().includes(name.toLowerCase())
        );
    }
    
    if (type){
        response = response.filter(pokemon => 
            pokemon.type.includes(type)    
        );
    }

    res.json(response);
}

app.get('/pokemon',handleGetPokemon);

const PORT = 8080;

app.listen(PORT, () => {
    console.log(`Server listening at port ${PORT}`);
});
