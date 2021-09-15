import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import * as moviesApi from '../services/moviesApi';
import buttonStyle from '../styles/Button.module.css';

function HomePageView () {
    const location = useLocation();
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
            <button type="button" onClick={autoScrollDown} className={buttonStyle.button}>
                Down
            </button>
            <h2>Trending today</h2>
            <ul>
                {movies && 
                    movies.map(movie => <li key={movie.id}>
                        <Link to={{
                            pathname: `/movies/${movie.id}`,
                            state: {...location},
                        }}>
                            {movie.title ? movie.title : movie.name}
                        </Link>
                    </li>)
                }
            </ul>
            <button type="button" onClick={onLoadMore} className={buttonStyle.button}>
                Load more
            </button>
            <br/>
            <button type="button" onClick={autoScrollUp} className={buttonStyle.button}>
                Up
            </button>
        </>
    );
}

export default HomePageView;