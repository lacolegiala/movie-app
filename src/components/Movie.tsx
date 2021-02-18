import React from 'react'
import { Link } from 'react-router-dom'
import { createPosterUrl } from '../imageUrl'
import { Movie } from '../types'

type MovieProps = {
  title: string
  movies: Movie[]
}

const MovieInfo: React.FC<MovieProps> = (props: MovieProps) => {
  
  return (
    <div>
      <h1>{props.title}</h1>
      <div className='MovieList'>
        {props.movies.map(movie =>
          <div className='MovieCard' key={movie.id}> 
            <Link to={`/movies/${movie.id}`}>
              <img
                src={createPosterUrl(movie.poster_path, {width: 300})}
                alt='Poster of movie'
              /> 
              <h2>{movie.title}</h2>
            </Link> 
          </div>
        )}
      </div>
    </div>
  )
}

export default MovieInfo