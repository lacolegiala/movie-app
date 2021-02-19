import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { tmdbApiClient } from '../tmdbApiClient'
import { Genre } from '../types'
import action from '../images/action.png'
import adventure from '../images/adventure.png'
import animation from '../images/animation.png'

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

  const imageChecker = (id: number) => {
    switch (id) {
      case 28:
        return action
      case 12:
        return adventure
      case 16:
        return animation
    }
  }

  return (
    <div>
      <h2>Genres</h2>
      <div className='GenreList'>
        {genres.map(genre =>
          <Link className='Genre' to={`/genre/${genre.id}`} key={genre.id} style={{backgroundImage: `url(${imageChecker(genre.id)})`}}>
            {genre.name}
          </Link>
        )}
      </div>
    </div>
  )
}

export default GenreList