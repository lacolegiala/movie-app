import React, { useEffect, useState } from 'react'
import instance from '../apiAgent'
import { Movie } from '../types'

const MovieList: React.FC = () => {
  const [topRatedmovies, setTopRatedMovies] = useState<Movie[]>([])
  const [popularMovies, setPopularMovies] = useState<Movie[]>([])
  const [newMovies, setNewMovies] = useState<Movie[]>([])

  const posterBaseUrl = 'http://image.tmdb.org/t/p/w185'

  useEffect(() => {
    const getTopRatedMovies = async () => {
      try {
        const topRatedMoviesResponse = await instance.get(`top_rated?api_key=d5e44dd33260c00852e5fd0e20c58722&language=en-US&page=1`)
        setTopRatedMovies(topRatedMoviesResponse.data.results)
        const popularMoviesResponse = await instance.get(`popular?api_key=d5e44dd33260c00852e5fd0e20c58722&language=en-US&page=1`)
        setPopularMovies(popularMoviesResponse.data.results)
        const newMoviesResponse = await instance.get(`now_playing?api_key=d5e44dd33260c00852e5fd0e20c58722&language=en-US&page=1`)
        setNewMovies(newMoviesResponse.data.results)
      } catch (error) {
        console.error(error)
      }
    }
    getTopRatedMovies()
  }, [])

  return (
    <div className="Frontpage">
      <h2>New</h2>
      {newMovies !== [] && newMovies.map(movie =>
        <div> 
          <h3>{movie.title}</h3> 
          <img
            src={posterBaseUrl + movie.poster_path}
            alt='Poster of movie'
          /> 
        </div>
      )}
      <h2>Most popular</h2>
      {popularMovies !== [] && popularMovies.map(movie =>
        <div>
          <h3>{movie.title}</h3>  
          <img
            src={posterBaseUrl + movie.poster_path}
            alt='Poster of movie'
          />
        </div>
      )}
      <h2>Top rated movies</h2>
      {topRatedmovies !== [] && topRatedmovies.map(movie =>
      <div>
        <h3>{movie.title}</h3>
        <img
          src={posterBaseUrl + movie.poster_path}
          alt='Poster of movie'
        />
      </div>
      )}
    </div>
  )
}

export default MovieList