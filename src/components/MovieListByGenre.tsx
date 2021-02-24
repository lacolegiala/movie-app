import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { createPosterUrl } from '../imageUrl'
import { tmdbApiClient } from '../tmdbApiClient'
import { Genre, Movie } from '../types'

const MovieListByGenre: React.FC = () => {
  const [movies, setMovies] = useState<Movie[]>([])
  const [genre, setGenre] = useState<string>()
  const { id } = useParams<{id: string}>()

  useEffect(() => {
    const discoverMovies = async () => {
      try {
        const genreResponse = await tmdbApiClient.get<{genres: Genre[]}>('genre/movie/list')
        const genreList = genreResponse.data.genres
        const selectedGenre = genreList.find(genre => genre.id === parseInt(id))
        setGenre(selectedGenre?.name)
        const moviesWithGenreResponse = await tmdbApiClient.get(`discover/movie?&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&with_genres=${id}`)
        setMovies(moviesWithGenreResponse.data.results)
      } catch (error) {
        console.log(error)
      }
    }
    discoverMovies()
  }, [id])

  return (
    <div className='Container'>
      <h1>{genre}</h1>
      <div className='GridWrapper'>
        {movies.map(movie => 
          <div key={movie.id}>
            <Link to={`/movies/${movie.id}`}>
              <img
                className='Poster'
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

export default MovieListByGenre