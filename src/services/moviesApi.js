const API_KEY='61c393b865acc412b9557aa9835eba5b';
const BASE_URL='https://api.themoviedb.org/3/';


export default function fetchTrendingMovies (page) {
    return fetch(`${BASE_URL}trending/all/day?api_key=${API_KEY}&page=${page}`)
    .then(response => {
        if(response.ok) {
            return response.json()
        }
        return Promise.reject(new Error(`There are no such movies`));
    });
}