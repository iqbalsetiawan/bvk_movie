import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import axios from "axios";

import { OnlineStatusProvider } from "./context/OnlineStatusContext";
import { WatchedMoviesProvider } from "./context/WatchedMoviesContext";
import Loading from "./components/Loading";
import Header from "./pages/Header";
import Main from "./pages/Main";
import Watched from "./pages/Watched";
import Detail from "./pages/Detail";

const App = () => {
  const [movies, setMovies] = useState([]);
  const [initialMovies, setInitialMovies] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await axios.get(
          "https://api.themoviedb.org/3/discover/movie",
          {
            params: {
              api_key: process.env.REACT_APP_API_KEY,
              language: "en-US",
              sort_by: "popularity.desc",
              include_adult: false,
              include_video: false,
              page: 1,
            },
          },
        );
        setMovies(response.data.results);
        setInitialMovies(response.data.results);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching movies:", error);
        setLoading(false);
      }
    };

    fetchMovies();
  }, []);

  const handleSearch = async (searchTerm) => {
    if (!searchTerm) {
      setMovies(initialMovies);
      return;
    }

    setLoading(true);
    try {
      const response = await axios.get(
        "https://api.themoviedb.org/3/search/movie",
        {
          params: {
            api_key: process.env.REACT_APP_API_KEY,
            language: "en-US",
            query: searchTerm,
            include_adult: false,
          },
        },
      );
      setMovies(response.data.results);
      setLoading(false);
    } catch (error) {
      console.error("Error searching movies:", error);
      setLoading(false);
    }
  };

  return (
    <OnlineStatusProvider>
      <WatchedMoviesProvider>
        <Router>
          <Header onSearch={handleSearch}>
            <Routes>
              <Route
                path="/"
                element={loading ? <Loading /> : <Main movies={movies} />}
              />
              <Route
                path="/watched"
                element={loading ? <Loading /> : <Watched />}
              />
              <Route path="/movie/:id" element={<Detail />} />
            </Routes>
          </Header>
        </Router>
      </WatchedMoviesProvider>
    </OnlineStatusProvider>
  );
};

export default App;
