import React from 'react';
import {useGetEventQuery} from "../api/apiSlice";

//--- Material UI imports ---//
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';


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
        <div className='container'>
            <Card sx={{minWidth: 275}}>
                <CardContent>
                    <Typography sx={{fontSize: 14}} color="text.secondary" gutterBottom>
                        {event.title}
                    </Typography>
                    <Typography sx={{mb: 1.5}} color="text.secondary">
                        {event.start_date}
                    </Typography>
                    <Typography sx={{mb: 1.5}} color="text.secondary">
                        {event.start_time}
                    </Typography>
                    <Typography sx={{mb: 1.5}} color="text.secondary">
                        {event.end_date}
                    </Typography>
                    <Typography sx={{mb: 1.5}} color="text.secondary">
                        {event.end_time}
                    </Typography>
                    <Typography variant="body2">
                        {event.description}
                    </Typography>
                    <Typography variant="body2">
                        {event.image}
                    </Typography>
                    <Typography variant="body2">
                        {event.type}
                    </Typography>
                    <Typography variant="body2">
                        {event.place}
                    </Typography>
                    <Typography variant="body2">
                        {event.phone}
                    </Typography>
                    <Typography variant="body2">
                        {event.email}
                    </Typography>
                </CardContent>
            </Card>
        </div>
    );
}

export default EventView;