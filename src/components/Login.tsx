import React from 'react'

const Login: React.FC = () => {
  return (
    <div>
      <h1>Login</h1>
      <form>
        <label>
          Username:
          <input id='username' type='text' name='username' />
        </label>
        <label>
          Password:
          <input id='password' type='password' name='password' />
        </label>
      </form>
    </div>
  )
}

export default Login