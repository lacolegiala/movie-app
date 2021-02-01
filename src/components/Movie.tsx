import React from 'react'
import { Movie } from '../types'

type MovieProps = {
  title: string
  movies: Movie[]
  posterBaseUrl: string
}

const MovieInfo: React.FC<MovieProps> = (props: MovieProps) => {
  return (
    <div>
      <h1>{props.title}</h1>
        {props.movies.map(movie =>
          <div> 
            <h2>{movie.title}</h2> 
            <img
              src={props.posterBaseUrl + movie.poster_path}
              alt='Poster of movie'
            /> 
          </div>
        )}
    </div>
  )
}

export default MovieInfo