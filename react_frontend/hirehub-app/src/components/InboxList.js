import InboxCard from './InboxCard';
import { useState } from 'react';
import { Box, Stack, Pagination, PaginationItem, ListItem, List } from '@mui/material';

/**
 * The component to show all the inbox messages received by each user
 */

const ITEMS_PER_PAGE = 5;
export default function InboxList({ selectedIndex, messageList }) {

    const [page, setPage] = useState(1);

    // Calculate the number of pages based on data length and items per page
    const totalPages = Math.ceil(messageList.length / ITEMS_PER_PAGE);

    // Get current items for the page
    const currentItems = messageList.slice((page - 1) * ITEMS_PER_PAGE, page * ITEMS_PER_PAGE);

    const handlePageChange = (event, value) => {
        setPage(value);
    };

    return (
        <>
            <Box sx={{
                width: '100%',
                justifyContent: "center",
                bgcolor: 'rgba(255, 255, 255, 0.7)',
                p: 3
            }}>     {/* Adds margin-top of 5 units */}
                <List>
                    {currentItems.map((content) => (
                        <ListItem key={content.id}>

                            <InboxCard message={content} />
                        </ListItem>
                    ))}
                </List>

                <Stack spacing={2} direction="row" justifyContent="center" mt={4}>
                    <Pagination
                        page={page}
                        count={totalPages}
                        onChange={handlePageChange}
                        renderItem={(item) => (
                            <PaginationItem
                                {...item}
                            />
                        )}
                    />
                </Stack>
            </Box>
        </>

    );
}