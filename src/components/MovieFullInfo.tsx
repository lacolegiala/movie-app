import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { createPosterUrl } from '../imageUrl'
import { tmdbApiClient } from '../tmdbApiClient'
import { List, MovieDetails } from '../types'

type MovieInfoProps = {
  sessionId: string | null
}

const MovieFullInfo: React.FC<MovieInfoProps> = (props: MovieInfoProps) => {
  const [movie, setMovie] = useState<MovieDetails | undefined>()
  const [lists, setLists] = useState<List[]>([])

  const {id} = useParams<{id: string}>()

  useEffect(() => {
    const getMovieInfo = async () => {
      try {
        const movieInfo = await tmdbApiClient.get(`movie/${id}?&language=en-US`)
        setMovie(movieInfo.data)
        if (window.localStorage.getItem('movie_app/sessionId')) {
          const accountResponse = await tmdbApiClient.get('account')
          const listResponse = await tmdbApiClient.get(`account/${accountResponse.data.id}/lists`)
          setLists(listResponse.data.results)
        }
      } catch (error) {
        console.error(error)
      }
    }
    getMovieInfo()
  }, [id])

  const addToList = async (id: number) => {
    try {
      const movieId = movie !== undefined ? movie.id : undefined
      await tmdbApiClient.post(`list/${id}/add_item`, {media_id: movieId})
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className='Container'>
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
          {props.sessionId &&
            <div>
              <h2>Add to list</h2>
              {lists.map(list => 
                <button onClick={() => addToList(list.id)}>{list.name}</button>  
              )}
            </div>
          }
          <h2>Synopsis</h2> 
          <div>{movie.overview}</div>
        </div>
        : <h1>Loading</h1>
      }
    </div>
  )
}

export default MovieFullInfo