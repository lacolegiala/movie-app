import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { useQuery } from '../hooks/useQuery';
import { createImageUrl } from '../utils/imageUrl';
import { tmdbApiClient } from '../utils/tmdbApiClient';
import { Movie } from '../types';
import SearchBar from './SearchBar';
import { useHistory } from "react-router-dom";
import { createReleaseYear } from '../utils/releaseYear';

const SearchResults: React.FC = () => {
  const [results, setResults] = useState<{movies: Movie[], numberOfMovies: number}>({movies: [], numberOfMovies: 0})
  const queryParameter = useQuery().get('query')
  const [searchBarValue, setSearchBarValue] = useState<string>(queryParameter ?? '')
  const [page, setPage] = useState(1)

  const history = useHistory();

  useEffect(() => {
    const getResults = async () => {
      try {
        if (queryParameter) {
          const resultInfo =
           await tmdbApiClient.get<{results: Movie[], total_results: number}>(
             `search/movie?&language=en-US&query=${queryParameter}&page=${page}&include_adult=false`
            )
          if (page > 1) {
            setResults({movies: results.movies.concat(resultInfo.data.results), numberOfMovies: resultInfo.data.total_results})
          }
          else {
            setResults({movies: resultInfo.data.results, numberOfMovies: resultInfo.data.total_results})
          }
        }
      } catch {
        console.log('error')
      }
    }
    getResults()
    // there is really no need to listen to results' changes, it just causes an infinite loop
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, queryParameter])
  
  function handleSubmit(event: React.ChangeEvent<HTMLFormElement>) {
    history.push(`/search?query=${searchBarValue}`)
    setPage(1)
    event.preventDefault()
  }

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    setSearchBarValue(event.target.value)
  }

  const resultsToShow = results.movies.filter(result => result.poster_path !== null)

  return (
    <div className='Container'>
      <SearchBar value={searchBarValue} handleSubmit={handleSubmit} handleChange={handleChange}/>
      <h1>Search results for '{queryParameter}'</h1>
      <p>{results.numberOfMovies} results</p>
      <div className='GridWrapper'>
        {resultsToShow.map(result => 
          <div className='PosterCard' key={result.id}>
            <Link className='PosterText' to={`/movies/${result.id}`}>
              <img
                className='Poster'
                src={createImageUrl(result.poster_path, {width: 300})}
                alt='Poster of movie'
                />
              <h2>{result.title}</h2>
              <p>{createReleaseYear(result.release_date)}</p>
            </Link> 
          </div>  
        )}
      </div>
      {results.movies.length < results.numberOfMovies ? 
        <div className='ButtonContainer'>
          <button className='LoadButton' onClick={() => setPage(page + 1)}>Load more</button>
        </div>
        : <div>No more movies to show</div>
     }
    </div>
  )
}

export default SearchResults