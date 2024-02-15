import React from "react";
import { useNavigate } from "react-router-dom";
import { useOnlineStatus } from "../context/OnlineStatusContext";
import NotFound from "../assets/NotFound.png";
import Search from "../assets/Search.png";
import Unwatched from "../assets/Unwatched.png";
import Watched from "../assets/Watched.png";

const MovieList = ({ movies, toggleWatchedStatus, isMovieWatched }) => {
  const navigate = useNavigate();
  const isOnline = useOnlineStatus();

  return (
    <div className="movies-container">
      {movies.map((movie) => (
        <div key={movie.id} className="movie">
          <img
            src={
              movie.poster_path
                ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                : NotFound
            }
            alt={movie.title}
            className="movie-poster"
          />
          <div className="movie-details">
            <button
              className="show-details-button"
              onClick={
                isOnline
                  ? () => {
                      navigate(`/movie/${movie.id}`);
                      window.scrollTo({
                        top: 0,
                        behavior: "smooth",
                      });
                    }
                  : () => {}
              }
              disabled={!isOnline}
              style={!isOnline ? { opacity: 0.5 } : {}}
            >
              <img
                src={Search}
                alt="Search"
                style={{ width: 20 }}
                title="Show Details"
              />
            </button>
            <button
              className="show-watched-button"
              onClick={() => toggleWatchedStatus(movie)}
            >
              <img
                src={isMovieWatched(movie) ? Unwatched : Watched}
                alt={isMovieWatched(movie) ? "Unwatched" : "Watched"}
                style={{ width: 20 }}
                title={
                  isMovieWatched(movie)
                    ? "Remove From Watched"
                    : "Add To Watched"
                }
              />
            </button>
          </div>
          <h2>{movie.title}</h2>
        </div>
      ))}
    </div>
  );
};

export default MovieList;
