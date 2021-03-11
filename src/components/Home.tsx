import React, { useEffect, useState } from 'react'
import {tmdbApiClient } from '../utils/tmdbApiClient'
import { Genre, Movie } from '../types'
import GenreList from './GenreList'
import MovieCard from './MovieCard'
import SearchBar from './SearchBar'
import { useHistory } from "react-router-dom";
import BigMovieCard from './BigMovieCard'

const Home: React.FC = () => {
  const [topRatedMovies, setTopRatedMovies] = useState<Movie[]>([])
  const [popularMovies, setPopularMovies] = useState<Movie[]>([])
  const [newMovies, setNewMovies] = useState<Movie[]>([])
  const [searchBarValue, setSearchBarValue] = useState<string>('')
  const [genres, setGenres] = useState<Genre[]>()

  const history = useHistory();

  useEffect(() => {
    const getMovies = async () => {
      try {
        const [topRatedMoviesResponse, popularMoviesResponse, newMoviesResponse, genresResponse] = await Promise.all([
          tmdbApiClient.get('movie/top_rated?&language=en-US&page=1'),
          tmdbApiClient.get('movie/popular?&language=en-US&page=1'),
          tmdbApiClient.get('movie/now_playing?&language=en-US&page=1'),
          tmdbApiClient.get('genre/movie/list')
        ])
        setTopRatedMovies(topRatedMoviesResponse.data.results)
        setPopularMovies(popularMoviesResponse.data.results)
        setNewMovies(newMoviesResponse.data.results)
        setGenres(genresResponse.data.genres)
      } catch (error) {
        console.error(error)
      }
    }
    getMovies()
  }, [])

  function handleSubmit(event: React.ChangeEvent<HTMLFormElement>) {
    history.push(`/search?query=${searchBarValue}`)
    event.preventDefault()
  }

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    setSearchBarValue(event.target.value)
  }

  return (
    <div className='Container'>
      <SearchBar value={searchBarValue} handleSubmit={handleSubmit} handleChange={handleChange} />
      <BigMovieCard title='New' movies={newMovies} genres={genres} />
      <MovieCard title='Most popular' movies={popularMovies} />
      <GenreList />
      <MovieCard title='Top rated' movies={topRatedMovies} />
    </div>
  )

}

export default Home