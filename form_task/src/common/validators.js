import * as yup from "yup";

const supportedFormats = ['image/jpg', 'image/jpeg', 'image/png'];

export const validationSchema = yup.object({
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