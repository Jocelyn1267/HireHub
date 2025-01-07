import axios from 'axios';
import AxiosMockAdapter from 'axios-mock-adapter';
import { render, screen, fireEvent, waitFor} from '@testing-library/react';
import CourseForm from '../components/CourseForm';


const axiosMock = new AxiosMockAdapter(axios);
beforeEach(() => {
    jest.resetAllMocks();
    axiosMock.reset();
});

afterAll(() => {
    axiosMock.restore();
});


describe('CourseForm Component', () => {

    test('renders correctly when open', () => {
      render(<CourseForm open={true} handleClose={() => {}} handleAlert={() => {}} formTitle="Add Course" />);
      expect(screen.getByText('Add Course')).toBeInTheDocument();
      expect(screen.getByLabelText('Title')).toBeInTheDocument();
      expect(screen.getByLabelText('Description')).toBeInTheDocument();
    });
  
    test('does not render when not open', () => {
      render(<CourseForm open={false} handleClose={() => {}} handleAlert={() => {}} />);
      expect(screen.queryByText('Submit')).not.toBeInTheDocument();
    });

    test('updates formData when title and description props change', () => {
        const { rerender } = render(<CourseForm open={true} handleClose={() => {}} handleAlert={() => {}} title="Initial Title" description="Initial Description" formTitle="Edit Course" />);
    
        // Initial check
        expect(screen.getByLabelText('Title').value).toBe('Initial Title');
        expect(screen.getByLabelText('Description').value).toBe('Initial Description');
    
        // Prop change
        rerender(<CourseForm open={true} handleClose={() => {}} handleAlert={() => {}} title="Updated Title" description="Updated Description" formTitle="Edit Course" />);
    
        // Check after update
        expect(screen.getByLabelText('Title').value).toBe('Updated Title');
        expect(screen.getByLabelText('Description').value).toBe('Updated Description');
      });

    test('submits data to an API via axios', async () => {
        axiosMock.onPost('http://localhost/courses').reply(200);
        const handleAlert = jest.fn();
        const handleClose = jest.fn();
        render(<CourseForm open={true} handleClose={handleClose} handleAlert={handleAlert} postURL="http://localhost/courses" formTitle="Add Course" />);
        
        fireEvent.change(screen.getByLabelText('Title'), { target: { value: 'New Course' } });
        fireEvent.change(screen.getByLabelText('Description'), { target: { value: 'A description' } });
        fireEvent.click(screen.getByText('Submit'));
        
        await waitFor(() => expect(handleAlert).toHaveBeenCalledWith('Course saved successfully!', 'success'));
        expect(handleClose).toHaveBeenCalled();
    });

    test('validates form fields before submitting', () => {
        const handleAlert = jest.fn();
        render(<CourseForm open={true} handleAlert={handleAlert} handleClose={() => {}} postURL="http://localhost/courses" />);
        
        // Attempt to submit without filling out the form
        fireEvent.click(screen.getByText('Submit'));
        expect(screen.getByText('Course title must be a valid string.')).toBeInTheDocument();

        // Fill in the title but with a too long description
        fireEvent.change(screen.getByLabelText('Title'), { target: { value: 'Valid Title' } });
        fireEvent.change(screen.getByLabelText('Description'), { target: { value: 'x'.repeat(1001) } });
        fireEvent.click(screen.getByText('Submit'));
        const errorMessages = screen.getAllByText('Course description must be within 1000 characters.');
        expect(errorMessages.length).toBe(2); // This will appear twice since there's one for default
    });

    test('submits data to an API via axios with network error', async () => {
        axiosMock.onPost('http://localhost/courses').reply(400);
        const handleAlert = jest.fn();
        const handleClose = jest.fn();
        
        render(<CourseForm open={true} handleClose={handleClose} handleAlert={handleAlert} postURL="http://localhost/courses" formTitle="Add Course" />);

        // Assuming you have input fields for title and description and a submit button
        fireEvent.change(screen.getByLabelText('Title'), { target: { value: 'Test Title' } });
        fireEvent.change(screen.getByLabelText('Description'), { target: { value: 'Test Description' } });
        fireEvent.click(screen.getByText('Submit'));

        // Wait for the handleAlert to be called
        await waitFor(() => expect(handleAlert).toHaveBeenCalled());
    });
  });