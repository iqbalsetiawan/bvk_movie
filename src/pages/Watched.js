import React from "react";
import { useWatchedMovies } from "../context/WatchedMoviesContext";
import MovieList from "../pages/MovieList";

function Watched() {
  const { watchedMovies, removeWatchedMovie } = useWatchedMovies();

  const toggleWatchedStatus = (movie) => {
    removeWatchedMovie(movie);
  };

  return (
    <MovieList
      movies={watchedMovies}
      toggleWatchedStatus={toggleWatchedStatus}
      isMovieWatched={() => true}
    />
  );
}

export default Watched;
