import {
  Text,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import { useAppDispatch } from '@/store/hooks';
import { login } from '@/store/authSlice';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import loginSchema from '@/schemas/login';
import InputFields from '@/components/input/InputFields/InputFields';
import FormField from '@/types/forms/FormField';

type LoginFormData = yup.InferType<typeof loginSchema>;

const formFields: FormField<LoginFormData>[] = [
  {
    name: 'email' as const,
    type: 'email',
    placeholder: 'Email',
  },
  {
    name: 'password' as const,
    type: 'password',
    placeholder: 'Password',
  },
];

const LoginForm = ({ isLoading }: { isLoading: boolean }) => {
  const dispatch = useAppDispatch();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = async (data: LoginFormData) => {
    await dispatch(login({ email: data.email, password: data.password }));
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
          <Text style={styles.buttonText}>Login</Text>
        )}
      </TouchableOpacity>
    </>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#3f5eadff',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  linkButton: {
    marginTop: 20,
    alignItems: 'center',
  },
  linkText: {
    color: '#3f5eadff',
    fontSize: 16,
  },
});

export default LoginForm;
