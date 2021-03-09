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

  const history = useHistory();


  useEffect(() => {
    const getResults = async () => {
      try {
        if (queryParameter) {
          const resultInfo = await tmdbApiClient.get(`search/movie?&language=en-US&query=${queryParameter}&page=1&include_adult=false`)
          setResults(resultInfo.data.results)
        }
      } catch {
        console.log('error')
      }
    }
    getResults()
  }, [queryParameter])
  
  function handleSubmit(event: React.ChangeEvent<HTMLFormElement>) {
    history.push(`/search?query=${searchBarValue}`)
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
              <div className='PosterTextBox'>
                <h2 className='SmallMargin'>{result.title}</h2>
                <p className='SmallMargin'>{new Date (result.release_date).getFullYear()}</p>
              </div>
            </Link> 
          </div>  
        )}
      </div>
    </div>
  )
}

export default SearchResults