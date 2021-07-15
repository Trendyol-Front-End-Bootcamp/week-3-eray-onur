import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { fetchAllRequest } from '../../constants/api';
import Page from '../../layouts/Page';
import classes from './CharacterDetails.module.css';

const sliceEpisodeNumber = (episode) => {
    const episodeRouteString = episode.substring(
        episode.indexOf('episode/'), 
        episode.length
    );
    const episodeString = episodeRouteString.substring(
        episodeRouteString.indexOf('/') + 1,
        episodeRouteString.length
    );
    console.log(episodeString);
    return episodeString;
}

const CharacterDetails = () => {

    const [character, setCharacter] = useState({
        name: 'unknown',
        type: 'unknown',
        origin: 'unknown',
        gender: 'unknown',
        species: 'unknown',
        created: 'unknown',
        location: 'unknown',
        image: '',
        episode: [],
    });

    const { id } = useParams();

    useEffect(() => {
        axios.get(fetchAllRequest + '/' + id).then((res) => {
            setCharacter(res.data);
        });


        return () => {};
    }, [id]);

    return (
        <Page
            pageVariants={{
                in: {
                    opacity: 1,
                    x: 0
                },
                out: {
                    opacity: 0,
                    x: '100vw'
                }
            }}
            pageTransition={{
                duration: 0.35,
                type: "tween",
                ease: "easeOut"
            }}

        >
            <div className={classes["character-details-container"]}>
                <div className={classes["character-details-card"]}>
                    <h1>{character.name}</h1>
                    <div className={classes["character-details-field"]}>
                        <h4>Type</h4>
                        <p>{character.type}</p>                       
                    </div>
                    <div className={classes["character-details-field"]}>
                        <h4>Species</h4>
                        <p>{character.species}</p>
                    </div>
                    <div className={classes["character-details-field"]}>
                        <h4>Gender</h4>
                        <p>{character.gender}</p>
                    </div>
                    <img src={character.image} alt='character'/>
                    <div className={classes["character-details-field"]}>
                        <h4>Origin</h4>
                        <p>{character.origin.name}</p>
                    </div>
                    <div className={classes["character-details-field"]}>
                        <h4>Last Known Location</h4>
                        <p>{character.location.name}</p>
                    </div>
                    <div className={classes["character-details-field"]}>
                        <h4>Created Timestamp</h4>
                        <p>{character.created}</p>
                    </div>
                    <div className={classes["character-details-field"]}>
                        <h4>Status</h4>
                        <p className={(character.status === 'Alive') ? classes['status-alive'] : classes['status-dead']}>{character.status}</p>
                    </div>
                    <div className={classes["episode-grid"]}>
                        <h3 className={classes["episode-grid-title"]}>Episodes</h3>
                        <div className={classes["episode-grid-content"]}>
                        {
                            character.episode.map((e) => {
                                return <button className={classes["episode"]}>{sliceEpisodeNumber(e)}</button>;
                            })
                        }
                        </div>
                    </div>
                </div>     
            </div>
        </Page>
    );
}

export default CharacterDetails;