import { Route, Switch } from 'react-router-dom';
import Appbar from './components/Appbar'
import HomePageView from './views/HomePageView';
import s from './App.module.css';

// import fetchTrendingMovies from './services/moviesApi';
// fetchTrendingMovies();

function App() {
  return (
    <div className={s.AppContainer}>
      <Appbar />

      <Route path='/' exact>
        <HomePageView />
      </Route>
    </div>
  );
}

export default App;
