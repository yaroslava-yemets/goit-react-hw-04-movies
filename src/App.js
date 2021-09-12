import { Route, Switch } from 'react-router-dom';
import Appbar from './components/Appbar'
import HomePageView from './views/HomePageView';
import MoviesPageView from './views/MoviesPageView';
import NoSuchPageView from './views/NoSuchPageView';
import MovieInformationView from './views/MovieInformationView';
import s from './App.module.css';

// import fetchTrendingMovies from './services/moviesApi';
// fetchTrendingMovies();

function App() {
  return (
    <div className={s.AppContainer}>
      <Appbar />

      <Switch>
        <Route path="/" exact>
          <HomePageView />
        </Route>

        <Route path="/movies" exact>
          <MoviesPageView />
        </Route>

        <Route path="/movies/:movieId">
          <MovieInformationView />
        </Route>

        <Route>
          <NoSuchPageView />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
