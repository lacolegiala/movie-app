import './App.css';
import { Link, Redirect, Route, Router, Switch } from 'react-router-dom'
import { createBrowserHistory } from 'history';
import MovieFullInfo from './components/MovieFullInfo'
import Home from './components/Home';
import SearchResults from './components/SearchResults';
import Login from './components/Login';
import React, { useState } from 'react';
import { tmdbApiClient } from './tmdbApiClient';
import MyLists from './components/MyLists';
import AddList from './components/AddList';
import List from './components/List';
import MovieListByGenre from './components/MovieListByGenre';

const history = createBrowserHistory();

const login = async () => {
  try {
    const tokenResponse = await tmdbApiClient.get('authentication/token/new')
    const baseUrl = window.location.origin
    window.open(`https://www.themoviedb.org/authenticate/${tokenResponse.data.request_token}?redirect_to=${baseUrl}/login`)
  } catch (error) {
    console.log(error)
  }
}

function App() {
  const [sessionId, setSessionId] = useState<string | null>(window.localStorage.getItem('movie_app/sessionId'))
  
  const onLogin = (sessionIdProp: string) => {
    setSessionId(sessionIdProp)
  }

  const logout = async () => {
    try {
      await tmdbApiClient.delete('authentication/session', {data: {session_id: sessionId}})
      setSessionId(null)
      window.localStorage.removeItem('movie_app/sessionId')
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className="App">
      <Router history={history}>
        <div className='Container'>
          <Link to='/'>Home</Link>
          {!sessionId &&
            <button onClick={login}>Login / sign up</button>
          }
          {sessionId &&
            <div>
              <button onClick={logout}>Log out</button>
              <Link to='/lists'>My lists</Link>
            </div>
          }
        </div>
        <Switch>
          <Route path='/login'>
            <Login onLogin={onLogin}  />
          </Route>
          <Route path='/movies/:id'>
            <MovieFullInfo sessionId={sessionId} />
          </Route>
          <Route path='/genre/:id'>
            <MovieListByGenre />
          </Route>
          <Route path='/search'>
            <SearchResults />
          </Route>
          <Route exact path='/lists'>
            {sessionId ? <MyLists /> : <Redirect to={{pathname: '/'}} />}
          </Route>
          <Route path='/lists/new'>
            {sessionId ? <AddList /> : <Redirect to={{pathname: '/'}} />}
          </Route>
          <Route path='/lists/:id'>
            {sessionId ? <List /> : <Redirect to={{pathname: '/'}} />}
          </Route>
          <Route exact path='/'>
            <Home />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
