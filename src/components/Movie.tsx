import React from 'react'
import { Link } from 'react-router-dom'
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
          <div key={movie.id}> 
            <Link to={`/movies/${movie.id}`}>{movie.title}</Link> 
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