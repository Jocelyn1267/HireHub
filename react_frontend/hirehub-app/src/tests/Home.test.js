import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import axios from 'axios';
import AxiosMockAdapter from 'axios-mock-adapter';
import { UserContext } from '../userContext';
import Home from '../components/pages/Home';

const axiosMock = new AxiosMockAdapter(axios);

// Mock the CardList component
jest.mock('../components/CardList', () => {
  return function MockCardList({ fetchUrl }) {
    return <div data-testid="card-list">MockCardList: {fetchUrl}</div>;
  };
});

const MockUserProvider = ({ children, user, isAuthenticated }) => (
  <UserContext.Provider value={{ user, isAuthenticated }}>
    {children}
  </UserContext.Provider>
);

describe('Home', () => {
  beforeEach(() => {
    jest.resetAllMocks();
    axiosMock.reset();
  });

  afterAll(() => {
    axiosMock.restore();
  });

  test('should set the correct courses URL based on student', async () => {
    const user = { id: 1, role: 'student' };
    const expectedUrl = `http://127.0.0.1:5000/student_courses?user_id=${user.id}`;
    
    // Set up the mock response
    axiosMock.onGet(expectedUrl).reply(200, {
      data: []
    });

    render(
      <MockUserProvider user={user} isAuthenticated={true}>
        <Home />
      </MockUserProvider>
    );

    // Wait for the CardList to appear with the correct URL
    await waitFor(() => {
      const cardList = screen.getByTestId('card-list');
      expect(cardList).toHaveTextContent(expectedUrl);
    });
  });

  test('should handle unauthenticated state', () => {
    render(
      <MockUserProvider user={null} isAuthenticated={false}>
        <Home />
      </MockUserProvider>
    );

    const loginMessage = screen.getByRole('heading', {
      level: 6,
      name: /user not logged in/i
    });
    expect(loginMessage).toBeInTheDocument();
  });
});


