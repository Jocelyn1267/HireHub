import React from 'react';
import { render, screen, act} from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import axios from 'axios';
import AxiosMockAdapter from 'axios-mock-adapter';
import CardList from '../components/CardList';
import { MemoryRouter } from 'react-router-dom';


const axiosMock = new AxiosMockAdapter(axios);


// Wrapper component to provide router context
const TestWrapper = ({ children }) => (
  <BrowserRouter>
    {children}
  </BrowserRouter>
);


// render(
//   <MemoryRouter>
//     <CardList fetchUrl="dummyurl" />
//   </MemoryRouter>
// );


describe('CardList Component', () => {
    beforeEach(() => {
        axiosMock.reset();
        jest.clearAllMocks();
    });

    afterEach(() => {
        axiosMock.reset();
    });
    afterAll(() => {
        axiosMock.restore();
    });
    test('displays an error message on fetch failure', async () => {
        axiosMock.onGet("http://example.com/courses").networkError();

        render(<CardList fetchUrl="http://example.com/courses" />);
        await screen.findByText('Failed to load courses. Please try again.');
        expect(screen.getByText('Failed to load courses. Please try again.')).toBeInTheDocument();
    });

    test('displays "No courses found." when there are no courses', async () => {
        // Setup axios mock to return an empty array
        axiosMock.onGet('http://localhost:8000/courses').reply(200, []);
    
        // Render the component
        render(<CardList fetchUrl="http://localhost:8000/courses" />);
    
        // Assert that the expected text is displayed
        const noCoursesText = await screen.findByText('No courses found.');
        expect(noCoursesText).toBeInTheDocument();
    });
    

});



