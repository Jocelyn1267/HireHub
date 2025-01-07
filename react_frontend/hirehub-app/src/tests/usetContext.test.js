import { render, act } from '@testing-library/react';
import '@testing-library/jest-dom';
import { UserContext, UserProvider } from '../userContext'

const localStorageMock = (function() {
    let store = {};
    return {
        getItem: function(key) {
            return store[key] || null;
        },
        setItem: function(key, value) {
            store[key] = value.toString();
        },
        removeItem: function(key) {
            delete store[key];
        },
        clear: function() {
            store = {};
        }
    };
})();

// Setting up global localStorage mock
global.localStorage = localStorageMock;


describe('UserContext', () => {

    beforeEach(() => {
        // Clear the mock localStorage before each test
        global.localStorage.setItem('user', JSON.stringify({ name: 'John Doe', email: 'john@example.com' }));
        global.localStorage.setItem('isAuthenticated', 'true');
    });
    
    test('initializes user and isAuthenticated from localStorage on component mount', () => {
        let testUserContext;

        // Render a test component that will consume the context
        const TestComponent = () => (
            <UserContext.Consumer>
                {value => {
                    testUserContext = value;
                    return null;
                }}
            </UserContext.Consumer>
        );

        render(
            <UserProvider>
                <TestComponent />
            </UserProvider>
        );

        // Check if user and isAuthenticated state are set correctly
        expect(testUserContext.user).toEqual({ name: 'John Doe', email: 'john@example.com' });
        expect(testUserContext.isAuthenticated).toBe(true);
    });

    test('should set user and isAuthenticated when login is called', () => {
        
        let testUserContext;
        const userData = { user: { name: 'John Doe', email: 'john@example.com' } };

        // Render a test component that will consume the context
        const TestComponent = () => {
            return (
                <UserContext.Consumer>
                    {value => {
                        testUserContext = value;
                        return null;
                    }}
                </UserContext.Consumer>
            );
        };

        render(
            <UserProvider>
                <TestComponent />
            </UserProvider>
        );

        // Perform the login operation
        act(() => {
            testUserContext.login(userData);
        });

        // Check if user and isAuthenticated are set correctly
        expect(testUserContext.user).toEqual(userData.user);
        expect(testUserContext.isAuthenticated).toBe(true);

        expect(localStorage.getItem('user')).toEqual(JSON.stringify(userData.user));
        expect(localStorage.getItem('isAuthenticated')).toBe('true');
    });

    test('should remove user and isAuthenticated when logout is called', () => {
        let testUserContext;
        const userData = { user: { name: 'John Doe', email: 'john@example.com' } };
    
        // Render a test component that will consume the context
        const TestComponent = () => (
            <UserContext.Consumer>
                {value => {
                    testUserContext = value;
                    return null;
                }}
            </UserContext.Consumer>
        );
    
        render(
            <UserProvider>
                <TestComponent />
            </UserProvider>
        );
    
        // First, simulate login to set the user and isAuthenticated
        act(() => {
            testUserContext.login(userData);
        });
    
        // Then perform the logout operation
        act(() => {
            testUserContext.logout();
        });
    
        // Check if user and isAuthenticated are reset correctly
        expect(testUserContext.user).toBeNull();
        expect(testUserContext.isAuthenticated).toBe(false);
    
        // Check localStorage to verify the user data is removed correctly
        expect(localStorage.getItem('user')).toBeNull();
        expect(localStorage.getItem('isAuthenticated')).toBeNull();

    });
});