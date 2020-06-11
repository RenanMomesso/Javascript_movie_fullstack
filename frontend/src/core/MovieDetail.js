import React, { useState, useEffect } from "react";
import { Button, Row } from "antd";
import { IMAGE_URL_MOVIE, APP_KEY_MOVIE, MOVIE_APP_API } from "../config";
import { isAuth } from "../auth/Helpers";

import ImageBg from "../core/Imagem";
import MovieInfo from "./MovieInfo";
import MenuHeader from "./MenuHeader";
import GridCards from "./GridCards";
import Favorite from "./Favorite";
import Comment from './Comment'

export default function MovieDetail(props) {
  const [movie, setMovie] = useState([]);
  const [loadingForMovies, setLoadingForMovies] = useState(true);
  const [loadingForCasts, setLoadingForCasts] = useState(true);
  const [casts, setCasts] = useState([]);
  const [ActorToggle, setActorToggle] = useState(false);
  const [commentList, setCommentList] =useState([])

  const idMovie = props.match.params.movieId;

  useEffect(() => {
    const endPoint = `${MOVIE_APP_API}movie/${idMovie}?api_key=${APP_KEY_MOVIE}&language=en-US`;
    fetchDetailInfo(endPoint);
  }, []);

  const fetchDetailInfo = (endPoint) => {
    fetch(endPoint)
      .then((response) => response.json())
      .then((response) => {
        console.log(response.backdrop_path);
        setMovie(response);
        setLoadingForMovies(false);

        let endpointForCasts = `${MOVIE_APP_API}movie/${idMovie}/credits?api_key=${APP_KEY_MOVIE}&language=en-US`;
        fetch(endpointForCasts)
          .then((result) => result.json())
          .then((result) => {
            setCasts(result.cast);
          });
        setLoadingForCasts(false);
      })
      .catch((error) => console.log(error));
  };

  const toggleForActores = () => {
    setActorToggle(!ActorToggle);
  };

  return (
    <>
      <MenuHeader />
      <div>
        {movie && (
          <ImageBg
            image={`${IMAGE_URL_MOVIE}w1280/${movie.backdrop_path}`}
            title={movie.original_title}
            text={movie.overview}
          />
        )}

        <div className="container-fluid">
          {isAuth() && isAuth() ? (
            <div
              style={{
                display: "flex",
                justifyContent: "flex-end",
                margin: 20,
              }}
            >
              <Favorite
                userId={isAuth()._id}
                movieInfo={movie}
                movieId={idMovie}
              />
            </div>
          ) : (
            <div
              style={{
                display: "flex",
                justifyContent: "flex-end",
                margin: 20,
              }}
            >
              <button onClick={()=>props.history.push('/signin')}>Favorite</button>
            </div>
          )}

          {!loadingForMovies ? (
            <MovieInfo movie={movie} />
          ) : (
            <div>loading...</div>
          )}
        </div>
        <div className="text-center">
          {" "}
          <Button
            danger
            style={{ marginTop: 20, marginBottom: 20 }}
            onClick={toggleForActores}
          >
            Toggle for actors view
          </Button>
        </div>
      </div>

      <div className="filmes">
        {ActorToggle && (
          <div className="row">
            {!loadingForCasts ? (
              casts.map(
                (cast, index) =>
                  cast.profile_path && (
                    <GridCards
                      key={index}
                      image={
                        cast.profile_path
                          ? `${IMAGE_URL_MOVIE}w500/${cast.profile_path}`
                          : null
                      }
                      characterName={cast.name}
                    />
                  )
              )
            ) : (
              <div>loading...</div>
            )}
          </div>
        )}
      </div>


              <div><Comment/></div>

      <footer style={{ height: 100 }}></footer>
    </>
  );
}
