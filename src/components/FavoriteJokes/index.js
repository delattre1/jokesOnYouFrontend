import React from "react";
import "./favJokes.css";


function FavoriteJokes(props) {

  return (
    <div className="favContainer">
      <div className="wrap">
        <h1>Favorite Jokes!</h1>
      </div>

      <div className="favJokes">
        {props.favJokes.map((joke) =>(

          <div className="card">
            <h3 className="card-title">{joke.setup}</h3>
            <div className="card-content">{joke.delivery}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
export default FavoriteJokes
