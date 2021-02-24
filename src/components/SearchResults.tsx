import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { useQuery } from '../hooks/useQuery';
import { createPosterUrl } from '../imageUrl';
import { tmdbApiClient } from '../tmdbApiClient';
import { Movie } from '../types';

const SearchResults: React.FC = () => {
  const [results, setResults] = useState<Movie[]>([])

  const queryParameter = useQuery().get('query')

  useEffect(() => {
    const getResults = async () => {
      try {
        const resultInfo = await tmdbApiClient.get(`search/movie?&language=en-US&query=${queryParameter}&page=1&include_adult=false`)
        setResults(resultInfo.data.results)
      } catch {
        console.log('error')
      }
    }
    getResults()
  }, [queryParameter])

  return (
    <div className='Container'>
      <h1>Search results for '{queryParameter}'</h1>
      <div className='GridWrapper'>
        {results.map(result => 
          <div key={result.id}>
            <Link to={`/movies/${result.id}`}>
              <img
                className='Poster'
                src={createPosterUrl(result.poster_path, {width: 300})}
                alt='Poster of movie'
                /> 
              <h2>{result.title}</h2>
            </Link> 
          </div>  
        )}
      </div>
    </div>
  )
}

export default SearchResults