import './App.css';
import { Link, Route, Router, Switch } from 'react-router-dom'
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
  const [sessionId, setSessionId] = useState<string>()
  
  const onLogin = (sessionIdProp: string) => {
    setSessionId(sessionIdProp)
  }

  return (
    <div className="App">
      <Router history={history}>
        <Link to='/'>Home</Link>
        {!sessionId &&
          <button onClick={login}>Login / sign up</button>
        }
        {sessionId &&
          <Link to='/lists'>My lists</Link>
        }
        <Switch>
          <Route path='/login'>
            <Login onLogin={onLogin}  />
          </Route>
          <Route path='/movies/:id'>
            <MovieFullInfo />
          </Route>
          <Route path='/search'>
            <SearchResults />
          </Route>
          <Route exact path='/lists'>
            <MyLists />
          </Route>
          <Route path='/lists/new'>
            <AddList />
          </Route>
          <Route path='/lists/:id'>
            <List />
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
