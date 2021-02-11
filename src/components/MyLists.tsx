import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { tmdbApiClient } from '../tmdbApiClient'
import { List } from '../types'

const MyLists: React.FC = () => {
  const [lists, setLists] = useState<List[]>([])

  useEffect(() => {
    const getLists = async () => {
      try {
        const accountResponse = await tmdbApiClient.get('account')
        const listResponse = await tmdbApiClient.get(`account/${accountResponse.data.id}/lists`)
        setLists(listResponse.data.results)
      } catch (error) {
        console.log(error)
      }
    }
    getLists()
  }, [])

  return (
    <div>
      <h1>My lists</h1>
      <Link to='/lists/new'>Add a new list</Link>
      <hr />
      {lists.map(list =>
        <li key={list.id}>
          <Link to={`/lists/${list.id}`}>{list.name}</Link>  
        </li> 
      )}
    </div>
  )
}

export default MyLists