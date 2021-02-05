import React, { useState } from 'react'
import { tmdbApiClient } from '../tmdbApiClient'

const Login: React.FC = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const getToken = async () => {
    try {
      const tokenResponse = await tmdbApiClient.get('authentication/token/new')

      const credentials = {
        username: username,
        password: password,
        request_token: tokenResponse.data.request_token
      }
      const loginResponse = await tmdbApiClient.post('authentication/token/validate_with_login', credentials)
      console.log('login response', loginResponse)
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
    console.log('Logged in', username, password)
    event.preventDefault()
    getToken()
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