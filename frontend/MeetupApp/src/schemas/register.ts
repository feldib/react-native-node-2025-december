import * as yup from 'yup';

const registerSchema = yup.object().shape({
  firstName: yup.string().required('First name is required'),
  lastName: yup.string().required('Last name is required'),
  email: yup.string().email('Invalid email').required('Email is required'),
  confirmEmail: yup
    .string()
    .oneOf([yup.ref('email')], 'Email addresses must match')
    .required('Please confirm your email'),
  password: yup
    .string()
    .min(6, 'Password must be at least 6 characters')
    .required('Password is required'),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref('password')], 'Passwords must match')
    .required('Please confirm your password'),
  age: yup
    .number()
    .typeError('Age must be a number')
    .positive('Age must be positive')
    .integer('Age must be an integer')
    .required('Age is required'),
  gender: yup.string().required('Gender is required'),
  description: yup.string().required('Description is required'),
});

export default registerSchema;
