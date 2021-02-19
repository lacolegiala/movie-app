import React, { useEffect, useState } from 'react'
import {tmdbApiClient } from '../tmdbApiClient'
import { Movie } from '../types'
import GenreList from './GenreList'
import MovieInfo from './Movie'
import SearchBar from './SearchBar'

const Home: React.FC = () => {
  const [topRatedMovies, setTopRatedMovies] = useState<Movie[]>([])
  const [popularMovies, setPopularMovies] = useState<Movie[]>([])
  const [newMovies, setNewMovies] = useState<Movie[]>([])

  useEffect(() => {
    const getMovies = async () => {
      try {
        const [topRatedMoviesResponse, popularMoviesResponse, newMoviesResponse] = await Promise.all([
          tmdbApiClient.get(`movie/top_rated?&language=en-US&page=1`),
          tmdbApiClient.get(`movie/popular?&language=en-US&page=1`),
          tmdbApiClient.get(`movie/now_playing?&language=en-US&page=1`)
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
    <div className='Container'>
      <SearchBar />
      <GenreList />
      <MovieInfo title='New' movies={newMovies} />
      <MovieInfo title='Most popular' movies={popularMovies} />
      <MovieInfo title='Top rated' movies={topRatedMovies} />
    </div>
  )

}

export default Home