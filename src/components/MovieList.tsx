import React, { useEffect, useState } from 'react'
import instance from '../apiAgent'
import { Movie } from '../types'
import MovieInfo from './Movie'

const MovieList: React.FC = () => {
  const [topRatedmovies, setTopRatedMovies] = useState<Movie[]>([])
  const [popularMovies, setPopularMovies] = useState<Movie[]>([])
  const [newMovies, setNewMovies] = useState<Movie[]>([])

  const posterBaseUrl = 'http://image.tmdb.org/t/p/w185'

  useEffect(() => {
    const getTopRatedMovies = async () => {
      try {
        const [topRatedMoviesResponse, popularMoviesResponse, newMoviesResponse] = await Promise.all([
          instance.get(`top_rated?api_key=d5e44dd33260c00852e5fd0e20c58722&language=en-US&page=1`),
          instance.get(`popular?api_key=d5e44dd33260c00852e5fd0e20c58722&language=en-US&page=1`),
          instance.get(`now_playing?api_key=d5e44dd33260c00852e5fd0e20c58722&language=en-US&page=1`)
        ])
        setTopRatedMovies(topRatedMoviesResponse.data.results)
        setPopularMovies(popularMoviesResponse.data.results)
        setNewMovies(newMoviesResponse.data.results)
      } catch (error) {
        console.error(error)
      }
    }
    getTopRatedMovies()
  }, [])

  return (
    <div className="Frontpage">
      <MovieInfo title='New' movies={newMovies} posterBaseUrl={posterBaseUrl} />
      <MovieInfo title='Most popular' movies={popularMovies} posterBaseUrl={posterBaseUrl} />
      <MovieInfo title='Top rated' movies={topRatedmovies} posterBaseUrl={posterBaseUrl} />
    </div>
  )
}

export default MovieList