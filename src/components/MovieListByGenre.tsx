import React, { useCallback, useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { createImageUrl } from '../utils/imageUrl'
import { tmdbApiClient } from '../utils/tmdbApiClient'
import { Genre, Movie } from '../types'
import { createReleaseYear } from '../utils/releaseYear'

const MovieListByGenre: React.FC = () => {
  const [movies, setMovies] = useState<{movies: Movie[], numberOfMovies: number}>({movies: [], numberOfMovies: 0})
  const [genre, setGenre] = useState<string>()
  const [page, setPage] = useState(1)
  const { id } = useParams<{id: string}>()

  const discoverMovies = useCallback(
    async () => {
      try {
        const genreResponse = await tmdbApiClient.get<{genres: Genre[]}>('genre/movie/list')
        const genreList = genreResponse.data.genres
        const selectedGenre = genreList.find(genre => genre.id === parseInt(id))
        setGenre(selectedGenre?.name)
        const moviesWithGenreResponse = 
        await tmdbApiClient.get<{results: Movie[], total_results: number}>(
          `discover/movie?&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=${page}&with_genres=${id}`
        )
        setMovies({movies: movies.movies.concat(
          moviesWithGenreResponse.data.results), numberOfMovies: moviesWithGenreResponse.data.total_results}
        )
      } catch (error) {
        console.log(error)
      }
    },
    // no need to listen to movies, just causes an infinite loop
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [page, id]
  ) 

  useEffect(() => {
    discoverMovies()
  }, [discoverMovies])

  return (
    <div className='Container'>
      <h1>{genre}</h1>
      <div className='GridWrapper'>
        {movies.movies.map(movie => 
          <div className='PosterCard' key={movie.id}>
            <Link className='PosterText' to={`/movies/${movie.id}`}>
              <img
                className='Poster'
                src={createImageUrl(movie.poster_path, {width: 300})}
                alt='Poster of movie'
                /> 
              <h2>{movie.title}</h2>
              <p>{createReleaseYear(movie.release_date)}</p>
            </Link> 
          </div>  
        )}
      </div>
      <div className='ButtonContainer'>
        {movies.movies.length < movies.numberOfMovies ? 
          <button className='LoadButton' onClick={() => setPage(page + 1)}>Load more</button>
          : <div className='BottomText'>No more movies to show</div>
        }
      </div>
    </div>
  )
}

export default MovieListByGenre