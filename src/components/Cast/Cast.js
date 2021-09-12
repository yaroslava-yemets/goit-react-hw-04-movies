import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import * as moviesApi from '../../services/moviesApi';

const IMG_URL = 'https://image.tmdb.org/t/p/w500/';

function Cast ({id}) {
    const [casts, setCasts] = useState([]);

    useEffect(() => {
        moviesApi.fetchMovieCasts(id)
        .then(data => setCasts(data.cast))
        .catch(error => error.massage);
    }, [id]);

    return (
        <>
            <ul>
                {casts && 
                    casts.map(cast => (
                        <li key={cast.cast_id}>
                            <img src={`${IMG_URL}${cast.profile_path}`} alt={cast.name}/>
                            <p>{cast.name}</p>
                            <p>Character: {cast.character}</p>
                        </li>
                    ))
                }
            </ul>
        </>
    )
}

Cast.propTypes = {
    id: PropTypes.string,
};

export default Cast;