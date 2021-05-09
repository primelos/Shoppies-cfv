import React, { useState, useEffect } from "react";
import "./App.css";
import Axios from "axios";
import Search from "./components/Search";
import Movies from "./components/movies";

function App() {
  const [searchData, setSearchData] = useState("");
  const [movies, setMovies] = useState([]);
  const [saveList, setSaveList] = useState([]);
  const [send, setSend] = useState();

  const API_KEY = process.env.REACT_APP_API_KEY;

  const getLocalMovies = () => {
    if (localStorage.getItem("movies") === null) {
      localStorage.setItem("movies", JSON.stringify([]));
    } else {
      let movieLocal = JSON.parse(localStorage.getItem("movies"));
      setMovies((x) => (x = movieLocal));
    }
  };

  const getLocalSaves = () => {
    if (localStorage.getItem("saved") === null) {
      localStorage.setItem("saved", JSON.stringify([]));
    } else {
      let todoLocal = JSON.parse(localStorage.getItem("saved"));
      setSaveList((x) => (x = todoLocal));
    }
  };

  const sending = (e) => {
    e.preventDefault();
    setSend(searchData);
  };
  useEffect(() => {
    const movieSelect = async () => {
      if (!send) {
        return;
      }
      let movieCall = await Axios.get(
        `https://www.omdbapi.com/?apikey=${API_KEY}&type=movie&s=${send}`
      );
      if (movieCall.data.Search) {
        setMovies(movieCall.data.Search);
      }
      setSearchData("");
    };
    movieSelect();
  }, [send]);

  const handleSave = (movie) => {
    if (saveList.length !== 5) {
      if (
        saveList.find(({ imdbID }) => imdbID === movie.imdbID) === undefined
      ) {
        setSaveList([...saveList, movie]);
      }
    }
  };

  useEffect(() => {
    getLocalMovies();
  }, []);

  useEffect(() => {
    getLocalSaves();
  }, []);

  useEffect(() => {
    localStorage.setItem("saved", JSON.stringify(saveList));
  }, [saveList]);

  useEffect(() => {
    localStorage.setItem("movies", JSON.stringify(movies));
  }, [movies]);

  return (
    <div className="App">
      <h1>
        The Shoppies <span>(select 5 nominations)</span>
      </h1>
      <Search
        setSearchData={setSearchData}
        searchData={searchData}
        saveList={saveList}
        sending={sending}
      />
      <Movies
        movies={movies}
        searchData={searchData}
        setSaveList={setSaveList}
        saveList={saveList}
        send={send}
        handleSave={handleSave}
      />
    </div>
  );
}

export default App;
