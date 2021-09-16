import { useState, useEffect, lazy, Suspense } from 'react';
import { useParams, NavLink, useRouteMatch, Route, useHistory, useLocation } from 'react-router-dom';
import * as moviesApi from '../../services/moviesApi';
import s from './MovieInformationView.module.css';
import buttonStyle from '../../styles/Button.module.css'
import defaultPoster from './default_poster.jpg';

const IMG_URL = 'https://image.tmdb.org/t/p/w500/';

const Cast = lazy(() => import('../../components/Cast' 
  /* webpackChunkName: "cast-subview" */));
const Reviews = lazy(() => import('../../components/Reviews' 
  /* webpackChunkName: "reviews-subview" */));

function MovieInformationView () {
    const { url } = useRouteMatch();
    const history = useHistory();
    const location = useLocation();
    const { movieId } = useParams();
    const [movie, setMovie] = useState(null);
    const [pathToMovie, setPathToMovie] = useState(null);

    useEffect(() => {
        setPathToMovie(location.state);
    }, [location])

    useEffect(() => {
        moviesApi.fetchMovieById(movieId).then(setMovie)
        .catch(error => error.massage);
    }, [movieId]);
    
    const getMovieYear = () => {
        if(movie){
            return new Date(movie.release_date).getFullYear();
        }
    };

    const onGoBack = () => {
        history.push(location?.state?.from ?? '/');
    };

    const year = getMovieYear();

        return (
            <>
                <button type="button" onClick={onGoBack} className={buttonStyle.button}>
                    &larr;&ensp;Go back
                </button>
                {movie && 
                <>
                    <div className={s.movieContainer}>
                        <img alt={movie.title} className={s.image}
                            src={movie.poster_path ? `${IMG_URL}${movie.poster_path}` : defaultPoster}
                        />
                        <div className={s.movieInformation}>
                            <h2>
                                <span>{movie.title}&emsp;</span>
                                <span>({year})</span>
                            </h2>
                            <p>User score: {Math.round(movie.vote_average)}%</p>
                            <h3>OverView</h3>
                            <p>{movie.overview}</p>
                            <h3>Genres</h3>
                            <ul>
                                {movie.genres.map(genre => 
                                    <li key={genre.id}>{genre.name}</li>
                                )}
                            </ul>
                        </div>
                    </div>
                    <div>
                        <hr/>
                        <p>Additional information</p>
                        <ul>
                            <li>
                                <NavLink to={{
                                    pathname: `${url}/cast`,
                                    state: pathToMovie
                                }}>Cast</NavLink>
                            </li>
                            <li>
                                <NavLink to={{
                                    pathname: `${url}/reviews`,
                                    state: pathToMovie
                                }}>Reviews</NavLink>
                            </li>
                        </ul>
                    </div>
                </>
                }

                <Suspense fallback={<h1>Loading...</h1>}>
                    <Route path={`${url}/cast`}>
                        <Cast id={movieId}/>
                    </Route>

                    <Route path={`${url}/reviews`}>
                        <Reviews id={movieId}/>
                    </Route>
                </Suspense>
            </>
        );
}

export default MovieInformationView;