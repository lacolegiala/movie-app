import axios from 'axios'

const tmdbApiClient = axios.create({
  baseURL: 'https://api.themoviedb.org/3/movie/'
});

export default tmdbApiClient