import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { createPosterUrl } from '../imageUrl'
import { tmdbApiClient } from '../tmdbApiClient'
import { List, MovieDetails } from '../types'

const MovieFullInfo: React.FC = () => {
  const [movie, setMovie] = useState<MovieDetails | undefined>()
  const [lists, setLists] = useState<List[]>([])

  const {id} = useParams<{id: string}>()

  useEffect(() => {
    const getMovieInfo = async () => {
      try {
        const movieInfo = await tmdbApiClient.get(`movie/${id}?&language=en-US`)
        setMovie(movieInfo.data)
        const accountResponse = await tmdbApiClient.get('account')
        const listResponse = await tmdbApiClient.get(`account/${accountResponse.data.id}/lists`)
        setLists(listResponse.data.results)
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
            src={createPosterUrl(movie.poster_path, {width: 500})}
            alt='Poster of movie'
          />
          <h2>Add to list</h2>
          {lists.map(list => 
            list.name  
          )}
          <h2>Synopsis</h2> 
          <div>{movie.overview}</div>
        </div>
        : <h1>Loading</h1>
      }
    </div>
  )
}

export default MovieFullInfo