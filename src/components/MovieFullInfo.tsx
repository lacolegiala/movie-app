import React, { useCallback, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { createPosterUrl } from '../imageUrl'
import { tmdbApiClient } from '../tmdbApiClient'
import { List, MovieDetails } from '../types'

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
  const [appCase, setAppCase] = useState<Case>()
  const [lists, setLists] = useState<List[]>([])

  const {id} = useParams<{id: string}>()

  const getMovieInfo =  useCallback( 
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

  const addToList = async (id: number) => {
    try {
      const movieId = appCase?.type === 'success' ? appCase.data.id : undefined
      await tmdbApiClient.post(`list/${id}/add_item`, {media_id: movieId})
      window.alert('Added to list')
    } catch (error) {
      console.log(error)
    }
  }

  const youtubeTrailer = appCase?.type === 'success' 
    ? appCase?.data.videos.results.find(result => result.site === 'YouTube' && result.type === 'Trailer')
    : undefined

  return (
    <div className='Container'>
      {appCase?.type === 'success' &&
        <div>
          <h1>{appCase.data.title} ({new Date (appCase.data.release_date).getFullYear()})</h1>
          {appCase.data.genres.map(genre =>
            <li key={genre.id}>
              {genre.name}
            </li>  
          )}
          <img
            className='Poster'
            src={createPosterUrl(appCase.data.poster_path, {width: 500})}
            alt='Poster of movie'
          />
          {props.sessionId &&
            <div>
              <h2>Add to list</h2>
              {lists.map(list => 
                <button key={list.id} onClick={() => addToList(list.id)}>{list.name}</button>  
              )}
            </div>
          }
          <h2>Synopsis</h2> 
          <div>{appCase.data.overview}</div>
          {youtubeTrailer !== undefined &&
            <a href={`https://youtube.com/watch?v=${youtubeTrailer.key}`} rel='noreferrer' target='_blank'>Watch trailer</a>
          }
          <h2>Cast</h2>
          <div>
            {appCase.data.credits.cast.slice(0, 6).map(castMember => 
              <div key={castMember.id}>
                {castMember.name} as {castMember.character}
              </div>
            )}
          </div>
        </div>
      }
      {appCase?.type === 'loading' && <h1>Loading</h1>}
      {appCase?.type === 'error' &&
        <div>
          <h1>Something went wrong. Refresh page or check that the id is correct.</h1>
          <button onClick={getMovieInfo}>Try again</button>
        </div>
      }
    </div>
  )
}

export default MovieFullInfo