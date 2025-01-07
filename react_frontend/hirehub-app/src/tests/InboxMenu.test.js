import { render, fireEvent, screen } from '@testing-library/react';
import InboxMenu from '../components/InboxMenu';
import userEvent from '@testing-library/user-event';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faStar, faPaperPlane, faInbox, faTrashCan, faPencil } from '@fortawesome/free-solid-svg-icons';

library.add(faStar, faPaperPlane, faInbox, faTrashCan, faPencil); 


describe('InboxMenu', () => {
    it('renders correctly with all list items', () => {
        render(<InboxMenu selectedIndex={0} handleListItemClick={jest.fn()} />);
      
        expect(screen.getByText('Inbox')).toBeInTheDocument();
        expect(screen.getByText('Starred')).toBeInTheDocument();
        expect(screen.getByText('Sent')).toBeInTheDocument();
        expect(screen.getByText('Trash')).toBeInTheDocument();
        
        // Ensure that the Compose button is rendered
        expect(screen.getByText('Compose')).toBeInTheDocument();
        
        // Initially, the compose form should not be open
        expect(screen.queryByText('Submit')).not.toBeInTheDocument();  // Assuming "Submit" is part of your ComposeForm
      });

      it('initially has the compose form closed', () => {
        render(<InboxMenu selectedIndex={0} handleListItemClick={jest.fn()} />);
      
        // Check the initial open and showAlert states indirectly by checking visibility of ComposeForm
        const composeButton = screen.getByText('Compose');
        expect(composeButton).toBeInTheDocument();
        expect(screen.queryByText('Cancel')).not.toBeInTheDocument();  // Assuming 'Cancel' button in your ComposeForm
      });
      
      it('triggers handleListItemClick with the correct index when list items are clicked', () => {
        const handleListItemClick = jest.fn();
        render(<InboxMenu selectedIndex={0} handleListItemClick={handleListItemClick} />);
    
        // Use roles to target buttons, ensuring you're interacting with the correct elements
        fireEvent.click(screen.getByRole('button', { name: /inbox/i }));
        expect(handleListItemClick).toHaveBeenCalledWith(0);
        handleListItemClick.mockClear();
    
        fireEvent.click(screen.getByRole('button', { name: /starred/i }));
        expect(handleListItemClick).toHaveBeenCalledWith(1);
        handleListItemClick.mockClear();
    
        fireEvent.click(screen.getByRole('button', { name: /sent/i }));
        expect(handleListItemClick).toHaveBeenCalledWith(2);
        handleListItemClick.mockClear();
    
        fireEvent.click(screen.getByRole('button', { name: /trash/i }));
        expect(handleListItemClick).toHaveBeenCalledWith(3);
        handleListItemClick.mockClear();
      });
      
      
      
});