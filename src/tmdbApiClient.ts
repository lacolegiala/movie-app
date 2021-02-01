import axios from 'axios'

export const tmdbApiClient = axios.create({
  baseURL: 'https://api.themoviedb.org/3/movie/'
});

export const apiKey = 'd5e44dd33260c00852e5fd0e20c58722'
