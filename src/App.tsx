import './App.css';
import { Link, Route, Router, Switch } from 'react-router-dom'
import { createBrowserHistory } from 'history';
import MovieFullInfo from './components/MovieFullInfo'
import Home from './components/Home';
import SearchResults from './components/SearchResults';
import Login from './components/Login';
import React from 'react';

const history = createBrowserHistory();

function App() {
  return (
    <div className="App">
      <Router history={history}>
        <Link to='/login'>Login</Link>
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
          <Route exact path='/'>
            <Home></Home>
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
