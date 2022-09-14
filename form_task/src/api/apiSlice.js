import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';

export const apiSlice = createApi({
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://localhost:3500'}),
    tagTypes: ['Event'],
    endpoints: (build) => ({
        getEvent: build.query({
            query: (id) => ({url: `/events/${id}`}),
        }),
        getEvents: build.query({
            query: () => '/events',
        }),
        addEvent: build.mutation({
            query: (event) => ({
                url: '/events',
                method: 'POST',
                body: event,
            }),
        }),

    })
});

export const {
    useGetEventsQuery,
    useGetEventQuery,
    useAddEventMutation,
} = apiSlice;