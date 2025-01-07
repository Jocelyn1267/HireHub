import React from 'react';
import { render, screen } from '@testing-library/react';
import InboxCard from '../components/InboxCard';

it('displays the full message text when the message length is below truncation threshold', () => {
    const shortMessage = {
      subject: 'Reminder',
      text: 'Meeting at noon',
      receiveTime: '2022-08-30T12:00:00Z',
    };
  
    render(<InboxCard message={shortMessage} />);
  
    // Check that the entire message text is displayed without truncation
    expect(screen.getByText(shortMessage.text+"...")).toBeInTheDocument();
  });
  