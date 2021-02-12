import React, { useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { useQuery } from '../hooks/useQuery'
import { tmdbApiClient } from '../tmdbApiClient'

type Props = {
  onLogin: (sessionId: string) => void
}

const Login: React.FC<Props> = (props) => {
  const history = useHistory()

  const requestToken = useQuery().get('request_token')

  useEffect(() => {
    const createSession = async () => {
      try {
        const sessionIdResponse = await tmdbApiClient.post('/authentication/session/new', {request_token: requestToken})
        window.localStorage.setItem('movie_app/sessionId', sessionIdResponse.data.session_id)
        props.onLogin(sessionIdResponse.data.session_id)
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
  // I disabled eslint for this line because props in the dependency array caused an error.  
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [history, requestToken])
  
  return (
    <div>
      <h1>Logging in</h1>
    </div>
  )
}

export default Login