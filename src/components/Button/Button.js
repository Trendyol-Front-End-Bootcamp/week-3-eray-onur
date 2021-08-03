import React from 'react';
import classes from './Button.module.css';

// Universal button component.
const Button = (props) => {
    return <button
        className={classes.button} 
        disabled={props.disabled} 
        onClick={props.onClick}>
        {props.children}
    </button>;
};

export default Button;