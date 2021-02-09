import React, { useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { useQuery } from '../hooks/useQuery'
import { tmdbApiClient } from '../tmdbApiClient'

const Login: React.FC = () => {
  const history = useHistory()

  const requestToken = useQuery().get('request_token')

  useEffect(() => {
    const createSession = async () => {
      try {
        const sessionIdResponse = await tmdbApiClient.post('/authentication/session/new', {request_token: requestToken})
        console.log(sessionIdResponse.data)
        history.push('/')
      } catch (error) {
        console.log(error)
        history.push('/')
      }
    }
    if (requestToken) {
      createSession()
    }
    else {
      history.push('/')
    }
  }, [history, requestToken])
  
  return (
    <div>
      <h1>Logging in</h1>
    </div>
  )
}

export default Login