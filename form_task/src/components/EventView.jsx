import React from 'react';
import {useGetEventQuery} from "../api/apiSlice";

import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';



function EventView({ID}) {
    const {
        data: event,
        isLoading,
        isSuccess,
        isError,
        error
    } = useGetEventQuery(ID);



    let content;
    if (isLoading) {
        content = <p>Loading...</p>
    } else if (isSuccess) {
        content = <>
            <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                {event.title}
            </Typography>
            <Typography sx={{ mb: 1.5 }} color="text.secondary">
                {event.start_date}
            </Typography>
            <Typography sx={{ mb: 1.5 }} color="text.secondary">
                {event.start_time}
            </Typography>
            <Typography sx={{ mb: 1.5 }} color="text.secondary">
                {event.end_date}
            </Typography>
            <Typography sx={{ mb: 1.5 }} color="text.secondary">
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
        </>
    } else if (isError) {
        content = <p>{error}</p>
    }
    return (
        <div className='container'>
            <Card sx={{ minWidth: 275 }}>
                <CardContent>
                    {content}
                </CardContent>
            </Card>
        </div>
    );
}

export default EventView;