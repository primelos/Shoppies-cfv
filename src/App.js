import React, { useState, useEffect } from "react";
import "./App.css";
import Axios from "axios";
import Search from "./components/Search";
import Movies from "./components/movies";

function App() {
  const [searchData, setSearchData] = useState("");
  const [movies, setMovies] = useState([]);
  const [saveList, setSaveList] = useState([]);
  const [send, setSend] = useState()


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
    const sending = (e) => {
      e.preventDefault();
      setSend(searchData)
      
    }
useEffect(() => {

  const movieSelect = async () => {
    if (!send) {
      return;
    }
    let movieCall = await Axios.get(
      `https://www.omdbapi.com/?apikey=${API_KEY}&type=movie&s=${send}`
    );
    console.log('movieCall', movieCall);
    if(movieCall.data.Search){
      setMovies(movieCall.data.Search);
    }
    setSearchData('')
    console.log('hit');
  };
  movieSelect()
}, [send])


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
        saveList={saveList}
        sending={sending}
      />
      <Movies
        movies={movies}
        searchData={searchData}
        setSaveList={setSaveList}
        saveList={saveList}
        send={send}
      />
    </div>
  );
}

export default App;
