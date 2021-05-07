import React, { useState, useEffect } from "react";
import "./App.css";
import Axios from "axios";
import Search from "./components/Search";
import Movies from "./components/movies";

function App() {
  const [searchData, setSearchData] = useState("");
  const [movies, setMovies] = useState([]);
  const [saveList, setSaveList] = useState([]);

  const API_KEY = process.env.REACT_APP_API_KEY;
  console.log(movies);

  const getLocalTodos = () => {
    if (localStorage.getItem("saved") === null) {
      localStorage.setItem("saved", JSON.stringify([]));
    } else {
      let todoLocal = JSON.parse(localStorage.getItem("saved"));
      setSaveList((x) => (x = todoLocal));
    }
  };
    

  const movieSelect = async (e) => {
    if (!searchData) {
      return;
    }
    e.preventDefault();
    let movieCall = await Axios.get(
      `https://www.omdbapi.com/?apikey=${API_KEY}&type=movie&s=${searchData}`
    );
    setMovies(movieCall.data.Search);
  };
  useEffect(() => {
    getLocalTodos()
  }, []);
  useEffect(() => {
    localStorage.setItem("saved", JSON.stringify(saveList));
  }, [saveList]);

  return (
    <div className="App">
      <h1>The Shoppies</h1>
      <Search
        setSearchData={setSearchData}
        searchData={searchData}
        movieSelect={movieSelect}
        saveList={saveList}
      />
      <Movies
        movies={movies}
        searchData={searchData}
        setSaveList={setSaveList}
        saveList={saveList}
      />
    </div>
  );
}

export default App;
