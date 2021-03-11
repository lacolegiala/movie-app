import axios from 'axios'

export const tmdbApiClient = axios.create({
  baseURL: 'https://api.themoviedb.org/3/'
});

const apiKey = 'd5e44dd33260c00852e5fd0e20c58722'

tmdbApiClient.defaults.params = {}
tmdbApiClient.defaults.params['api_key'] = apiKey

tmdbApiClient.interceptors.request.use(function (config) {
  config.params['session_id'] = window.localStorage.getItem('movie_app/sessionId')
  return config
}, function (error) {
  return Promise.reject(error)
})

