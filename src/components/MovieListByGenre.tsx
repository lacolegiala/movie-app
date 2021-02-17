import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { tmdbApiClient } from '../tmdbApiClient'
import { Movie } from '../types'

const MovieListByGenre: React.FC = () => {
  const [movies, setMovies] = useState<Movie[]>([])
  const { id } = useParams<{id: string}>()

  useEffect(() => {
    const discoverMovies = async () => {
      try {
        const moviesWithGenreResponse = await tmdbApiClient.get(`discover/movie?&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&with_genres=${id}`)
      } catch (error) {
        console.log(error)
      }
    }
    discoverMovies()
  }, [id])

  return (
    <div>
      <h1>Movies of the selected genre</h1>
    </div>
  )
}

export default MovieListByGenre