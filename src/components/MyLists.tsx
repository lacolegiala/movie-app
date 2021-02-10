import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { tmdbApiClient } from '../tmdbApiClient'
import { List } from '../types'

const MyLists: React.FC = () => {
  const [lists, setLists] = useState<List[]>([])

  useEffect(() => {
    const getLists = async () => {
      const accountResponse = await tmdbApiClient.get('account')
      const listResponse = await tmdbApiClient.get(`account/${accountResponse.data.id}/lists`)
      setLists(listResponse.data.results)
    }
    getLists()
  }, [])

  return (
    <div>
      <Link to='/'>Home</Link>
      <h1>My lists</h1>
      {lists.map(list => 
        <li key={list.id}>{list.name}</li>  
      )}
    </div>
  )
}

export default MyLists