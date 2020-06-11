import React from "react";

function GridCards(props) {
  if (props.landingPage) {
    return (
   
          <div className="filmes_cada_quadrado">
            <a href={`/movie/${props.movieId}`}>
              <img
                style={{ width: "100%", height: "280px" }}
                src={props.image}
                alt={props.movieName}
              />
            </a>
          </div>
      
    );
  } else {
    return (
      <div className="filmes_cada_quadrado">
          <div style={{ position: "relative", }}>
            <img
              style={{ width: "100%", height: "320px"  }}
              src={props.image}
              alt={props.characterName}
            />
          </div>
      </div>
    );
  }
}

export default GridCards;
