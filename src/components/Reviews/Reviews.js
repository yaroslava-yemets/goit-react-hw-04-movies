import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import * as moviesApi from '../../services/moviesApi';

function Reviews ({id}) {
    const [reviews, setReviews] = useState([]);

    useEffect(() => {
        moviesApi.fetchMovieReviews(id)
        .then(data => setReviews(data.results))
        .catch(error => error.massage);
    }, [id]);

    return (
       <div>
           <ul>
            {reviews &&
               reviews.map(review => (
                <li key={review.id}>
                    <h2>Author: {review.author}</h2>
                    <p>{review.content}</p>
                </li>
                ))     
            }
            </ul>
       </div>
    )
}

Reviews.propTypes = {
    id: PropTypes.string,
};

export default Reviews;