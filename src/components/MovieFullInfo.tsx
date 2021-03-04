import React, { useCallback, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { tmdbApiClient } from '../tmdbApiClient'
import { List, MovieDetails } from '../types'
import MovieFullInfoSuccess from './MovieFullInfoSuccess'

type MovieInfoProps = {
  sessionId: string | null
}

type Success = {
  type: 'success'
  data: MovieDetails
}

type Loading = {
  type: 'loading'
}

type ErrorData = {
  type: 'error'
}

type Case = Success | Loading | ErrorData

const MovieFullInfo: React.FC<MovieInfoProps> = (props: MovieInfoProps) => {
  const [appCase, setAppCase] = useState<Case>({type: 'loading'})
  const [lists, setLists] = useState<List[]>([])

  const {id} = useParams<{id: string}>()

  const getMovieInfo = useCallback( 
    async () => {
      try {
        const movieInfo = await tmdbApiClient.get(`movie/${id}?&language=en-US&append_to_response=credits,videos`)
        setAppCase({type: 'success', data: movieInfo.data})
        if (window.localStorage.getItem('movie_app/sessionId')) {
          const accountResponse = await tmdbApiClient.get('account')
          const listResponse = await tmdbApiClient.get(`account/${accountResponse.data.id}/lists`)
          setLists(listResponse.data.results)
        }
      } catch (error) {
        setAppCase({type: 'error'})
        console.error(error)
      }
    },
    [id] 
  )

  useEffect(() => {
    getMovieInfo()
  }, [getMovieInfo])

  const addToList = async (listId: number, movieId: number) => {
    try {
      await tmdbApiClient.post(`list/${listId}/add_item`, {media_id: movieId})
      window.alert('Added to list')
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className='Container'>
      {appCase.type === 'success' &&
        <MovieFullInfoSuccess movieData={appCase.data} sessionId={props.sessionId} lists={lists} addToList={addToList} />
      }
      {appCase.type === 'loading' && <h1>Loading</h1>}
      {appCase.type === 'error' &&
        <div>
          <h1>Something went wrong. Refresh page or check that the id is correct.</h1>
          <button onClick={getMovieInfo}>Try again</button>
        </div>
      }
    </div>
  )
}

export default MovieFullInfo