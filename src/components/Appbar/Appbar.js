import Navigation from "../Navigation";
import s from './Appbar.module.css';

const Appbar = () => (
    <header className={s.header}>
        <Navigation />
    </header>
);

export default Appbar;