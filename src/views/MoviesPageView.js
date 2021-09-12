import { useState, useEffect } from 'react';
import { Link, useRouteMatch } from 'react-router-dom';
import * as moviesApi from '../services/moviesApi';

function MoviesPageView () {
    const { url } = useRouteMatch();
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
        console.log('hi');
        setSearchQuery(query);
        setQuery('');
    };

    const autoScrollDown = () => {
        window.scrollTo({
          top: document.documentElement.scrollHeight,
          behavior: 'smooth',
        });
    };

    const autoScrollUp = () => {
        window.scrollTo({
          top: 0,
          behavior: 'smooth',
        });
    };

    return (
        <>
            <form onSubmit={onSearchMovieFormSubmit}>
                <input type="text" onChange={onInputChange} value={query} name="query"/>
                <button type="submit">Search</button>
            </form>

            {searchQuery && 
                <>
                    <button type="button" onClick={autoScrollDown}>Down</button>
                    <ul>
                        {movies && 
                            movies.map(movie => <li key={movie.id}>
                                <Link to={`${url}/${movie.id}`}>
                                    {movie.title ? movie.title : movie.name}
                                </Link>
                            </li>)
                        }
                    </ul>
                    <button type="button" onClick={autoScrollUp}>Up</button>
                </>
            }
        </>
    )
}

export default MoviesPageView;