import { render, fireEvent, screen } from '@testing-library/react';
import CourseMenu from '../components/CourseMenu';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHouse, faVideo, faFileLines, faComments, faComment } from '@fortawesome/free-solid-svg-icons';

jest.mock('@fortawesome/react-fontawesome', () => ({
    FontAwesomeIcon: () => 'Icon'
}));

describe('CourseMenu', () => {
    it('calls handleEnrollment when enroll button is clicked', () => {
        const handleEnrollment = jest.fn();
        render(<CourseMenu selectedIndex={0} handleListItemClick={jest.fn()} isEnrolled={false} handleEnrollment={handleEnrollment} />);
    
        const enrollButton = screen.getByText('Enroll Now!');
        fireEvent.click(enrollButton);
        expect(handleEnrollment).toHaveBeenCalledTimes(1);
    });

    it('allows navigation to sections when enrolled', () => {
        const handleListItemClick = jest.fn();
        render(<CourseMenu selectedIndex={0} handleListItemClick={handleListItemClick} isEnrolled={true} handleEnrollment={jest.fn()} />);
    
        // Expect all buttons to be enabled
        fireEvent.click(screen.getByText('Video'));
        fireEvent.click(screen.getByText('Assessment'));
        fireEvent.click(screen.getByText('Discussion'));
        fireEvent.click(screen.getByText('Feedback'));
    
        // Check if the appropriate handlers were called
        expect(handleListItemClick).toHaveBeenCalledTimes(4);
        expect(handleListItemClick).toHaveBeenCalledWith(1); // Video
        expect(handleListItemClick).toHaveBeenCalledWith(2); // Assessment
        expect(handleListItemClick).toHaveBeenCalledWith(3); // Discussion
        expect(handleListItemClick).toHaveBeenCalledWith(4); // Feedback
    });
    
    it('renders navigation items correctly based on enrollment status', () => {
        const handleListItemClick = jest.fn();
        const handleEnrollment = jest.fn();
    
        render(<CourseMenu selectedIndex={0} handleListItemClick={handleListItemClick} isEnrolled={false} handleEnrollment={handleEnrollment} />);
    
        // Verify home is always enabled
        expect(screen.getByText('Home')).toBeInTheDocument();
        const videoButton = screen.getByRole('button', { name: 'Icon Video' });
        expect(videoButton).not.toBeDisabled();
        // Check if the enroll now button is visible
        expect(screen.getByText('Enroll Now!')).toBeInTheDocument();
    });
    
    
    
});