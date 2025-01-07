import { render, fireEvent, screen } from '@testing-library/react';
import FeedbackForm from '../components/FeedbackForm';


describe('FeedbackForm', () => {
    it('allows input in text field', () => {
        render(<FeedbackForm />);
    
        const input = screen.getByLabelText('Enter Feedback');
        fireEvent.change(input, { target: { value: 'Great course!' } });
    
        expect(input.value).toBe('Great course!');
    });
    
    
});