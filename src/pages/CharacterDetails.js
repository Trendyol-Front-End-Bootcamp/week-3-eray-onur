import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { fetchAllRequest } from '../constants';
import Page from '../layouts/Page';

const CharacterDetails = (props) => {

    const [character, setCharacter] = useState(null);

    const { id } = useParams();

    useEffect(() => {
        axios.get(fetchAllRequest + '/' + id).then((res) => {
            console.log(res);
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
            <div>
                <h4>This is character details page.</h4>
                { character && <h2>{character.name}</h2>}
            </div>
        </Page>
    );
}

export default CharacterDetails;