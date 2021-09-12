import { useState, useEffect } from 'react';
import { useParams, NavLink, useRouteMatch, Route } from 'react-router-dom';
import * as moviesApi from '../services/moviesApi';
import Cast from '../components/Cast';
import Reviews from '../components/Reviews';

const IMG_URL = 'https://image.tmdb.org/t/p/w500/';

function MovieInformationView () {
    const { url } = useRouteMatch();
    const { movieId } = useParams();
    const [movie, setMovie] = useState(null);

    useEffect(() => {
        moviesApi.fetchMovieById(movieId).then(setMovie)
        .catch(error => error.massage);
    }, [movieId]);
    
    const getMovieYear = () => {
        if(movie){
            return new Date(movie.release_date).getFullYear();
        }
    };

    const year = getMovieYear();

        return (
            <>
                <button type="button">&larr;&ensp;Go back</button>
                {movie && 
                    <div>
                        <img alt={movie.title} 
                            src={`${IMG_URL}${movie.poster_path}`}
                        />
                        <h2>
                            <span>{movie.title}&emsp;</span>
                            <span>({year})</span>
                        </h2>
                        <p>User score: {Math.round(movie.popularity)}%</p>
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
                                <NavLink to={`${url}/cast`}>Cast</NavLink>
                            </li>
                            <li>
                                <NavLink to={`${url}/reviews`}>Reviews</NavLink>
                            </li>
                        </ul>
                    </div>
                }
                <Route path={`${url}/cast`}>
                    <Cast id={movieId}/>
                </Route>

                <Route path={`${url}/reviews`}>
                    <Reviews id={movieId}/>
                </Route>
            </>
        );
}

export default MovieInformationView;