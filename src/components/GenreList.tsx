import React, { useEffect, useState } from 'react'
import { tmdbApiClient } from '../tmdbApiClient'
import { Genre } from '../types'

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

  return (
    <div>
      <h2>Genres</h2>
      {genres.map(genre =>
        <li key={genre.id}>
          {genre.name}
        </li>
      )}
    </div>
  )
}

export default GenreList