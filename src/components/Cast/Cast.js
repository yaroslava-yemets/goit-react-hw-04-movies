import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import * as moviesApi from '../../services/moviesApi';
import defaultImg from './defaultImg.png';

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
          top: 1000,
          behavior: 'smooth',
        });
    };

    return (
        <>
            <ul>
                {casts && 
                    casts.map(cast => (
                        <li key={cast.cast_id}>
                            <img src={cast.profile_path ? `${IMG_URL}${cast.profile_path}` : defaultImg} alt={cast.name}/>
                            <p>{cast.name}</p>
                            <p>Character: {cast.character}</p>
                        </li>
                    ))
                }
            </ul>
            <button type="button" onClick={autoScrollUp}>Up</button>
        </>
    )
}

Cast.propTypes = {
    id: PropTypes.string,
};

export default Cast;