import React from 'react';
import {useGetEventQuery} from "../api/apiSlice";
import {useParams} from "react-router-dom";


function EventView() {
    const {
        data: event,
        isLoading,
        isSuccess,
        isError,
        error
    } = useGetEventQuery();

    let params = useParams();

    let content;
    if (isLoading) {
        content = <p>Loading...</p>
    } else if (isSuccess) {
        content = <article>
            <p>{event.title}</p>
            <p>{event.start_date}</p>
            <p>{event.start_time}</p>
            <p>{event.end_date}</p>
            <p>{event.end_time}</p>
            <p>{event.description}</p>
            <p>{event.image}</p>
            <p>{event.type}</p>
            <p>{event.place}</p>
            <p>{event.phone}</p>
            <p>{event.email}</p>
        </article>
    } else if (isError) {
        content = <p>{error}</p>
    }
    return (
        <div className='container'>
            {content}
        </div>
    );
}

export default EventView;