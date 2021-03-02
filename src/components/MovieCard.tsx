import React, { useRef } from 'react'
import { Link } from 'react-router-dom'
import { createPosterUrl } from '../imageUrl'
import { Movie } from '../types'

type MovieProps = {
  title: string
  movies: Movie[]
}

const MovieCard: React.FC<MovieProps> = (props: MovieProps) => {
  const movieListElement = useRef<HTMLDivElement | null>(null)
  
  return (
    <div>
      <div className='ScrollListHeader'>
        <h2>{props.title}</h2>
        <div>
          <button className='ScrollButton' onClick={() => movieListElement.current?.scrollBy({left: -180, behavior: 'smooth'})}>Previous</button>
          <button className='ScrollButton' onClick={() => movieListElement.current?.scrollBy({left: 180, behavior: 'smooth'})}>Next</button>
        </div>
      </div>
        <div ref={movieListElement} className='MovieList'>
          {props.movies.map(movie =>
            <div className='MovieCard' key={movie.id}> 
              <Link to={`/movies/${movie.id}`}>
                <img
                  src={createPosterUrl(movie.poster_path, {width: 185})}
                  alt='Poster of movie'
                  className='Poster'
                /> 
                <h3>{movie.title} ({new Date (movie.release_date).getFullYear()})</h3>
              </Link> 
            </div>
          )}
      </div>
    </div>
  )
}

export default MovieCard