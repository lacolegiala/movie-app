import React, { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { tmdbApiClient } from '../utils/tmdbApiClient'
import { Genre } from '../types'
import ScrollButtons from './ScrollButtons'
import action from '../images/action.jpeg'
import adventure from '../images/adventure.jpeg'
import animation from '../images/animation.jpeg'
import comedy from '../images/comedy.jpeg'
import crime from '../images/crime.jpeg'
import documentary from '../images/documentary.jpeg'
import drama from '../images/drama.jpeg'
import family from '../images/family.jpeg'
import fantasy from '../images/fantasy.jpeg'
import history from '../images/history.jpeg'
import horror from '../images/horror.jpeg'
import music from '../images/music.jpeg'
import mystery from '../images/mystery.jpeg'
import romance from '../images/romance.jpeg'
import scienceFiction from '../images/science-fiction.jpeg'
import tvMovie from '../images/tv-movie.jpeg'
import thriller from '../images/thriller.jpeg'
import war from '../images/war.jpeg'
import western from '../images/western.jpeg'

const GenreList: React.FC = () => {
  const [genres, setGenres] = useState<Genre[]>([])
  const genreListElement = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    const getGenres = async () => {
      try {
        const genreResponse = await tmdbApiClient.get('genre/movie/list')
        setGenres(genreResponse.data.genres)
      } catch (error) {
        console.log(error)
      }
    }
    getGenres()
  }, [])

  const getImageForGenre = (id: number) => {
    switch (id) {
      case 28:
        return action
      case 12:
        return adventure
      case 16:
        return animation
      case 35:
        return comedy
      case 80:
        return crime
      case 99:
        return documentary
      case 18:
        return drama
      case 10751:
        return family
      case 14:
        return fantasy
      case 36:
        return history
      case 27:
        return horror
      case 10402:
        return music
      case 9648:
        return mystery
      case 10749:
        return romance
      case 878:
        return scienceFiction
      case 10770:
        return tvMovie
      case 53:
        return thriller
      case 10752:
        return war
      case 37:
        return western
    }
  }

  return (
    <div>
      <div className='ScrollListHeader'>
        <h2>Genres</h2>
        <ScrollButtons listElement={genreListElement} scrollDistance={300}></ScrollButtons>
      </div>
      <div ref={genreListElement} className='GenreList'>
        {genres.map(genre =>
          <Link className='Genre' to={`/genre/${genre.id}`} key={genre.id} style={{backgroundImage: `linear-gradient(to bottom, rgba(246, 246, 252, 0.54), rgba(120, 18, 96, 0.72)), url(${getImageForGenre(genre.id)})`}}>
            <h3>{genre.name}</h3>
          </Link>
        )}
      </div>
    </div>
  )
}

export default GenreList