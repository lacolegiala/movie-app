import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { useQuery } from '../hooks/useQuery';
import { createImageUrl } from '../imageUrl';
import { tmdbApiClient } from '../tmdbApiClient';
import { Movie } from '../types';
import SearchBar from './SearchBar';
import { useHistory } from "react-router-dom";

const SearchResults: React.FC = () => {
  const [results, setResults] = useState<Movie[]>([])
  const queryParameter = useQuery().get('query')
  const [searchBarValue, setSearchBarValue] = useState<string>(queryParameter ?? '')
  const [page, setPage] = useState(1)

  const history = useHistory();

  useEffect(() => {
    const getResults = async () => {
      try {
        if (queryParameter) {
          const resultInfo = await tmdbApiClient.get<{results: Movie[]}>(`search/movie?&language=en-US&query=${queryParameter}&page=${page}&include_adult=false`)
          if (page > 1) {
            setResults(results.concat(resultInfo.data.results))
          }
          else {
            setResults(resultInfo.data.results)
          }
        }
      } catch {
        console.log('error')
      }
    }
    getResults()
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

  const resultsToShow = results.filter(result => result.poster_path !== null)

  return (
    <div className='Container'>
      <SearchBar value={searchBarValue} handleSubmit={handleSubmit} handleChange={handleChange}/>
      <h1>Search results for '{queryParameter}'</h1>
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
              <p>{result.release_date !== '' ? new Date(result.release_date).getFullYear() : 'Unknown'}</p>
            </Link> 
          </div>  
        )}
      </div>
      <button onClick={() => setPage(page + 1)}>Load more</button>
    </div>
  )
}

export default SearchResults