import React from 'react'
import { useQuery } from '../hooks/useQuery';

const SearchResults: React.FC = () => {

  const queryParameter = useQuery()

  return (
    <div>{queryParameter.get('query')}</div>
  )
}

export default SearchResults