import React from 'react';
import {
  Text,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import { register } from '../store/authSlice';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import registerSchema from '../schemas/register';
import { useAppDispatch } from '../store/hooks';
import InputFields from './InputFields';
import FormField from '../types/forms/FormField';
import Gender from '../enums/gender';

type RegisterFormData = yup.InferType<typeof registerSchema>;

const formFields: FormField<RegisterFormData>[] = [
  {
    name: 'firstName' as const,
    type: 'text',
    placeholder: 'First Name',
  },
  {
    name: 'lastName' as const,
    type: 'text',
    placeholder: 'Last Name',
  },
  {
    name: 'email' as const,
    type: 'email',
    placeholder: 'Email',
  },
  {
    name: 'confirmEmail' as const,
    type: 'email',
    placeholder: 'Confirm Email',
  },
  {
    name: 'password' as const,
    type: 'password',
    placeholder: 'Password',
  },
  {
    name: 'confirmPassword' as const,
    type: 'password',
    placeholder: 'Confirm Password',
  },
  {
    name: 'age' as const,
    type: 'number',
    placeholder: 'Age',
  },
  {
    name: 'gender' as const,
    type: 'radio',
    placeholder: 'Gender',
    radioOptions: [
      { label: 'Male', value: Gender.MALE },
      { label: 'Female', value: Gender.FEMALE },
      { label: 'Other', value: Gender.OTHER },
    ],
  },
  {
    name: 'description' as const,
    type: 'textarea',
    placeholder: 'Description',
  },
];

const RegisterForm = ({ isLoading }: { isLoading: boolean }) => {
  const dispatch = useAppDispatch();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(registerSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      confirmEmail: '',
      password: '',
      confirmPassword: '',
      age: undefined,
      gender: undefined,
      description: '',
    },
  });

  const onSubmit = async (data: RegisterFormData) => {
    await dispatch(
      register({
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        password: data.password,
        age: data.age,
        gender: data.gender,
        description: data.description,
      }),
    );
  };

  return (
    <>
      <InputFields control={control} errors={errors} formFields={formFields} />

      <TouchableOpacity
        style={styles.button}
        onPress={handleSubmit(onSubmit)}
        disabled={isLoading}
      >
        {isLoading ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text style={styles.buttonText}>Register</Text>
        )}
      </TouchableOpacity>
    </>
  );
};

const styles = StyleSheet.create({
  button: {
    width: '100%',
    height: 50,
    backgroundColor: '#007AFF',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
});

export default RegisterForm;
