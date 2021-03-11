import React, { useRef } from 'react'
import { Link } from 'react-router-dom'
import { createImageUrl } from '../utils/imageUrl'
import { Movie } from '../types'
import { createReleaseYear } from '../utils/releaseYear'

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
              <Link className='MovieCard' to={`/movies/${movie.id}`}>
                <img
                  src={createImageUrl(movie.poster_path, {width: 185})}
                  alt='Poster of movie'
                  className='Poster'
                /> 
                <h3 className='SmallMargin'>{movie.title}</h3>
                <p className='SmallMargin'>{createReleaseYear(movie.release_date)}</p>
              </Link> 
            </div>
          )}
      </div>
    </div>
  )
}

export default MovieCard