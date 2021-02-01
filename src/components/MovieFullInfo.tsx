import React from 'react'
import { useParams } from 'react-router-dom'
import { Movie } from '../types'

type MovieInfoProps = {
  movies: Movie[]
}

const MovieFullInfo: React.FC<MovieInfoProps> = (props: MovieInfoProps) => {
  const {id} = useParams<{id: string | undefined}>()
  console.log('raaaaaa', id)
  // const movie = props.movies.find(movie => movie.id === id)
  return (
    <h1>{id}</h1>
  )
}

export default MovieFullInfo