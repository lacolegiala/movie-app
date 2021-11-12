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
  const [actorPageState, setActorPageState] = useState<Case>({type: 'loading'})
  const [sortMoviesBy, setSortMoviesBy] = useState<string>('Newest')

  const {id} = useParams<{id: string}>()

  const getActorInfo = useCallback(
    async () => {
      try {
        const personInfo = await tmdbApiClient.get(`person/${id}`)
        const movieInfo = await tmdbApiClient.get(`person/${id}/movie_credits`)
        setActorPageState({type: 'success', personData: personInfo.data, movieCredits: movieInfo.data})
      }
      catch (error) {
        setActorPageState({type: 'error'})
        console.error(error)
      }
    },
    [id]
  )

  useEffect(() => {
    getActorInfo()
  }, [getActorInfo])

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString()
  }

  const sortMovies = () => {
    if (actorPageState.type === 'success') {
      let sortedMovies
      if (sortMoviesBy === 'Newest') {
        sortedMovies = ([] as MovieCredit[]).concat(actorPageState.movieCredits.cast)
          .sort((a, b) => a.release_date > b.release_date ? -1 : 1)
      }
      else if (sortMoviesBy === 'Oldest') {
        sortedMovies = ([] as MovieCredit[]).concat(actorPageState.movieCredits.cast)
          .sort((a, b) => a.release_date < b.release_date ? -1 : 1)
      }
      else if (sortMoviesBy === 'Most popular') {
        sortedMovies = ([] as MovieCredit[]).concat(actorPageState.movieCredits.cast)
          .sort((a, b) => a.popularity > b.popularity ? -1 : 1)
      }
      else if (sortMoviesBy === 'Top rated') {
        sortedMovies = ([] as MovieCredit[]).concat(actorPageState.movieCredits.cast)
          .sort((a, b) => a.vote_average > b.vote_average ? -1 : 1)
      }
      if (sortedMovies)
      return sortedMovies.map(movie =>
        <div className='PosterCard' key={movie.id}>
          <Link className='PosterText' to={`/movies/${movie.id}`}>
            {movie.poster_path ?
              <img
                src={createImageUrl(movie.poster_path, {width: 300})}
                alt={`Poster of ${movie.title}`}
                className='Poster'
              />
              :
              <div className='NoPosterCard aspect-ratio-box'>No poster available</div> 
            }
            <h3 className='SmallMargin'>{movie.title}</h3>
            <p className='SmallMargin'>{createReleaseYear(movie.release_date)}</p>
            <p>{movie.character}</p>
          </Link>
        </div>
      )
    }
  }

  const handleSelectOptionChange: React.ChangeEventHandler<HTMLSelectElement> = (event) => {
    setSortMoviesBy(event.target.value)
  }

  return (
    <div className='Container'>
      {actorPageState.type ==='success' &&
        <div>
          <h1>{actorPageState.personData.name}</h1>
          {actorPageState.personData.profile_path &&
            <img
            src={createImageUrl(actorPageState.personData.profile_path, {width: 300})}
            alt='Actor'
            />
          }
          {actorPageState.personData.birthday &&
            <div>
              <h2>Date of birth</h2>
              <div>{formatDate(actorPageState.personData.birthday)}</div>
            </div>
          }
          {actorPageState.personData.deathday &&
            <div>
              <h2>Date of death</h2>
              <div>{formatDate(actorPageState.personData.deathday)}</div>
            </div>
          }
          <h2>Biography</h2>
          <div className='ActorInfo'>{actorPageState.personData.biography}</div>
          <h2>Movies</h2>
          <label>nakke
            <select onChange={handleSelectOptionChange} name='sortBy' id='sortBy'>
              <option value='Newest'>Newest</option>
              <option value='Oldest'>Oldest</option>
              <option value='Most popular'>Most popular</option>
              <option value='Top rated'>Top rated</option>
            </select>
          </label>
          <div className='ActorMovieGrid'>
            {sortMovies()}
          </div>
        </div>
      }
    </div>
  )
}

export default ActorPage