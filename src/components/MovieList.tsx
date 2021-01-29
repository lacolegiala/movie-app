import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Movie } from '../types'

const MovieList: React.FC = () => {
  const [movies, setMovies] = useState<Movie[]>([])

  useEffect(() => {
    const baseUrl = `https://api.themoviedb.org/3/movie/top_rated?api_key=d5e44dd33260c00852e5fd0e20c58722&language=en-US&page=1`
    const getTopRatedMovies = async () => {
      try {
        const topRatedMoviesResponse = await axios.get(baseUrl)
        setMovies(topRatedMoviesResponse.data.results)
      } catch (error) {
        console.error(error)
      }
    }
    getTopRatedMovies()
  }, [])

  return (
    <div className="Frontpage">
      <h2>Top rated movies</h2>
      {movies !== [] && movies.map(movie =>
        <li>{movie.title}</li>  
      )}
    </div>
  )
}

export default MovieList