import React, { useState, useEffect } from "react";
import axios from "axios";

export default function Favorite(props) {
  const userFrom = props.userId ? props.userId : props.history.push('/signin');

  const movieId = props.movieId;
  const movieTitle = props.movieInfo.title;
  const moviePost = props.movieInfo.backdrop_path;
  const movieRunTime = props.movieInfo.runtime;

  let variables = {
    userFrom,
    movieId,
    movieTitle,
    moviePost,
    movieRunTime,
  };

  const [favoriteNumber, setFavoriteNumber] = useState(0);
  const [favorited, setFavorited] = useState(false);

  useEffect(() => {
    axios
      .post("http://localhost:8000/api/favorite/favoriteNumber", variables)
      .then((response) => {
        if (response.data.success) {
          setFavoriteNumber(response.data.favoriteNumber);
        } else {
          alert("Failed to get favoriteNumber");
        }
      });

    axios
      .post(`http://localhost:8000/api/favorite/favorited`, variables)
      .then((response) => {
        if (response.data.success) {
          setFavorited(response.data.favorited);
        } else {
          alert("Fail");
        }
      });
  }, []);

  const clickFavorite = () => {
    if (favorited) {
      axios
        .post(
          "http://localhost:8000/api/favorite/removeFromFavorite",
          variables
        )
        .then((data) => {
          if (data.data.success) {
            setFavoriteNumber(favoriteNumber - 1);
            setFavorited(!favorited);
          }
        });
    } else {
      axios
        .post("http://localhost:8000/api/favorite/addToFavorite", variables)
        .then((response) => {
          if (response.data.success) {
            setFavoriteNumber(favoriteNumber + 1);
            setFavorited(!favorited);
          }
        });
    }
  };

  return (
    <div>
      <button className="btn btn-primary" onClick={clickFavorite}>
        {favorited ? "Remove from Favorite" : "Add to Favorite"} (
        {favoriteNumber})
      </button>
    </div>
  );
}
