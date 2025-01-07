import { render, screen, fireEvent } from '@testing-library/react';
import CommentItem from '../components/commentItem';



describe('CommentItem', () => {
    it('expands the comment to full length when clicked', () => {
        const comment = 'This is a very long comment that should be truncated when initially displayed but shown fully when the item is clicked.';
        render(<CommentItem comment={comment} rating={3} />);
        
        // Initial click to expand the comment
        fireEvent.click(screen.getByRole('button'));
        expect(screen.getByText(comment)).toBeInTheDocument();  // Now the full comment should be displayed
        
        // Click again to collapse
        fireEvent.click(screen.getByRole('button'));
        expect(screen.getByText(/^This is a very long comment that should be truncated.../)).toBeInTheDocument();
    });
    
    
});