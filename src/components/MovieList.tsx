import React from 'react'
import { Route, Router, Switch } from 'react-router-dom'
import { createBrowserHistory } from 'history';
import MovieFullInfo from './MovieFullInfo'
import Home from './Home';

const history = createBrowserHistory();

const MovieList: React.FC = () => {

  return (
    <div className="Frontpage">
      <Router history={history}>
        <Switch>
          <Route path='/movies/:id'>
            <MovieFullInfo />
          </Route>
          <Route exact path='/'>
            <Home></Home>
          </Route>
        </Switch>
      </Router>
    </div>
  )
}

export default MovieList