import React, { useEffect, useState } from 'react'
import {tmdbApiClient, apiKey} from '../tmdbApiClient'
import { Movie } from '../types'
import MovieInfo from './Movie'

const Home: React.FC = () => {
  const [topRatedMovies, setTopRatedMovies] = useState<Movie[]>([])
  const [popularMovies, setPopularMovies] = useState<Movie[]>([])
  const [newMovies, setNewMovies] = useState<Movie[]>([])

  useEffect(() => {
    const getMovies = async () => {
      try {
        const [topRatedMoviesResponse, popularMoviesResponse, newMoviesResponse] = await Promise.all([
          tmdbApiClient.get(`top_rated?api_key=${apiKey}&language=en-US&page=1`),
          tmdbApiClient.get(`popular?api_key=${apiKey}&language=en-US&page=1`),
          tmdbApiClient.get(`now_playing?api_key=${apiKey}&language=en-US&page=1`)
        ])
        setTopRatedMovies(topRatedMoviesResponse.data.results)
        setPopularMovies(popularMoviesResponse.data.results)
        setNewMovies(newMoviesResponse.data.results)
      } catch (error) {
        console.error(error)
      }
    }
    getMovies()
  }, [])

  return (
    <div>
      <MovieInfo title='New' movies={newMovies} />
      <MovieInfo title='Most popular' movies={popularMovies} />
      <MovieInfo title='Top rated' movies={topRatedMovies} />
    </div>
  )

}

export default Home