import React, {useEffect, useState} from 'react';
import Page from '../layouts/Page';
import axios from 'axios';
import { fetchAllRequest } from './../constants';
import { addParamToUrl } from './../helpers';
import Character from './../components/Character';
import { useHistory } from 'react-router-dom';

const progressToCharacter = () => {

}

const Homepage = (props) => {

    const [characters, setCharacters] = useState([]);

    const [filter, setFilter] = useState({
      gender: null,
      species: null,
    });
  
    useEffect(() => {
        let baseRequest = fetchAllRequest;

        if(filter.gender) {
            baseRequest += `${addParamToUrl(baseRequest)}gender=${filter.gender}`;
        }
        if(filter.species) {
            baseRequest += `${addParamToUrl(baseRequest)}species=${filter.species}`;
        }
        console.log(`Sent request URL: ${baseRequest}`);
        
        axios.get(baseRequest).then((response) => {
            setCharacters([...response.data.results]);
        });
  
    }, [filter]);

    const navigateToDetails = (e, id) => {
        e.preventDefault();
        props.history.push(`/character_details/${id}`);
    }

    return (
        <Page
            pageVariants={{
                in: {
                    opacity: 1,
                    x: 0
                },
                out: {
                    opacity: 0,
                    x: '-100vw'
                }
            }}
            pageTransition={{
                duration: 0.35,
                transition: 'linear'
            }}
        >
        <header className="header">
            <h1 className="header-title">Rick and Morty App</h1>
        </header>
        <div className="search-container">
            <div className="filter-list">
                <select className="filter-item" 
                    defaultValue={'None'}
                    onChange={(e) => setFilter({...filter, gender: e.target.value})}>
                    <option value='None'>None</option>
                    <option value='Male'>Male</option>
                    <option value='Female'>Female</option>
                </select>
                <div className="filter-item">
                    <label htmlFor="filterSpecies">Species: </label>
                    <input id="filterSpecies" type="text" onChange={(e) => setFilter({...filter, species: e.target.value})}/>
                </div>
            </div>
            <div className="character-list">
            {characters.length <= 0 && 'No characters were retrieved.'}
            {
                characters.map((c) => (
                    <Character key={c.id} info={c} onNavigate={(e) => navigateToDetails(e, c.id)}/>
                ))
            }
            </div>
        </div>
        <footer className="footer">
            <p>Eray Onur, all rights reserved.</p>
        </footer>
        </Page>
    );
}

export default Homepage;