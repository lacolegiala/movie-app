import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { useQuery } from '../hooks/useQuery';
import { createImageUrl } from '../imageUrl';
import { apiKey, tmdbApiClient } from '../tmdbApiClient';
import { Movie } from '../types';

const SearchResults: React.FC = () => {
  const [results, setResults] = useState<Movie[]>([])

  const queryParameter = useQuery().get('query')

  useEffect(() => {
    const getResults = async () => {
      try {
        const resultInfo = await tmdbApiClient.get(`search/movie?api_key=${apiKey}&language=en-US&query=${queryParameter}&page=1&include_adult=false`)
        setResults(resultInfo.data.results)
      } catch {
        console.log('error')
      }
    }
    getResults()
  }, [queryParameter])

  return (
    <div>
      <h1>Search results for '{queryParameter}'</h1>
      {results.map(result => 
        <div key={result.id}>
          <Link to={`/movies/${result.id}`}>
            <h2>{result.title}</h2>
            <img
              src={createImageUrl(result.poster_path, {width: 300})}
              alt='Poster of movie'
            /> 
          </Link> 
        </div>  
      )}
    </div>
  )
}

export default SearchResults