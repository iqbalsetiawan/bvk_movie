import React from "react";
import { useWatchedMovies } from "../context/WatchedMoviesContext";
import MovieList from "../pages/MovieList";

function Main({ movies }) {
  const { watchedMovies, addWatchedMovie, removeWatchedMovie } =
    useWatchedMovies();

  const toggleWatchedStatus = (movie) => {
    if (watchedMovies.some((m) => m.id === movie.id)) {
      removeWatchedMovie(movie);
    } else {
      addWatchedMovie(movie);
    }
  };

  const isMovieWatched = (movie) =>
    watchedMovies.some((m) => m.id === movie.id);

  return (
    <MovieList
      movies={movies}
      toggleWatchedStatus={toggleWatchedStatus}
      isMovieWatched={isMovieWatched}
    />
  );
}

export default Main;
