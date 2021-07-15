import React from 'react';
import classes from './Header.module.css';

const Header = () => {
    return (
        <header className={classes["header"]}>
            <h1 className={classes["header-title"]}>Rick and Morty Wikipedia</h1>
        </header>
    );
}

export default Header;