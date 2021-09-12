import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import * as moviesApi from '../services/moviesApi';

function HomePageView () {
    const [movies, setMovies] = useState([]);
    const [page, setPage] = useState(1);

    useEffect(() => {
        moviesApi.fetchTrendingMovies(page)
        .then(moviesData => {
            setMovies(movies => [...movies, ...moviesData.results]);
            autoScrollDown();
        })
        .catch(error => error.massage);
    }, [page]);

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

    const onLoadMore = () => {
        setPage(page => page + 1);
    };

    return (
        <>
            <button type="button" onClick={autoScrollDown}>Down</button>
            <h2>Trending today</h2>
            <ul>
                {movies && 
                    movies.map(movie => <li key={movie.id}>
                        <Link to={`/movies/${movie.id}`}>
                            {movie.title ? movie.title : movie.name}
                        </Link>
                    </li>)
                }
            </ul>
            <button type="button" onClick={onLoadMore}>Load more</button>
            <br/>
            <button type="button" onClick={autoScrollUp}>Up</button>
        </>
    );
}

export default HomePageView;