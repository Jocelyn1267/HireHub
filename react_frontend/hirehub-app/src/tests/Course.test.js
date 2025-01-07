import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import Course from '../components/pages/Course';
import { UserContext } from '../userContext';

// Helper function to render the component with context
const renderWithUserContext = (ui, { providerProps, ...renderOptions }) => {
    return render(
        <UserContext.Provider value={providerProps}>{ui}</UserContext.Provider>,
        renderOptions
    );
};

describe('Course Component', () => {
    test('shows add course button for admin users', () => {
        const user = { role: 'admin' };
        const providerProps = { user, isAuthenticated: true };

        renderWithUserContext(<Course />, { providerProps });

        expect(screen.getByText('Add Course')).toBeInTheDocument();
    });
});
