import React, { useState, useEffect } from "react";
import MenuHeader from "./MenuHeader";
import axios from "axios";
import { Popover } from "antd";
import { isAuth } from "../auth/Helpers";
import { IMAGE_URL_MOVIE } from "../config";
// import { Container } from './styles';

function FavoritePage() {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    fetchFavoritedMovie();
  }, []);

  const fetchFavoritedMovie = () => {
    axios
      .post("http://localhost:8000/api/favorite/getFavorites", {
        userFrom: isAuth() && isAuth()._id,
      })
      .then((response) => {
        if (response.data.success) {
          setFavorites(response.data.info);
        }
      });
  };

  const renderCards = favorites.map((favorite, index) => {
    const content = (
      <div>
        {favorite.moviePost ? (
          <img src={`${IMAGE_URL_MOVIE}w500${favorite.moviePost}`} />
        ) : (
          "no image"
        )}
      </div>
    );
    return (
      <tr key={index}>
        <Popover content={content} title={`${favorite.movieTitle}`}>
          <td>{favorite.movieTitle}</td>
        </Popover>

        <td>{favorite.movieRunTime} mins</td>
        <td>
          <button
            onClick={() => onClickDelete(favorite.movieId, favorite.userFrom)}
          >
            Remove
          </button>
        </td>
      </tr>
    );
  });

  const onClickDelete = (movieId, userFrom) => {
    const variables = {
      movieId,
      userFrom,
    };
    axios
      .post("http://localhost:8000/api/favorite/removeFromFavorite", variables)
      .then((response) => {
        if (response.data.success) {
          fetchFavoritedMovie();
        } else {
          alert("No movies to remove");
        }
      });
  };

  return (
    <>
      <MenuHeader />
      <div style={{ width: "85%", margin: "3rem auto" }}>
        <h2> Favorite Movies </h2>
        <hr />

        <table>
          <thead>
            <tr>
              <th>Movie Title</th>
              <th>Movie RunTime</th>
              <td>Remove from favorites</td>
            </tr>
          </thead>
          <tbody>{renderCards}</tbody>
        </table>
      </div>
    </>
  );
}

export default FavoritePage;
