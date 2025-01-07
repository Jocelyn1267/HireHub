import { render, fireEvent, screen } from '@testing-library/react';
import UploadFileDialog from '../components/UploadFileDialog';
import userEvent from '@testing-library/user-event';

describe('UploadFileDialog', () => {
    it('renders correctly with initial state', () => {
        const handleClose = jest.fn();
        render(<UploadFileDialog open={true} handleClose={handleClose} />);
      
        expect(screen.getByLabelText('title')).toHaveValue('');
        expect(screen.queryByText('Selected file:')).toBeNull();
      });
      
      it('closes the dialog when cancel is clicked', () => {
        const handleClose = jest.fn();
        render(<UploadFileDialog open={true} handleClose={handleClose} />);
      
        fireEvent.click(screen.getByText('Cancel'));
        expect(handleClose).toHaveBeenCalledTimes(1);
      });

      it('displays an error message when the title is missing', () => {
        const handleClose = jest.fn();
        render(<UploadFileDialog open={true} handleClose={handleClose} />);
    
        // Try to submit the form without filling out the title
        fireEvent.change(screen.getByLabelText('title'), { target: { value: '' } });
        fireEvent.click(screen.getByRole('button', { name: 'Upload' }));
    
        // Check for the presence of the error message
        expect(screen.getByText('title is required.')).toBeInTheDocument();
      });
      
      it('displays an error message when no file is selected', () => {
        const handleClose = jest.fn();
        render(<UploadFileDialog open={true} handleClose={handleClose} />);
    
        // Assume the title is filled but no file is selected
        fireEvent.change(screen.getByLabelText('title'), { target: { value: 'Valid Title' } });
        fireEvent.click(screen.getByRole('button', { name: 'Upload' }));
    
        // Check for the presence of the error message
        expect(screen.getByText('Please select a file.')).toBeInTheDocument();
      });
      
});