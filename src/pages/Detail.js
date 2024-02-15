import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

import Loading from "../components/Loading";
import NotFound from "../assets/NotFound.png";
import Unwatched from "../assets/Unwatched.png";
import Watched from "../assets/Watched.png";
import { createStarRating } from "../utils/rate";
import { useWatchedMovies } from "../context/WatchedMoviesContext";

const Detail = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const { watchedMovies, addWatchedMovie, removeWatchedMovie } =
    useWatchedMovies();
  const [loading, setLoading] = useState(true);
  const [cast, setCast] = useState([]);

  useEffect(() => {
    const fetchMovieDetails = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          `https://api.themoviedb.org/3/movie/${id}`,
          {
            params: {
              api_key: process.env.REACT_APP_API_KEY,
            },
          },
        );
        setMovie(response.data);

        const castResponse = await axios.get(
          `https://api.themoviedb.org/3/movie/${id}/credits`,
          { params: { api_key: process.env.REACT_APP_API_KEY } },
        );
        setCast(castResponse.data.cast?.slice(0, 7));
      } catch (error) {
        console.error("Error fetching movie details:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMovieDetails();
  }, [id]);

  if (loading) {
    return <Loading />;
  }

  const isMovieWatched = (movie) => {
    return watchedMovies.some((m) => m.id === movie.id);
  };

  const handleToggleWatched = (movie) => {
    if (isMovieWatched(movie)) {
      removeWatchedMovie(movie);
    } else {
      addWatchedMovie(movie);
    }
  };

  return (
    <div className="detail-container">
      <div
        className="detail-banner"
        style={{
          backgroundImage: `url(https://image.tmdb.org/t/p/original${movie.backdrop_path})`,
          opacity: 0.85,
        }}
      >
        <div className="detail-banner-overlay">
          <div className="detail-content">
            <div className="detail-poster">
              <img
                src={
                  movie.poster_path
                    ? `https://image.tmdb.org/t/p/w300${movie.poster_path}`
                    : NotFound
                }
                alt={`Poster of ${movie.title}`}
              />
            </div>
            <div className="detail-info">
              <h1 className="detail-title">
                {movie.title} ({new Date(movie.release_date).getFullYear()}){" "}
                <button
                  className="show-watched-button"
                  onClick={() => handleToggleWatched(movie)}
                >
                  <img
                    src={isMovieWatched(movie) ? Unwatched : Watched}
                    alt={isMovieWatched(movie) ? Unwatched : Watched}
                    style={{
                      width: 20,
                    }}
                    title={
                      isMovieWatched(movie)
                        ? "Remove From Watched"
                        : "Add To Watched"
                    }
                  />
                </button>
              </h1>
              <p className="detail-genre">
                Genres: {movie.genres.map((genre) => genre.name).join(", ")}
              </p>
              <div className="detail-rating">
                {createStarRating(Math.floor(movie.vote_average))}
                <span className="rating-number">
                  {Math.floor(movie.vote_average)}
                </span>
              </div>

              <p className="detail-runtime">Runtime: {movie.runtime} minutes</p>
              <p className="detail-release-date">
                Release Date:{" "}
                {new Intl.DateTimeFormat("en-US", {
                  month: "long",
                  day: "numeric",
                  year: "numeric",
                }).format(new Date(movie.release_date))}
              </p>
              <p className="detail-status">Status: {movie.status}</p>
              <h2>Overview</h2>
              <p>{movie.overview}</p>
            </div>
          </div>
        </div>
      </div>
      <div className="cast-container">
        <h3>Top Cast</h3>
        <div className="cast-grid">
          {cast.map((actor) => (
            <div className="cast-member" key={actor.cast_id}>
              <img
                src={
                  actor.profile_path
                    ? `https://image.tmdb.org/t/p/w200${actor.profile_path}`
                    : NotFound
                }
                alt={`${actor.name}`}
                className="cast-member-img"
              />
              <div className="cast-member-info">
                <p className="cast-member-name">{actor.name}</p>
                <p className="cast-member-character">{actor.character}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Detail;
