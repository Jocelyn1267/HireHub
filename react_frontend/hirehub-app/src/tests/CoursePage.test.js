import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import axios from 'axios';
import { BrowserRouter, Route } from 'react-router-dom';
import CoursePage from '../components/pages/CoursePage';
import { UserContext } from '../userContext'

jest.mock('axios');

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useParams: () => ({
    id: '123'
  })
}));



const user = {
  id: '1',
  role: 'student'
};
const providerProps = {
  user: user,
  isAuthenticated: true
};


describe('CoursePage', () => {
    beforeEach(() => {
        axios.get.mockResolvedValue({ data: { name: 'Intro to Testing' } });

      });

    it('fetches course data and handles loading state', async () => {
        render(
            <UserContext.Provider value={{ user: { role: 'admin' }, isAuthenticated: true }}>
            <BrowserRouter>
                <CoursePage />
            </BrowserRouter>
            </UserContext.Provider>
        );

        expect(screen.getByText('Loading course...')).toBeInTheDocument();
        await waitFor(() => expect(axios.get).toHaveBeenCalledWith('http://127.0.0.1:5000/courses/123'));
        expect(screen.queryByText('Loading course...')).not.toBeInTheDocument();
    });


  });
  