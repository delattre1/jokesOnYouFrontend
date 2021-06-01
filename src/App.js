import Joke from "./components/Joke";
import "./App.css";
import axios from "axios";
import { useEffect, useState } from "react";
import React from 'react';
import FavoriteJokes from "./components/FavoriteJokes"
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import Loader from "react-loader-spinner";


function App() {
  function getToken() {
    axios
      .get('http://54.88.109.168/daniel/token')
      .then((res) => {
        let token = res.data;
        createImg(token);
      })
  }

  function createImg(token){
    let url = 'http://54.88.109.168/daniel/image'
    let urlImg = axios
      .post(url, token)
      .then((res) => {
        let urlCriada = res.data.image_uri;
        let urlImg = `http://54.88.109.168${urlCriada}`;
        setImgUri(urlImg);
      })
    return urlImg
  }


  function saveJoke() {
    setLoading(true);

    axios
      .post('https://evening-harbor-15666.herokuapp.com/api/favorites/', joke)
      .then((res) => {
        setFavs(res.data)
      })

    axios
      .get('https://evening-harbor-15666.herokuapp.com/api/joke/')
      .then((res) => {
        setJoke(res.data);
        setLoading(false);
      });
  };
  const [imgUri, setImgUri] = useState('');
  const [joke, setJoke] = useState([]);
  const [favs,  setFavs]  = useState([]);
  const [isLoading,  setLoading]  = useState('');

  useEffect(() => {
    setLoading(true);
  }, []);

  useEffect(() => {
    axios
      .get('https://evening-harbor-15666.herokuapp.com/api/favorites/')
      .then((res) => {
        setFavs(res.data)
      });
  }, []);
  
  useEffect(()=> {
    getToken();
  }, []);
  

  useEffect(() => {
    axios
      .get('https://evening-harbor-15666.herokuapp.com/api/joke/')
      .then((res) => {
        setJoke(res.data)
        setLoading(false);
      });
  }, []);

  console.log(joke);
  return (
    <div className="App">
        <div className="appbar">
            <img className="logo_joker" src="/logo_joker.png" alt="" />
            <p className="top-bar-text">Timão piadas mesmo!</p>
        </div>
      
      <img src={imgUri}/>
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
