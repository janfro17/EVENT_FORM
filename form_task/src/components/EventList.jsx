import React from 'react';
import {nanoid} from 'nanoid';
import {Link} from 'react-router-dom';
import TablePaginationActions from "./TablePaginationActions";

//--- Material UI imports ---//
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableFooter from '@mui/material/TableFooter';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button'

//--- Custom Imports ---//
import {useGetEventsQuery} from "../api/apiSlice";

function createData(id, title, start_date, start_time, end_date, end_time, description, image, type, place, phone, email) {
    return {id, title, start_date, start_time, end_date, end_time, description, image, type, place, phone, email};
}

function EventList({handleID}) {

    //---RTK Query ---//
    const {
        data: events,
        isLoading,
        isError,
        error
    } = useGetEventsQuery();

    //---Pagiantion states---//
    const [page, setPage] = React.useState(0);

    const [rowsPerPage, setRowsPerPage] = React.useState(5);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const rows = [];
    events?.map(event => {
        rows.push(createData(event.id, event.title, event.start_date, event.start_time, event.end_date, event.end_time, event.description, event.image, event.type, event.place, event.phone, event.email));
    });

    const emptyRows =
        page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

    //--- Conditional rendering---//

    if (isLoading) {
        return <p>Loading...</p>
    }
    if (isError) {
        return <p>{error}</p>
    }


    return (
        <div>
            <h1>Event list</h1>
            <TableContainer component={Paper}>
                <Table sx={{minWidth: 500}} aria-label="custom pagination table">
                    <TableBody>
                        {(rowsPerPage > 0
                                ? rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                : rows
                        ).map((row) => (
                            <TableRow key={nanoid()}>
                                <TableCell component="th" scope="row">
                                    {row.title}
                                </TableCell>
                                <TableCell style={{width: 160}} align="right">
                                    {row.start_date}
                                </TableCell>
                                <TableCell style={{width: 160}} align="right">
                                    {row.start_time}
                                </TableCell>
                                <TableCell style={{width: 160}} align="right">
                                    {row.end_date}
                                </TableCell>
                                <TableCell style={{width: 160}} align="right">
                                    {row.end_time}
                                </TableCell>
                                <TableCell style={{width: 160}} align="right">
                                    {row.description}
                                </TableCell>
                                <TableCell style={{width: 160}} align="right">
                                    {row.type}
                                </TableCell>
                                <TableCell style={{width: 160}} align="right">
                                    {row.place}
                                </TableCell>
                                <TableCell style={{width: 160}} align="right">
                                    {row.phone}
                                </TableCell>
                                <TableCell style={{width: 160}} align="right">
                                    {row.email}
                                </TableCell>
                                <TableCell style={{width: 160}} align="right">
                                    <Link to='/event'>
                                        <Button
                                            onClick={() => handleID(row.id)}
                                            variant='contained'
                                            color='primary'>
                                            View
                                        </Button>
                                    </Link>
                                </TableCell>
                            </TableRow>
                        ))}
                        {emptyRows > 0 && (
                            <TableRow style={{height: 53 * emptyRows}}>
                                <TableCell colSpan={6}/>
                            </TableRow>
                        )}
                    </TableBody>
                    <TableFooter>
                        <TableRow>
                            <TablePagination
                                rowsPerPageOptions={[5, 10, 25, {label: 'All', value: -1}]}
                                colSpan={3}
                                count={rows.length}
                                rowsPerPage={rowsPerPage}
                                page={page}
                                SelectProps={{
                                    inputProps: {
                                        'aria-label': 'rows per page',
                                    },
                                    native: true,
                                }}
                                onPageChange={handleChangePage}
                                onRowsPerPageChange={handleChangeRowsPerPage}
                                ActionsComponent={TablePaginationActions}
                            />
                        </TableRow>
                    </TableFooter>
                </Table>
            </TableContainer>
            <Link to='/add-event'>
                <Button
                    color="secondary"
                    variant="contained">
                    Add event
                </Button>
            </Link>
        </div>
    )
}

export default EventList;