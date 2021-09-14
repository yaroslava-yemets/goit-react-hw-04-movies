import { useState, useEffect } from 'react';
import { Link, useRouteMatch, useLocation } from 'react-router-dom';
import * as moviesApi from '../services/moviesApi';

function MoviesPageView () {
    const { url } = useRouteMatch();
    const location = useLocation();
    const [query, setQuery] = useState('');
    const [searchQuery, setSearchQuery] = useState('');
    const [movies, setMovies] = useState([]);

    useEffect(() => {
        if(!searchQuery) {
            return
        }; 

        moviesApi.fetchMoviesByQuery(searchQuery)
        .then(movies => setMovies(movies.results))
        .catch(error => error.massage);
    }, [searchQuery]);

    const onInputChange = (e) => {
        setQuery(e.target.value);
    };

    const onSearchMovieFormSubmit = (e) => {
        e.preventDefault();
        setSearchQuery(query);
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
                                state: {...location, search: searchQuery},
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