import React from 'react';
import classes from './CharacterCard.module.css';
import PlaceholderImage from '../PlaceholderImage/PlaceholderImage';
import { Link } from 'react-router-dom';

// Card containing primary information of a character.
const CharacterCard = ({id, name, gender, type, origin, location, image, status, onNavigate}) => {
    return (
        <div>
            <div className={classes["character-card"]}>
              <h2 className={classes["character-card__title"]}>
                <Link
                  className={classes.link}
                  to={`/character_details/${id}`}>{name}</Link>
              </h2>
              <div className={classes["character-card__item"]}>
                Gender: {gender} 
              </div>
              {
                <div className={classes["character-card__item"]}>Type: {(type) ? type : 'unknown'} </div>
              }
              <div className={classes["character-card__item"]}>
                Origin: {origin && origin.name} 
              </div>
              <div className={classes["character-card__item"]}>
                Location: {location && location.name} 
              </div>
              <div className={classes["character-card__img"]}>
                {image ? <img src={image} alt="character"/> : <PlaceholderImage/>}
                
              </div>
              <div className={classes["character-card__status"]}>
                <p className={`${classes["status-icon"]} ${status === 'Alive' ? classes['alive'] : classes['dead']}`}></p>
                <p className={classes["status-text"]}>Status: {status}</p>
              </div>
            </div>
        </div>
    );
}

export default CharacterCard;