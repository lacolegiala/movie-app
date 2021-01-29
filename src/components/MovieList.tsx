import React, { useEffect, useState } from 'react'
import instance from '../apiAgent'
import { Movie } from '../types'

const MovieList: React.FC = () => {
  const [topRatedmovies, setTopRatedMovies] = useState<Movie[]>([])

  useEffect(() => {
    const getTopRatedMovies = async () => {
      try {
        const topRatedMoviesResponse = await instance.get(`top_rated?api_key=d5e44dd33260c00852e5fd0e20c58722&language=en-US&page=1`)
        setTopRatedMovies(topRatedMoviesResponse.data.results)
      } catch (error) {
        console.error(error)
      }
    }
    getTopRatedMovies()
  }, [])

  return (
    <div className="Frontpage">
      <h2>Top rated movies</h2>
      {topRatedmovies !== [] && topRatedmovies.map(movie =>
        <li>{movie.title}</li>  
      )}
    </div>
  )
}

export default MovieList