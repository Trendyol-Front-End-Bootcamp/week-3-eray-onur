import React from 'react';
import { render, fireEvent, queryByPlaceholderText } from '@testing-library/react';
import Button from '../../components/Button/Button';

describe('Button', () => {
    it("renders correctly", () => {
        const component = render(<Button/>);

        expect(component.baseElement).toBeValid();
    });

    it("renders children correctly", () => {
        const component = render(<Button>Hello</Button>);

        expect(component.baseElement.children.length).toBe(1);
    });
});