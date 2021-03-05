import React, { useRef } from 'react'
import { Link } from 'react-router-dom'
import { createImageUrl } from '../imageUrl'
import { Movie } from '../types'

type MovieProps = {
  title: string
  movies: Movie[]
}

const BigMovieCard: React.FC<MovieProps> = (props: MovieProps) => {
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
            <Link to={`/movies/${movie.id}`}
              className='BigMovieCard'
              style={
                {backgroundImage: `linear-gradient(to bottom, rgba(227, 226, 226, 0), rgba(28, 27, 27, 0.90)), url(${createImageUrl(movie.backdrop_path, {width: 1280})})`}
              }>
              <h3 className='BigMovieCardText'>{movie.title} ({new Date (movie.release_date).getFullYear()})</h3>
            </Link>
          )}
      </div>
    </div>
  )
}

export default BigMovieCard