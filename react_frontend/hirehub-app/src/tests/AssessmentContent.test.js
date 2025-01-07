import { render, fireEvent, screen } from '@testing-library/react';
import AssessmentContent from '../components/AssessmentContent';
import { faCircleLeft } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

jest.mock('@fortawesome/react-fontawesome', () => ({
  FontAwesomeIcon: () => 'Icon'
}));

describe('AssessmentContent', () => {
    it('calls handleAssessment when back button is clicked', () => {
        const mockHandleAssessment = jest.fn();
        render(<AssessmentContent assessment={{ title: 'Math Test' }} handleAssessment={mockHandleAssessment} />);
      
        const backButton = screen.getByRole('button', { name: /icon/i }); // Use actual icon name or text if available
        fireEvent.click(backButton);
        expect(mockHandleAssessment).toHaveBeenCalled();
    });

    it('renders initial assessment information correctly', () => {
        const mockHandleAssessment = jest.fn();
        render(<AssessmentContent assessment={{ title: 'Math Test' }} handleAssessment={mockHandleAssessment} />);
      
        expect(screen.getByText('Math Test')).toBeInTheDocument();
        expect(screen.getByText('Due')).toBeInTheDocument();
        expect(screen.getByText('12/01/2024')).toBeInTheDocument();
        expect(screen.getByText('Questions')).toBeInTheDocument();
        expect(screen.getByText('20')).toBeInTheDocument();
        expect(screen.getByText('Time Limit')).toBeInTheDocument();
        expect(screen.getByText('30 min')).toBeInTheDocument();
        expect(screen.getByRole('button', { name: 'Start' })).toBeInTheDocument();
      });

      it('handles assessment submission', () => {
        const mockHandleAssessment = jest.fn();
        const { getByRole } = render(<AssessmentContent assessment={{ title: 'Math Test' }} handleAssessment={mockHandleAssessment} />);
      
        // Start the assessment
        fireEvent.click(getByRole('button', { name: 'Start' }));
      
        // Submit the assessment
        fireEvent.click(getByRole('button', { name: 'Submit' })); // Your actual text/role may vary
        expect(screen.getByText('Submit success')).toBeInTheDocument();
      });
          
      
      
});