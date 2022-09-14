import React from 'react';
import {useGetEventQuery} from '../api/apiSlice';

//--- Material UI imports ---//
import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Stack from '@mui/material/Stack';


function EventView({ID}) {

    //---RTK Query ---//
    const {
        data: event,
        isLoading,
        isError,
        error
    } = useGetEventQuery(ID);


    if (isLoading) {
        return <p>Loading...</p>
    }

    if (isError) {
        return <p>{error}</p>
    }

    return (
        <Container maxWidth="md">
            <Stack spacing={3}>
                <Card variant='outlined' sx={{minWidth: 275, textAlign: 'center', backgroundColor: 'rgb(238,238,228)'}}>
                    <Stack spacing={3}>
                        <Typography variant="h3" gutterBottom>
                            {event.title}
                        </Typography>
                        <Typography variant="h5">
                            Start Date: {event.start_date}
                        </Typography>
                        <Typography variant="h5">
                            Start Time: {event.start_time}
                        </Typography>
                        <Typography variant="h5">
                            End Date: {event.end_date}
                        </Typography>
                        <Typography variant="h5">
                            End Time: {event.end_time}
                        </Typography>
                        <Typography variant="h5">
                            Description: {event.description}
                        </Typography>
                        <Typography variant="h5">
                            Event Type: {event.type}
                        </Typography>
                        <Typography variant="h5">
                            Place: {event.place}
                        </Typography>
                        <Typography variant="h5">
                            Contact Phone: {event.phone_number}
                        </Typography>
                        <Typography variant="h5">
                            Contact e-mail: {event.email}
                        </Typography>
                    </Stack>
                </Card>
            </Stack>
        </Container>
    );
}

export default EventView;