import './App.css';
import { Route, Router, Switch } from 'react-router-dom'
import { createBrowserHistory } from 'history';
import MovieFullInfo from './components/MovieFullInfo'
import Home from './components/Home';
import SearchResults from './components/SearchResults';
import Login from './components/Login';
import React from 'react';
import { tmdbApiClient } from './tmdbApiClient';
import MyLists from './components/MyLists';

const history = createBrowserHistory();

const login = async () => {
  try {
    const tokenResponse = await tmdbApiClient.get('authentication/token/new')
    const baseUrl = window.location.origin
    window.open(`https://www.themoviedb.org/authenticate/${tokenResponse.data.request_token}?redirect_to=${baseUrl}/login`)
  } catch {
    console.log('error')
  }
}

function App() {
  return (
    <div className="App">
      <Router history={history}>
        <button onClick={login}>Login</button>
        <Switch>
          <Route path='/login'>
            <Login />
          </Route>
          <Route path='/movies/:id'>
            <MovieFullInfo />
          </Route>
          <Route path='/search'>
            <SearchResults />
          </Route>
          <Route path='/user/:id/lists'>
            <MyLists />
          </Route>
          <Route exact path='/'>
            <Home></Home>
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
