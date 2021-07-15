import React from 'react';
import classes from './CharacterCard.module.css';
import PlaceholderImage from '../PlaceholderImage/PlaceholderImage';

// Card containing primary information of a character.
const CharacterCard = ({name, gender, type, origin, location, image, status, onNavigate}) => {
    return (
        <div>
            <div className={classes["character-card"]}>
              <h2 className={classes["character-card__title"]}>
                <a 
                  className={classes.link}
                  href="#" 
                  onClick={(e) => onNavigate(e)}>{name}</a>
              </h2>
              <div className={classes["character-card__item"]}>
                Gender: {gender} 
              </div>
              {
                <div className={classes["character-card__item"]}>Type: {(type) ? type : 'unknown'} </div>
              }
              <div className={classes["character-card__item"]}>
                Origin: {origin.name} 
              </div>
              <div className={classes["character-card__item"]}>
                Location: {location.name} 
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