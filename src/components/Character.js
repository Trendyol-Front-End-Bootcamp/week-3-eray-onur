import React from 'react';
import './Character.css';
import PlaceholderImage from './PlaceholderImage';

const Character = (props) => {
    return (
        <div>
            <div className="character-card">
              <p className="character-card__title"><a href="#" onClick={(e) => props.onNavigate(e)} className="link">{props.info.name}</a></p>
              <div className="character-card__item">
                Gender: {props.info.gender} 
              </div>
              {
                <div className="character-card__item">Type: {(props.info.type) ? props.info.type : 'unknown'} </div>
              }
              <div className="character-card__item">
                Origin: {props.info.origin.name} 
              </div>
              <div className="character-card__item">
                Location: {props.info.location.name} 
              </div>
              <div className="character-card__img">
                {props.info.image ? <img src={props.info.image} alt="character"/> : <PlaceholderImage/>}
                
              </div>
              <div className="character-card__status">
                Status: {props.info.status} 
              </div>
            </div>
        </div>
    );
}

export default Character;