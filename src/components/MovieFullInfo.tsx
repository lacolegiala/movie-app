import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import {tmdbApiClient, apiKey} from '../tmdbApiClient'
import { MovieDetails } from '../types'

const MovieFullInfo: React.FC = () => {
  const [movie, setMovie] = useState<MovieDetails | undefined>()

  const {id} = useParams<{id: string}>()

  useEffect(() => {
    const getMovieInfo = async () => {
      try {
        const movieInfo = await tmdbApiClient.get(`${id}?api_key=${apiKey}&language=en-US`)
        setMovie(movieInfo.data)
      } catch (error) {
        console.error(error)
      }
    }
    getMovieInfo()
  }, [id])

  return (
    <div>
      {movie !== undefined ?
        <h1>{movie.title}</h1>
        : <h1>Loading</h1>
      }
    </div>
  )
}

export default MovieFullInfo