import React, { useEffect } from 'react'
import { tmdbApiClient } from '../tmdbApiClient'

const MyLists: React.FC = () => {

  useEffect(() => {
    const getLists = async () => {
      const accountResponse = await tmdbApiClient.get('account')
    }
    getLists()
  })

  return (
    <div>
      <h1>My lists</h1>
    </div>
  )
}

export default MyLists