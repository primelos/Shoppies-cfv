import React, { useState, useEffect } from 'react'
import styled from "styled-components";


const Movies = ({ movies, searchData, saveList, setSaveList }) => {

  const handleSave = (movie) => {
    console.log("handlesave", movie);
    // e.preventDefault();
    // let save = movies.filter(item => {
    //   item.imdbID !== movie.imdbID
    // })
    if (saveList.length !== 5) {
      if (!saveList.includes(movie)) {
        setSaveList([...saveList, movie]);
      }
    }
  };

  const deleteNomination = (save) => {
    setSaveList(
      saveList.filter((item) => {
        return item.Title !== save.Title;
      })
    );
  };

  // console.log("movies", movies);
  console.log("saveList", saveList);

  return (
    <Container>
      <ResultsContainer>
        {searchData && <p>Results for "{searchData}"</p>}
        {movies &&
          movies.map((movie, id) => (
            <DisplayResults key={id}>
              <MovieName>
                <img src={movie.Poster} alt={movie.Title} />{" "}
                <p>{movie.Title}</p> <p>({movie.Year})</p>
              </MovieName>
              <Button type="submit" onClick={() => handleSave(movie)}>
                Nominate
              </Button>
            </DisplayResults>
          ))}
      </ResultsContainer>
      <SavedContainer>
        {saveList.length > 0 && <p>Nominations...</p>}
        {saveList.map((save, id) => (
          <DisplayResults key={id}>
            <MovieName>
              {save.Title} {save.Year}
            </MovieName>
            <Button onClick={(e) => deleteNomination(save)}>
              <i className="fas fa-trash-alt"></i>
            </Button>
          </DisplayResults>
        ))}
      </SavedContainer>
    </Container>
  );
};

export default Movies;


const Container = styled.div`
  display: flex;
  width: 80%;
  margin: auto;
  background: #d4af37;
`;

const ResultsContainer = styled.div`
  padding: 0 5px 0 5px;
  width: 100%;
  border-right: 1px solid black;

  p:first-child {
    font-size: 20px;
    font-weight: 500;
  }
`;

const DisplayResults = styled.ul`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const SavedContainer = styled.div`
  padding: 0 5px 0 5px;
  width: 100%;
  p:first-child {
    font-size: 20px;
    font-weight: 500;
  }
`;

const MovieName = styled.li`
  display:flex;
  justify-content: center;
  align-items: center;
  img {
    width: 30px;
    height: 30px;
    padding-right: 6px;
    border: 4px;
  }
`
const Button = styled.button`
  border: none;
  padding: 10px;
  background: #e7e7e7;
  border-radius: 4px;
  font-weight: 600;
  margin-right: 5px;
  transition: all 0.2s ease 0s;

  &:hover {
    background: #9e9e9e;
    color: #fff;
    transform: scale(1.05);
  }
`;