import Joke from "./components/Joke";
import "./App.css";
import axios from "axios";
import { useEffect, useState } from "react";
import React from 'react';
import FavoriteJokes from "./components/FavoriteJokes"


function App() {
  function saveJoke() {
    axios
      .post('http://localhost:8000/api/favorites/', joke)
      .then((res) => {
        setFavs(res.data)
      })

    axios
      .get('http://localhost:8000/api/joke/')
      .then((res) => setJoke(res.data));
  };

  const [joke, setJoke] = useState([]);
  const [favs,  setFavs]  = useState([]);

  useEffect(() => {
    axios
      .get('http://localhost:8000/api/favorites/')
      .then((res) => {
        setFavs(res.data)
      })
    }, []);


  useEffect(() => {
    axios
      .get('http://localhost:8000/api/joke/')
      .then((res) => setJoke(res.data));
  }, []);

  console.log(joke);
  return (
    <div className="App">
        <div className="appbar">
            <img className="logo_joker" src="/logo_joker.png" alt="" />
            <p className="top-bar-text">Timão piadas mesmo!</p>
        </div>
      
      <div className="mainContainer">
        <Joke title={joke.setup}>{joke.delivery}</Joke>
        <button onClick={saveJoke} >Save Joke</button>

        <FavoriteJokes favJokes={favs}></FavoriteJokes>
        <img className="jokeImg" src="/mini-joker.jpg" alt="" />
      </div>   
    </div>
  );
}

export default App;
