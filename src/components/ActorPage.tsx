import React, { useCallback, useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { MovieCredit, MovieCredits, PersonDetails } from '../types'
import { createImageUrl } from '../utils/imageUrl'
import { createReleaseYear } from '../utils/releaseYear'
import { tmdbApiClient } from '../utils/tmdbApiClient'

type Success = {
  type: 'success'
  personData: PersonDetails
  movieCredits: MovieCredits
}

type Loading = {
  type: 'loading'
}

type ErrorData = {
  type: 'error'
}

type Case = Success | Loading | ErrorData

const ActorPage = () => {
  const [appCase, setAppCase] = useState<Case>({type: 'loading'})

  const {id} = useParams<{id: string}>()

  const getActorInfo = useCallback(
    async () => {
      try {
        const personInfo = await tmdbApiClient.get(`person/${id}`)
        const movieInfo = await tmdbApiClient.get(`person/${id}/movie_credits`)
        setAppCase({type: 'success', personData: personInfo.data, movieCredits: movieInfo.data})
      }
      catch (error) {
        setAppCase({type: 'error'})
        console.error(error)
      }
    },
    [id]
  )

  useEffect(() => {
    getActorInfo()
  }, [getActorInfo])

  const sortMovies = () => {
    if (appCase.type === 'success') {
      const sortedMovies = ([] as MovieCredit[]).concat(appCase.movieCredits.cast)
        .sort((a, b) => a.release_date > b.release_date ? -1 : 1)
      return sortedMovies.map(movie =>
        <Link key={movie.id} className='MovieCard' to={`/movies/${movie.id}`}>
          {movie.poster_path ?
            <img
              src={createImageUrl(movie.poster_path, {width: 185})}
              alt='Poster of movie'
              className='Poster'
            />
            :
            <div className='SmallNoPosterCard'>No poster available</div> 
          }
          <h3 className='SmallMargin'>{movie.title}</h3>
          <p className='SmallMargin'>{createReleaseYear(movie.release_date)}</p>
          <p>{movie.character}</p>
        </Link>
      )
    }
  }

  return (
    <div className='Container'>
      {appCase.type ==='success' &&
        <div>
          <h1>{appCase.personData.name}</h1>
          {appCase.personData.profile_path &&
            <img
            src={createImageUrl(appCase.personData.profile_path, {width: 300})}
            alt='Actor'
            />
          }
          {appCase.personData.birthday &&
            <div>
              <h2>Date of birth</h2>
              <div>{appCase.personData.birthday}</div>
            </div>
          }
          {appCase.personData.deathday &&
            <div>
              <h2>Date of death</h2>
              <div>{appCase.personData.deathday}</div>
            </div>
          }
          <h2>Biography</h2>
          <div className='ActorInfo'>{appCase.personData.biography}</div>
          <h2>Movies</h2>
          <div className='ActorMovieGrid'>
            {sortMovies()}
          </div>
        </div>
      }
    </div>
  )
}

export default ActorPage