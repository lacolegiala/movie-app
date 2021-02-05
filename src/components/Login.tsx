import React, { useState } from 'react'

const Login: React.FC = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  function handleUsernameChange(event: React.ChangeEvent<HTMLInputElement>) {
    setUsername(event.target.value)
  }

  function handlePasswordChange(event: React.ChangeEvent<HTMLInputElement>) {
    setPassword(event.target.value)
  }

  function onSubmit(event: React.ChangeEvent<HTMLFormElement>) {
    console.log('Logged in', username, password)
    event.preventDefault()
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