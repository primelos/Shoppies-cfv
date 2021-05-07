import Axios from 'axios'



const API_KEY = process.env.REACT_APP_API_KEY

Axios.get(`https://www.omdbapi.com/?apikey=${API_KEY}`)
// Axios.get(`https://www.omdbapi.com/?apikey=${API_KEY}&s=${inputValue}`)
