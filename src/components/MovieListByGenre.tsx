import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { createPosterUrl } from '../imageUrl'
import { tmdbApiClient } from '../tmdbApiClient'
import { Movie } from '../types'

const MovieListByGenre: React.FC = () => {
  const [movies, setMovies] = useState<Movie[]>([])
  const { id } = useParams<{id: string}>()

  useEffect(() => {
    const discoverMovies = async () => {
      try {
        const moviesWithGenreResponse = await tmdbApiClient.get(`discover/movie?&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&with_genres=${id}`)
        setMovies(moviesWithGenreResponse.data.results)
      } catch (error) {
        console.log(error)
      }
    }
    discoverMovies()
  }, [id])

  return (
    <div>
      <h1>Movies of the selected genre</h1>
      {movies.map(movie => 
        <div key={movie.id}>
          <Link to={`/movies/${movie.id}`}>
            <h2>{movie.title}</h2>
            <img
              src={createPosterUrl(movie.poster_path, {width: 300})}
              alt='Poster of movie'
            /> 
          </Link> 
        </div>  
      )}
    </div>
  )
}

export default MovieListByGenre