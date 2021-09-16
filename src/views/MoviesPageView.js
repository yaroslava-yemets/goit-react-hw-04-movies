import { useState, useEffect } from 'react';
import { Link, useRouteMatch, useLocation, useHistory } from 'react-router-dom';
import * as moviesApi from '../services/moviesApi';
import useSearchQuery from '../hooks/useSearchQuery';

function MoviesPageView () {
    const { url } = useRouteMatch();
    const history = useHistory();
    const location = useLocation();
    const [query, setQuery] = useState('');
    const [searchQuery, setSearchQuery] = useSearchQuery(location.search);
    const [movies, setMovies] = useState([]);

    useEffect(() => {
        if(!searchQuery) {
            return
        }; 
        moviesApi.fetchMoviesByQuery(searchQuery)
        .then(movies => setMovies(movies.results))
        .catch(error => error.massage);
    }, [searchQuery, location]);

    const onInputChange = (e) => {
        setQuery(e.target.value);
    };

    const onSearchMovieFormSubmit = (e) => {
        e.preventDefault();
        setSearchQuery(query);
        history.push({
            pathname: url,
            search: `?${query}`
        });
        setQuery('');
    };

    return (
        <>
            <form onSubmit={onSearchMovieFormSubmit}>
                <input type="text" onChange={onInputChange} value={query} name="query"/>
                <button type="submit">Search</button>
            </form>

            {searchQuery &&
                <ul>
                    {movies && 
                        movies.map(movie => <li key={movie.id}>
                            <Link to={{
                                pathname: `${url}/${movie.id}`,
                                state: {from: location},
                            }}>
                                {movie.title ? movie.title : movie.name}
                            </Link>
                        </li>)
                    }
                </ul>
            }
        </>
    )
}

export default MoviesPageView;