import './App.css';
import { Route, Router, Switch } from 'react-router-dom'
import { createBrowserHistory } from 'history';
import MovieFullInfo from './components/MovieFullInfo'
import Home from './components/Home';

const history = createBrowserHistory();

function App() {
  return (
    <div className="App">
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
  );
}

export default App;
