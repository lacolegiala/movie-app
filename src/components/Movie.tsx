import React from 'react'
import { Link } from 'react-router-dom'
import { createImageUrl } from '../imageUrl'
import { Movie } from '../types'

type MovieProps = {
  title: string
  movies: Movie[]
}


const MovieInfo: React.FC<MovieProps> = (props: MovieProps) => {
  
  return (
    <div>
      <h1>{props.title}</h1>
        {props.movies.map(movie =>
          <div key={movie.id}> 
            <Link to={`/movies/${movie.id}`}>
              <h2>{movie.title}</h2>
              <img
                src={createImageUrl(movie.poster_path, {width: 300})}
                alt='Poster of movie'
              /> 
            </Link> 
          </div>
        )}
    </div>
  )
}

export default MovieInfo