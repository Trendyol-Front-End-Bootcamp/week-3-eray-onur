import React, {useEffect, useState} from 'react';
import Page from '../layouts/Page';
import { fetchAllRequest } from '../constants/constants';
import { addParamToUrl } from './../helpers';
import Character from './../components/Character';
import { fetchAllCharacters } from '../services/character.service';
import './Homepage.css';

const Homepage = (props) => {

    const [characters, setCharacters] = useState([]);

    const [pagination, setPagination] = useState({
        prev: null,
        next: null
    })

    const [filter, setFilter] = useState({
      gender: null,
      species: null,
      page: null,
    });

    const fetchAnotherPage = (direction) => {
        if(!pagination) return;
        fetchAllCharacters(direction).then((response) => {
            setCharacters([...response.data.results]);
            setPagination({prev: response.data.info.prev, next: response.data.info.next});
        });
    }
  
    useEffect(() => {
        let url = fetchAllRequest;

        if(filter.gender) {
            url += `${addParamToUrl(url)}gender=${filter.gender}`;
        }
        if(filter.species) {
            url += `${addParamToUrl(url)}species=${filter.species}`;
        }

        fetchAllCharacters(url).then((response) => {
            console.log(response);
            setCharacters([...response.data.results]);
            setPagination({prev: response.data.info.prev, next: response.data.info.next});
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
            <h1 className="header-title">Rick and Morty Wikipedia</h1>
        </header>
        <div className="search-container">
            <div className="filter-list">
                <div className="filter-item">
                    <label htmlFor="filterSpecies">Gender: </label>
                    <select className="filter-item" 
                        defaultValue={'None'}
                        onChange={(e) => {
                            const newGender = (e.target.value === 'None') ? null : e.target.value;
                            setFilter({...filter, gender: newGender})
                        }}>
                        <option value='None'>None</option>
                        <option value='Male'>Male</option>
                        <option value='Female'>Female</option>
                    </select>
                </div>
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
            <div className="character-pagination">
                <button
                    onClick={() => fetchAnotherPage(pagination.prev)}
                    disabled={pagination.prev === null}>Previous</button>
                <button
                    onClick={() => fetchAnotherPage(pagination.next)}
                    disabled={pagination.next === null}>Next</button>
            </div>
        </div>
        <footer className="footer">
            <h2>Eray Onur, all rights reserved.</h2>
        </footer>
        </Page>
    );
}

export default Homepage;