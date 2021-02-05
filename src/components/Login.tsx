import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import { tmdbApiClient } from '../tmdbApiClient'


const Login: React.FC = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const history = useHistory()

  const login = async () => {
    try {
      const tokenResponse = await tmdbApiClient.get('authentication/token/new')

      const credentials = {
        username: username,
        password: password,
        request_token: tokenResponse.data.request_token
      }
      const loginResponse = await tmdbApiClient.post('authentication/token/validate_with_login', credentials)
      const sessionIdResponse  = await tmdbApiClient.post('authentication/session/new', {request_token: loginResponse.data.request_token})
      console.log('session id', sessionIdResponse)
      history.push('/')
      
    } catch {
      console.log('error')
    }
  }
  
  function handleUsernameChange(event: React.ChangeEvent<HTMLInputElement>) {
    setUsername(event.target.value)
  }
  
  function handlePasswordChange(event: React.ChangeEvent<HTMLInputElement>) {
    setPassword(event.target.value)
  }
  
  function onSubmit(event: React.ChangeEvent<HTMLFormElement>) {
    event.preventDefault()
    login()
  }

  return (
    <div>
      <h1>Login</h1>
      <form onSubmit={onSubmit}>
        <label>
          Username:
          <input type='text' value={username} onChange={handleUsernameChange} />
        </label>
        <label>
          Password:
          <input type='password' value={password} onChange={handlePasswordChange} />
        </label>
        <button type='submit'>Login</button>
      </form>
    </div>
  )
}

export default Login