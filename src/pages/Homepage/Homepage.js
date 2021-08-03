import React, {useEffect, useState} from 'react';
import Page from '../../layouts/Page';
import { fetchAllRequest } from '../../constants/api';
import { addParamToUrl } from '../../helpers';
import CharacterCard from '../../components/CharacterCard/CharacterCard';
import { fetchAllCharacters } from '../../services/character.service';
import classes from './Homepage.module.css';
import Button from '../../components/Button/Button.js';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';

const Homepage = (props) => {

    // States
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

    // Helper methods
    const fetchAnotherPage = (direction) => {
        if(!pagination) return;
        fetchAllCharacters(direction).then((response) => {
            setCharacters([...response.data.results]);
            setPagination({prev: response.data.info.prev, next: response.data.info.next});
        });
    }

    const navigateToDetails = (e, id) => {
        e.preventDefault();
        props.history.push(`/character_details/${id}`);
    }
  
    // Side effect hooks
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

    // Render
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
            <Header/>
            <div className={classes["search-container"]}>
                <div className={classes["filter-list"]}>
                    <div className={classes["filter-item"]}>
                        <label htmlFor="filterSpecies">Gender: </label>
                        <select 
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
                    <div className={classes["filter-item"]}>
                        <label htmlFor="filterSpecies">Species: </label>
                        <input id="filterSpecies" type="text" onChange={(e) => setFilter({...filter, species: e.target.value})}/>
                    </div>
                </div>
                <div className={classes["character-list"]}>
                {characters.length <= 0 && 'No characters were retrieved.'}
                {
                    characters.map((c) => (
                        <CharacterCard 
                            key={c.id}
                            id={c.id}
                            name={c.name}
                            species={c.species}
                            gender={c.gender}
                            type={c.type}
                            origin={c.origin}
                            location={c.location}
                            image={c.image}
                            status={c.status}
                            onNavigate={(e) => navigateToDetails(e, c.id)}/>
                    ))
                }
                </div>
                <div className={classes["character-pagination"]}>
                    <Button
                        onClick={() => fetchAnotherPage(pagination.prev)}
                        disabled={pagination.prev === null}>Previous</Button>
                    <Button
                        onClick={() => fetchAnotherPage(pagination.next)}
                        disabled={pagination.next === null}>Next</Button>
                </div>
            </div>
            <Footer/>
        </Page>
    );
}

export default Homepage;