import React, { useRef } from 'react'
import { Link } from 'react-router-dom'
import { createImageUrl } from '../utils/imageUrl'
import { Genre, Movie } from '../types'

type MovieProps = {
  title: string
  movies: Movie[]
  genres: Genre[] | undefined
}

const BigMovieCard: React.FC<MovieProps> = (props: MovieProps) => {
  const movieListElement = useRef<HTMLDivElement | null>(null)

  const createGenreDisplayNames = (genreIds: number[]) => {
    return genreIds.slice(0, 3).map(id => props.genres?.find(genre => genre.id === id)?.name).join(', ')
  }

  return (
    <div>
      <div className='ScrollListHeader'>
        <h2>{props.title}</h2>
        <div>
          <button className='SecondaryButton' onClick={() => movieListElement.current?.scrollBy({left: -180, behavior: 'smooth'})}>Previous</button>
          <button className='SecondaryButton' onClick={() => movieListElement.current?.scrollBy({left: 180, behavior: 'smooth'})}>Next</button>
        </div>
      </div>
        <div ref={movieListElement} className='MovieList'>
          {props.movies.map(movie =>
            <Link to={`/movies/${movie.id}`}
              key={movie.id}
              className='BigMovieCard'
              style={
                {backgroundImage: `linear-gradient(to bottom, rgba(227, 226, 226, 0), rgba(28, 27, 27, 0.90)), url(${createImageUrl(movie.backdrop_path, {width: 1280})})`}
              }>
                <div className='BigMovieCardText'>
                  <h3 className='SmallMargin'>{movie.title}</h3>
                  <p className='SmallMargin'>{createGenreDisplayNames(movie.genre_ids)}</p>
                </div>
            </Link>
          )}
      </div>
    </div>
  )
}

export default BigMovieCard