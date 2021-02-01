import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import instance from '../apiAgent'
import { Movie } from '../types'

type MovieInfoProps = {
  movies: Movie[]
}

const MovieFullInfo: React.FC<MovieInfoProps> = (props: MovieInfoProps) => {
  const [movie, setMovie] = useState<Movie | undefined>()

  const {id} = useParams<{id: string}>()

  useEffect(() => {
    const getMovieInfo = async () => {
      try {
        const movieInfo = await instance.get(`${id}?api_key=d5e44dd33260c00852e5fd0e20c58722&language=en-US`)
        setMovie(movieInfo.data)
      } catch (error) {
        console.error(error)
      }
    }
    getMovieInfo()
  }, [id])

  return (
    <div>
      {movie !== undefined ?
        <h1>{movie.title}</h1>
        : <h1>Loading</h1>
      }
    </div>
  )
}

export default MovieFullInfo