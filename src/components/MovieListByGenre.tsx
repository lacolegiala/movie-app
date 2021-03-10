import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { createImageUrl } from '../imageUrl'
import { tmdbApiClient } from '../tmdbApiClient'
import { Genre, Movie } from '../types'

const MovieListByGenre: React.FC = () => {
  const [movies, setMovies] = useState<Movie[]>([])
  const [genre, setGenre] = useState<string>()
  const [counter, setCounter] = useState(1)
  const { id } = useParams<{id: string}>()

  useEffect(() => {
    const discoverMovies = async () => {
      try {
        const genreResponse = await tmdbApiClient.get<{genres: Genre[]}>('genre/movie/list')
        const genreList = genreResponse.data.genres
        const selectedGenre = genreList.find(genre => genre.id === parseInt(id))
        setGenre(selectedGenre?.name)
        const moviesWithGenreResponse = await tmdbApiClient.get(`discover/movie?&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=${counter}&with_genres=${id}`)
        setMovies(moviesWithGenreResponse.data.results)
      } catch (error) {
        console.log(error)
      }
    }
    discoverMovies()
  }, [id, counter])

  return (
    <div className='Container'>
      <h1>{genre}</h1>
      <div className='GridWrapper'>
        {movies.map(movie => 
          <div className='PosterCard' key={movie.id}>
            <Link className='PosterText' to={`/movies/${movie.id}`}>
              <img
                className='Poster'
                src={createImageUrl(movie.poster_path, {width: 300})}
                alt='Poster of movie'
                /> 
              <h2>{movie.title}</h2>
              <p>{new Date (movie.release_date).getFullYear()}</p>
            </Link> 
          </div>  
        )}
      </div>
      <button onClick={() => setCounter(counter + 1)}>Load more</button>
    </div>
  )
}

export default MovieListByGenre