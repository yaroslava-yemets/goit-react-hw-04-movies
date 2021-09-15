import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import * as moviesApi from '../../services/moviesApi';
import defaultImg from './defaultImg.png';
import buttonStyle from '../../styles/Button.module.css';
import s from './Cast.module.css';


const IMG_URL = 'https://image.tmdb.org/t/p/w500/';

function Cast ({id}) {
    const [casts, setCasts] = useState([]);

    useEffect(() => {
        moviesApi.fetchMovieCasts(id)
        .then(data => setCasts(data.cast))
        .catch(error => error.massage);
    }, [id]);

    const autoScrollUp = () => {
        window.scrollTo({
          top: 300,
          behavior: 'smooth',
        });
    };

    const autoScrollDown = () => {
        window.scrollTo({
          top: document.documentElement.scrollHeight,
          behavior: 'smooth',
        });
    };

    return (
        <>
            <button type="button" 
                onClick={autoScrollDown} 
                className={buttonStyle.button}
            >
                Down
            </button>
            <ul className={s.list}>
                {casts && 
                    casts.map(cast => (
                        <li key={cast.cast_id} className={s.listItem}>
                            <img src={cast.profile_path ? `${IMG_URL}${cast.profile_path}` : defaultImg} 
                                alt={cast.name}
                                className={s.image}
                            />
                            <p>{cast.name}</p>
                            <p>Character: {cast.character}</p>
                        </li>
                    ))
                }
            </ul>
            <button type="button" 
                onClick={autoScrollUp} 
                className={buttonStyle.button}
            >
                Up
            </button>
        </>
    )
}

Cast.propTypes = {
    id: PropTypes.string,
};

export default Cast;