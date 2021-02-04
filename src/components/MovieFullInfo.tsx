import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { createImageUrl } from '../imageUrl'
import {tmdbApiClient, apiKey} from '../tmdbApiClient'
import { MovieDetails } from '../types'

const MovieFullInfo: React.FC = () => {
  const [movie, setMovie] = useState<MovieDetails | undefined>()

  const {id} = useParams<{id: string}>()

  useEffect(() => {
    const getMovieInfo = async () => {
      try {
        const movieInfo = await tmdbApiClient.get(`movie/${id}?api_key=${apiKey}&language=en-US`)
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
        <div>
          <h1>{movie.title}</h1>
          {movie.genres.map(genre =>
            <li key={genre.id}>
              {genre.name}
            </li>  
          )}
          <img
            src={createImageUrl(movie.poster_path, {width: 500})}
            alt='Poster of movie'
          />
          <h2>Synopsis</h2> 
          <div>{movie.overview}</div>
        </div>
        : <h1>Loading</h1>
      }
    </div>
  )
}

export default MovieFullInfo