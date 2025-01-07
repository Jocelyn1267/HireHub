import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { UserContext } from '../userContext';
import CourseContent from '../components/CourseContent';

jest.mock('../components/FeedbackForm', () => {
    return function MockFeedbackForm() {
      return <div data-testid="feedback-form">Feedback Form</div>;
    };
  });
  
describe('CourseContent displays correct content based on selectedIndex', () => {
    const customRender = (ui, { providerProps, ...renderOptions }) => {
        return render(
          <BrowserRouter>
            <UserContext.Provider value={providerProps}>
              {ui}
            </UserContext.Provider>
          </BrowserRouter>,
          renderOptions
        );
      };
      

    it('displays Video List for admin when selectedIndex is 1', () => {
      const providerProps = { user: { role: 'admin' } };
      customRender(<CourseContent selectedIndex={1} />, { providerProps });
  
      expect(screen.getByText('Video List')).toBeInTheDocument();
    });
  
    it('displays Assessment List for selectedIndex of 2', () => {
      const providerProps = { user: { role: 'admin' } };
      customRender(<CourseContent selectedIndex={2} />, { providerProps });
  
      expect(screen.getByText('Assessment List')).toBeInTheDocument();
    });
  
    it('displays Comments for selectedIndex of 0', () => {
      const providerProps = { user: { role: 'student' } }; // Assume students see comments by default
      customRender(<CourseContent selectedIndex={0} />, { providerProps });
  
      expect(screen.getByText('Comments')).toBeInTheDocument();
    });

    it('renders FeedbackForm when selectedIndex is 4', () => {
        const providerProps = { user: { role: 'admin' } }; // Provide user context
        customRender(<CourseContent selectedIndex={4} />, { providerProps });
    
        const feedbackForm = screen.getByTestId('feedback-form');
        expect(feedbackForm).toBeInTheDocument();
        expect(feedbackForm).toHaveTextContent('Feedback Form');
      });

      it('renders discussion content when selectedIndex is 3', () => {
        const providerProps = { user: { role: 'admin' } }; // Provide user context
        const discussionList = [
          { id: 1, title: "Understanding Core Concepts" },
          { id: 2, title: "Best Practices in Coding" },
          // additional discussions can be added here
        ];
    
        customRender(<CourseContent selectedIndex={3} />, { providerProps });
    
        expect(screen.getByText('Discussion')).toBeInTheDocument();
      });

      
  });
  
  