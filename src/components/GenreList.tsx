import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { tmdbApiClient } from '../tmdbApiClient'
import { Genre } from '../types'
import action from '../images/action.png'
import adventure from '../images/adventure.png'
import animation from '../images/animation.png'
import comedy from '../images/comedy.png'
import crime from '../images/crime.png'
import documentary from '../images/documentary.png'
import drama from '../images/drama.png'
import family from '../images/family.png'
import fantasy from '../images/fantasy.png'
import history from '../images/history.png'
import horror from '../images/horror.png'
import music from '../images/music.png'
import mystery from '../images/mystery.png'
import romance from '../images/romance.png'
import scienceFiction from '../images/science-fiction.png'
import tvMovie from '../images/tv-movie.png'
import thriller from '../images/thriller.png'
import war from '../images/war.png'
import western from '../images/western.png'

const GenreList: React.FC = () => {
  const [genres, setGenres] = useState<Genre[]>([])

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
      <h2>Genres</h2>
      <div className='GenreList'>
        {genres.map(genre =>
          <Link className='Genre' to={`/genre/${genre.id}`} key={genre.id} style={{backgroundImage: `url(${getImageForGenre(genre.id)})`}}>
            {genre.name}
          </Link>
        )}
      </div>
    </div>
  )
}

export default GenreList