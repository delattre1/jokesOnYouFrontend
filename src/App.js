import Joke from "./components/Joke";
import "./App.css";
import axios from "axios";
import { useEffect, useState } from "react";
import React from 'react';
import FavoriteJokes from "./components/FavoriteJokes"
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import Loader from "react-loader-spinner";



function App() {
  function saveJoke() {
    setLoading(true);
    axios
      .post('http://localhost:8000/api/favorites/', joke)
      .then((res) => {
        setFavs(res.data)
      })

    axios
      .get('http://localhost:8000/api/joke/')
      .then((res) => {
        setJoke(res.data);
        setLoading(false);
      });
  };

  const [joke, setJoke] = useState([]);
  const [favs,  setFavs]  = useState([]);
  const [isLoading,  setLoading]  = useState('');

  useEffect(() => {
    axios
      .get('http://localhost:8000/api/favorites/')
      .then((res) => {
        setFavs(res.data)
      })
    }, []);
  
  useEffect(() => {
    setLoading(true);
  }, []);

  useEffect(() => {
    axios
      .get('http://localhost:8000/api/joke/')
      .then((res) => {
        setLoading(false);
        setJoke(res.data)
      });
  }, []);

  console.log(joke);
  return (
    <div className="App">
        <div className="appbar">
            <img className="logo_joker" src="/logo_joker.png" alt="" />
            <p className="top-bar-text">Timão piadas mesmo!</p>
        </div>
      
      <div className="mainContainer">

      {isLoading ? 
        <Loader type="BallTriangle" color="#00BFFF" height={80} width={80} /> : 
        (
        <div>
          <Joke title={joke.setup}>{joke.delivery}</Joke>
          <button onClick={saveJoke} >Save Joke</button>
        </div>
        )
       }
        <FavoriteJokes favJokes={favs}></FavoriteJokes>
        <img className="jokeImg" src="/mini-joker.jpg" alt="" />
      </div>   
    </div>
  );
}

export default App;
