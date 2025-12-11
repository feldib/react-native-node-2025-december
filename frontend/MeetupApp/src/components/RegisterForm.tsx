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

type RegisterFormData = yup.InferType<typeof registerSchema>;

const formFields: FormField<RegisterFormData>[] = [
  {
    name: 'firstName' as const,
    placeholder: 'First Name',
    autoCapitalize: 'words' as const,
  },
  {
    name: 'lastName' as const,
    placeholder: 'Last Name',
    autoCapitalize: 'words' as const,
  },
  {
    name: 'email' as const,
    placeholder: 'Email',
    keyboardType: 'email-address' as const,
    autoCapitalize: 'none' as const,
  },
  {
    name: 'confirmEmail' as const,
    placeholder: 'Confirm Email',
    keyboardType: 'email-address' as const,
    autoCapitalize: 'none' as const,
  },
  {
    name: 'password' as const,
    placeholder: 'Password',
    secureTextEntry: true,
  },
  {
    name: 'confirmPassword' as const,
    placeholder: 'Confirm Password',
    secureTextEntry: true,
  },
  {
    name: 'age' as const,
    placeholder: 'Age',
    keyboardType: 'numeric' as const,
  },
  {
    name: 'gender' as const,
    placeholder: 'Gender',
  },
  {
    name: 'description' as const,
    placeholder: 'Description',
    multiline: true,
    numberOfLines: 4,
    isTextArea: true,
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
      gender: '',
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
