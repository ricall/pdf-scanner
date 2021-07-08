import React from 'react';
import { render, screen } from '@testing-library/react';
import { App } from '../App';

describe('App component', () => {

    it('can be rendered', () => {
        render(<App/>);
        const title = screen.getByText(/untitled - pdf-scanner/i);

        expect(title).toBeInTheDocument();
    });

});
