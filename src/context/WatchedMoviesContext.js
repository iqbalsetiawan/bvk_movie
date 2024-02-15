import React, { createContext, useContext, useState, useEffect } from "react";
import Swal from "sweetalert2";

const WatchedMoviesContext = createContext();

export const useWatchedMovies = () => useContext(WatchedMoviesContext);

export const WatchedMoviesProvider = ({ children }) => {
  const [watchedMovies, setWatchedMovies] = useState(() => {
    const localData = localStorage.getItem("watchedMovies");
    return localData ? JSON.parse(localData) : [];
  });

  const [offlineChanges, setOfflineChanges] = useState(() => {
    const localData = localStorage.getItem("offlineChanges");
    return localData ? JSON.parse(localData) : [];
  });

  useEffect(() => {
    localStorage.setItem("offlineChanges", JSON.stringify(offlineChanges));
  }, [offlineChanges]);

  const addWatchedMovie = (movie) => {
    if (!navigator.onLine) {
      setOfflineChanges((changes) => [...changes, { action: "add", movie }]);
      Swal.fire(
        "Success!",
        "Movie added to watched list! Changes will take effect once you're back online.",
        "success",
      );
    } else {
      const newWatchedMovies = [...watchedMovies, movie];
      setWatchedMovies(newWatchedMovies);
      localStorage.setItem("watchedMovies", JSON.stringify(newWatchedMovies));
      Swal.fire("Success!", "Movie added to watched list!", "success");
    }
  };

  const removeWatchedMovie = (movie) => {
    if (!navigator.onLine) {
      setOfflineChanges((changes) => [...changes, { action: "remove", movie }]);
      Swal.fire(
        "Success!",
        "Movie removed from watched list! Changes will take effect once you're back online.",
        "success",
      );
    } else {
      const newWatchedMovies = watchedMovies.filter((m) => m.id !== movie.id);
      setWatchedMovies(newWatchedMovies);
      localStorage.setItem("watchedMovies", JSON.stringify(newWatchedMovies));
      Swal.fire("Success!", "Movie removed from watched list!", "success");
    }
  };

  useEffect(() => {
    const syncWithSimulatedBackend = () => {
      const updatedWatchedMovies = offlineChanges.reduce(
        (currentWatchedMovies, change) => {
          switch (change.action) {
            case "add":
              if (!currentWatchedMovies.find((m) => m.id === change.movie.id)) {
                return [...currentWatchedMovies, change.movie];
              }
              break;
            case "remove":
              return currentWatchedMovies.filter(
                (m) => m.id !== change.movie.id,
              );
            default:
              return currentWatchedMovies;
          }
          return currentWatchedMovies;
        },
        watchedMovies,
      );

      setWatchedMovies(updatedWatchedMovies);
      localStorage.setItem(
        "watchedMovies",
        JSON.stringify(updatedWatchedMovies),
      );

      setOfflineChanges([]);
      localStorage.setItem("offlineChanges", JSON.stringify([]));

      Swal.fire("Synced!", "Your offline changes have been synced!", "success");
    };

    window.addEventListener("online", syncWithSimulatedBackend);

    return () => window.removeEventListener("online", syncWithSimulatedBackend);
  }, [watchedMovies, offlineChanges]);

  return (
    <WatchedMoviesContext.Provider
      value={{ watchedMovies, addWatchedMovie, removeWatchedMovie }}
    >
      {children}
    </WatchedMoviesContext.Provider>
  );
};
