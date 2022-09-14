import React, {useRef} from 'react';

//--- Formik imports --- //
import {useFormik} from 'formik';

//--- Material UI imports ---//
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import FormHelperText from '@mui/material/FormHelperText';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

//--- Yup Imports ---//
import * as yup from 'yup';

//--- Custom Imports ---//
import {useAddEventMutation } from "../api/apiSlice";
import PreviewImage from "./PreviewImage";

//--- Variables ---//
const formStyle = {margin: '20px 0', display: 'block'}
const supportedFormats = ['image/jpg', 'image/jpeg', 'image/png'];

const validationSchema = yup.object({
    title: yup
        .string('Enter event title')
        .min(2, 'Too Short!')
        .max(30, "Too Long!")
        .required('Required'),
    start_date: yup
        .date('Enter start date')
        .required('Required'),
    start_time: yup
        .string('Enter start time')
        .required("Required"),
    end_date: yup
        .date('Enter end date')
        .required('Required'),
    end_time: yup
        .string('Enter end time')
        .required('Requried'),
    description: yup
        .string('Enter event description')
        .min(2, 'Too Short!')
        .max(100, "Too Long!")
        .required('Required'),
    image: yup
        .mixed()
        .nullable()
        .required('A file is required')
        .test('file size',
            'upload file is too big',
            (value) => !value || (value && value.size <= 1024 * 1024))
        .test('file format',
            'upload file has unsupported format',
            (value) => !value || (value && supportedFormats.includes(value?.type))),
    phone_number: yup
        .string()
        .matches(/^[0-9]+$/, "Must be only digits")
        .min(9, 'Enter 9 characters')
        .max(9, 'Enter 9 characters')
        .required('Required'),
    email: yup
        .string('Enter your email')
        .email('Enter a valid email')
        .required('Email is required'),
    place: yup
        .string('Enter place ofe the event')
        .min(2, 'Too Short')
        .max(20, "Too Long")
        .required('Required'),
});

const EventAddForm = () => {

    const imageRef = useRef(null);

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
        onSubmit: (values,{resetForm} ) => {
            console.log(values);
            addEvent(values);
            // resetForm();
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
                    InputLabelProps={{ shrink: true }}
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
                    InputLabelProps={{ shrink: true }}
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
                    InputLabelProps={{ shrink: true }}
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
                    InputLabelProps={{ shrink: true }}
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
                { formik.values.image && <PreviewImage file={formik.values.image}/>}
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