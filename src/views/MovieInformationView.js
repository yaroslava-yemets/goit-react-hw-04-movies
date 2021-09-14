import { useState, useEffect, lazy, Suspense } from 'react';
import { useParams, NavLink, useRouteMatch, Route, useHistory, useLocation } from 'react-router-dom';
import * as moviesApi from '../services/moviesApi';
import defaultPoster from './default_poster.jpg';

const IMG_URL = 'https://image.tmdb.org/t/p/w500/';

const Cast = lazy(() => import('../components/Cast' 
  /* webpackChunkName: "cast-subview" */));
const Reviews = lazy(() => import('../components/Reviews' 
  /* webpackChunkName: "reviews-subview" */));

function MovieInformationView () {
    const { url } = useRouteMatch();
    const history = useHistory();
    const location = useLocation();
    const { movieId } = useParams();
    const [movie, setMovie] = useState(null);

    console.log(location.state.from);

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
                <button type="button" onClick={onGoBack}>
                    &larr;&ensp;Go back
                </button>
                {movie && 
                    <div>
                        <img alt={movie.title} 
                            src={`${IMG_URL}${movie.poster_path}`}
                        />
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
                        <hr/>
                        <p>Additional information</p>
                        <ul>
                            <li>
                                <NavLink to={{
                                    pathname: `${url}/cast`,
                                    state: {from: location.state.from}
                                }}>Cast</NavLink>
                            </li>
                            <li>
                                <NavLink to={`${url}/reviews`}>Reviews</NavLink>
                            </li>
                        </ul>
                    </div>
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