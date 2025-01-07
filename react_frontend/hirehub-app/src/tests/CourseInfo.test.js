import { render, screen, fireEvent } from '@testing-library/react';
import { UserContext} from '../userContext';
import CourseInfo from '../components/CourseInfo';
import { waitFor } from '@testing-library/react';


const mockUserContext = (user) => {
    return ({
        Provider: ({ children }) => (
            <UserContext.Provider value={{ user }}>
                {children}
            </UserContext.Provider>
        )
    });
};
describe('CourseInfo', () => {
    const courseData = {
        course_title: "Introduction to React",
        course_description: "Learn React fundamentals.",
        id: 1
    };

    test('shows edit button for instructor', () => {
        const { Provider } = mockUserContext({ role: 'instructor' });
        render(
            <Provider>
                <CourseInfo courseData={courseData} />
            </Provider>
        );

        // Edit button should be visible for instructors
        expect(screen.getByText('Edit')).toBeInTheDocument();
    });

    test('displays alert when handleAlert is called', async() => {
        const { Provider } = mockUserContext({ role: 'instructor' });
        render(
            <Provider>
                <CourseInfo courseData={courseData} />
            </Provider>
        );
    
        // Simulate editing and saving to trigger alert
        fireEvent.click(screen.getByText('Edit'));
        fireEvent.click(screen.getByText('Submit'));
        
        await waitFor(() => {
            expect(screen.getByText(/changed successfully/i)).toBeInTheDocument();
        });

    });
    
});
