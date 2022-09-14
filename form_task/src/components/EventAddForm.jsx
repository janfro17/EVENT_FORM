import React, {useRef} from 'react';

import {useFormik} from 'formik';

//--- Material UI imports ---//
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import FormHelperText from '@mui/material/FormHelperText';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

//--- Custom Imports ---//
import {useAddEventMutation} from "../api/apiSlice";
import PreviewImage from "./PreviewImage";
import {validationSchema} from "../common/validators";


const formStyle = {margin: '20px 0', display: 'block'}

const EventAddForm = () => {
//--- Ref to image id ---//
    const imageRef = useRef(null);
//--- RTK Query -add new event to json server ---//
    const [addEvent] = useAddEventMutation();

    const initialValues = {
        title: '',
        start_date: '',
        start_time: '',
        end_date: '',
        end_time: '',
        description: '',
        image: null,
        type: '',
        place: '',
        phone_number: '',
        email: '',
    };

    const formik = useFormik({
        initialValues: initialValues,
        validationSchema: validationSchema,
        onSubmit: (values, {resetForm}) => {
            addEvent(values);
            resetForm();
            alert(JSON.stringify(values, null, 2));
        },
    });

    return (
        <div className='container'>
            <h1 className="form-title">Add your event</h1>
            <form onSubmit={formik.handleSubmit}>
                <TextField
                    sx={formStyle}
                    fullWidth
                    id="title"
                    name="title"
                    label="Event Title"
                    value={formik.values.title}
                    onChange={formik.handleChange}
                    error={formik.touched.title && Boolean(formik.errors.title)}
                    helperText={formik.touched.title && formik.errors.title}
                />
                <TextField
                    sx={formStyle}
                    fullWidth
                    id="start_date"
                    name="start_date"
                    label="Start date"
                    type='date'
                    InputLabelProps={{shrink: true}}
                    value={formik.values.start_date}
                    onChange={formik.handleChange}
                    error={formik.touched.start_date && Boolean(formik.errors.start_date)}
                    helperText={formik.touched.start_date && formik.errors.start_date}
                />
                <TextField
                    sx={formStyle}
                    fullWidth
                    id="start_time"
                    name="start_time"
                    label="Start time"
                    type='time'
                    InputLabelProps={{shrink: true}}
                    value={formik.values.start_time}
                    onChange={formik.handleChange}
                    error={formik.touched.start_time && Boolean(formik.errors.start_time)}
                    helperText={formik.touched.start_time && formik.errors.start_time}
                />
                <TextField
                    sx={formStyle}
                    fullWidth
                    id="end_date"
                    name="end_date"
                    label="End date"
                    type='date'
                    InputLabelProps={{shrink: true}}
                    value={formik.values.end_date}
                    onChange={formik.handleChange}
                    error={formik.touched.end_date && Boolean(formik.errors.end_date)}
                    helperText={formik.touched.end_date && formik.errors.end_date}
                /><TextField
                sx={formStyle}
                fullWidth
                id="end_time"
                name="end_time"
                label="End time"
                type='time'
                InputLabelProps={{shrink: true}}
                value={formik.values.end_time}
                onChange={formik.handleChange}
                error={formik.touched.end_time && Boolean(formik.errors.end_time)}
                helperText={formik.touched.end_time && formik.errors.end_time}
            />
                <TextField
                    sx={formStyle}
                    fullWidth
                    id="description"
                    name="description"
                    label="Event description"
                    value={formik.values.description}
                    onChange={formik.handleChange}
                    error={formik.touched.description && Boolean(formik.errors.description)}
                    helperText={formik.touched.description && formik.errors.description}
                />
                <InputLabel htmlFor='image'>
                    Upload event image
                </InputLabel>
                {formik.errors.image && <FormHelperText>{formik.errors.image}</FormHelperText>}
                <input
                    ref={imageRef}
                    id='image'
                    name='image'
                    hidden
                    type='file'
                    onChange={(event) => formik.setFieldValue('image', event.target.files[0])}
                />
                {formik.values.image && <PreviewImage file={formik.values.image}/>}
                <Button
                    onClick={() => {
                        imageRef.current.click();
                    }}
                >
                    Upload
                </Button>
                <FormControl
                    sx={formStyle}>
                    <InputLabel id="type-label">Event Type</InputLabel>
                    <Select
                        fullWidth
                        labelId="type-label"
                        value={formik.values.type}
                        label="Event Type"
                        onChange={formik.handleChange}
                        id="type"
                        name='type'>
                        <MenuItem value='Sport'>Sport</MenuItem>
                        <MenuItem value='Culture'>Culture</MenuItem>
                        <MenuItem value='Health'>Health</MenuItem>
                    </Select>
                    <FormHelperText>Please select type of the event</FormHelperText>
                </FormControl>
                <TextField
                    sx={formStyle}
                    fullWidth
                    id="place"
                    name="place"
                    label="Event place"
                    value={formik.values.place}
                    onChange={formik.handleChange}
                    error={formik.touched.place && Boolean(formik.errors.place)}
                    helperText={formik.touched.place && formik.errors.place}
                />
                <TextField
                    sx={formStyle}
                    fullWidth
                    id="phone_number"
                    name="phone_number"
                    label="Contact phone number"
                    value={formik.values.phone_number}
                    onChange={formik.handleChange}
                    error={formik.touched.phone_number && Boolean(formik.errors.phone_number)}
                    helperText={formik.touched.phone_number && formik.errors.phone_number}
                />
                <TextField
                    sx={formStyle}
                    fullWidth
                    id="email"
                    name="email"
                    label="Email"
                    value={formik.values.email}
                    onChange={formik.handleChange}
                    error={formik.touched.email && Boolean(formik.errors.email)}
                    helperText={formik.touched.email && formik.errors.email}
                />
                <Button
                    sx={formStyle}
                    color="primary"
                    variant="contained"
                    type="submit">
                    Submit
                </Button>
                <Button
                    type="reset"
                    color="secondary"
                    variant="contained"
                    onClick={() => formik.resetForm()}>
                    Reset All
                </Button>
            </form>
        </div>
    );
}

export default EventAddForm;