import { NavLink } from 'react-router-dom';
import s from './Navigation.module.css';

const Navigation = () => (
    <>
        <NavLink 
            to='/'
            exact
            className={s.navLink}
            activeClassName={s.navActiveLink}
        >
            Home
        </NavLink>
        <NavLink 
            to='/movies'
            exact
            className={s.navLink}
            activeClassName={s.navActiveLink}
        >
            Movies
        </NavLink>
    </>
);

export default Navigation;