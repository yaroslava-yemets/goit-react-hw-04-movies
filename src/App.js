import { lazy, Suspense } from 'react';
import { Route, Switch } from 'react-router-dom';
import Appbar from './components/Appbar';
import s from './App.module.css';

const HomePageView = lazy(() => import('./views/HomePageView' 
  /* webpackChunkName: "home-view" */));
const MoviesPageView = lazy(() => import('./views/MoviesPageView' 
  /* webpackChunkName: "movies-page-view" */));
const NoSuchPageView = lazy(() => import('./views/NoSuchPageView' 
  /* webpackChunkName: "no-page-view" */));
const MovieInformationView = lazy(() => import('./views/MovieInformationView/index' 
  /* webpackChunkName: "movie-information-view" */));


function App() {
  return (
    <div className={s.AppContainer}>
      <Appbar />

      <Suspense fallback={<h1>Loading...</h1>}>
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
      </Suspense>
    </div>
  );
}

export default App;
