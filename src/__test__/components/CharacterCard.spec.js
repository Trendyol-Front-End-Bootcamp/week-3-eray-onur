import React from 'react';
import { render, fireEvent, queryByPlaceholderText } from '@testing-library/react';
import CharacterCard from '../../components/CharacterCard/CharacterCard';
import { BrowserRouter } from 'react-router-dom';

describe('CharacterCard', () => {
    it("renders correctly", () => {
        const component = render(<BrowserRouter>
            <CharacterCard/>
        </BrowserRouter>);

        expect(component.baseElement).toBeValid();
    });

    it("should display character information if available", () => {

        const data = {
            id: 2, 
            name: "Morty Smith", 
            gender: "Male", 
            type: "", 
            origin: {
                "name": "Earth",
                "url": "https://rickandmortyapi.com/api/location/1"
            }, 
            location: {
                "name": "Earth",
                "url": "https://rickandmortyapi.com/api/location/20"
            }, 
            image: 'https://rickandmortyapi.com/api/character/avatar/2.jpeg', 
            status: 'Alive'
        };

        const card = render(<BrowserRouter>
            <CharacterCard 
                id={data.id}
                name={data.name}
                gender={data.gender}
                origin={data.origin}
                location={data.location}
                image={data.image}
                status={data.status}
                />
        </BrowserRouter>);

        // Name testing
        expect(card.getAllByText(/Morty/i)).not.toBeNull();
        // Gender testing
        expect(card.getByText(/Gender/i).textContent).toBe("Gender: Male");
        // Status testing
        expect(card.getByText(/Status/i).textContent).toBe("Status: Alive");
        // Origin testing
        expect(card.getByText(/Origin/i).textContent).toBe("Origin: Earth");
        // Location testing
        expect(card.getByText(/Location/i).textContent).toBe("Location: Earth");
        // Image source testing
        const displayedImage = document.querySelector("img");
        expect(displayedImage.src).toContain(data.image);

    });
});

