import React, { useState, useEffect } from "react";
import Layout from "./Layout";
import ImageBg from "./Imagem";
import GridCards from "./GridCards"
import { IMAGE_URL_MOVIE, APP_KEY_MOVIE, MOVIE_APP_API } from "../config"

function LandingPage() {
  const [movies, setMovies] = useState([]);
  const [MainMovieImage, setMainMovieImage] = useState(null);
  const [currentPage, setCurrentPage] = useState(0);
  useEffect(() => {
    const endPoint = `${MOVIE_APP_API}movie/popular?api_key=${APP_KEY_MOVIE}&language=en-US&page=1`;
    fetchMovies(endPoint);
  }, []);

  const fetchMovies = (endPoint) => {
    fetch(endPoint)
      .then((response) => response.json())
      .then((response) => {
        console.log(response);
        setMovies([...movies, ...response.results]);
        setMainMovieImage(response.results[0]);
        setCurrentPage(response.page);
      });
  };

  const handleClick = () => {
    const endPoint = `${MOVIE_APP_API}movie/popular?api_key=${APP_KEY_MOVIE}&language=en-US&page=${
      currentPage + 1
    }`;
    fetchMovies(endPoint);
  };
  return (
    <>
      <Layout>
        {MainMovieImage && (
          <ImageBg
            image={`${IMAGE_URL_MOVIE}w1280/${MainMovieImage.backdrop_path}`}
            title={MainMovieImage.original_title}
            text={MainMovieImage.overview}
          />
        )}
        <div style={{ width: "85%", margin: "1rem auto" }}>
          <h2>Movies by latest</h2>
          <hr />

          {/* Movie Grid Cards */}

          <div className="filmes">
            {movies &&
              movies.map((movie, index) => (
                <React.Fragment key={index}>
                  <GridCards
                    landingPage
                    image={
                      movie.poster_path
                        ? `http://image.tmdb.org/t/p/w500${movie.poster_path}`
                        : null
                    }
                    movieId={movie.id}
                    movieName={movie.original_title}
                  />
                </React.Fragment>
              ))}
          </div>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <button className="btn btn-primary" onClick={handleClick}>
            Load more
          </button>
        </div>
      </Layout>
    </>
  );
}

export default LandingPage;
