import * as yup from 'yup';

export const REGISTER_SCHEMA = yup.object().shape({
    username: yup.string().required('Username is required'),
    password: yup.string().required('Password is required').min(6, 'Password must be at least 6 characters long'),
    confirmPassword: yup.string().oneOf([yup.ref('password')], 'Passwords must match')
});
