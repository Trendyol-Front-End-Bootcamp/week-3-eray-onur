import React from 'react';
import './Character.css';

const Character = (props) => {
    return (
        <div>
            <div className="character-card">
              <p className="character-card__title"><a href="#" onClick={(e) => props.onNavigate(e)} className="link">{props.info.name}</a></p>
              <div className="character-card__item">
                Gender: {props.info.gender} 
              </div>
              {
                (props.info.type) && <div className="character-card__item">Type: {props.info.type} </div>
              }
              <div className="character-card__item">
                Origin: {props.info.origin.name} 
              </div>
              <div className="character-card__item">
                Location: {props.info.location.name} 
              </div>
              <img className="character-card__img" src={props.info.image}/>
              <div className="character-card__status">
                Status: {props.info.status} 
              </div>
            </div>
        </div>
    );
}

export default Character;