import React from 'react';
import {
  Text,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import { useRegisterMutation } from '@/hooks/queries/useAuth';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import registerSchema from '@/schemas/register';
import InputFields from '@/components/input/InputFields/InputFields';
import FormField from '@/types/forms/FormField';
import Gender from '@/enums/gender';
import { useTheme } from '@/theme/ThemeContext';
import { useTranslation } from 'react-i18next';

type RegisterFormData = yup.InferType<typeof registerSchema>;

const RegisterForm = () => {
  const { colors } = useTheme();
  const { t } = useTranslation();
  const registerMutation = useRegisterMutation();
  const isLoading = registerMutation.isPending;

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
    await registerMutation.mutateAsync({
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      password: data.password,
      age: data.age,
      gender: data.gender,
      description: data.description,
    });
  };

  const formFields: FormField<RegisterFormData>[] = [
    {
      name: 'firstName' as const,
      type: 'text',
      placeholder: t('auth.firstName'),
    },
    {
      name: 'lastName' as const,
      type: 'text',
      placeholder: t('auth.lastName'),
    },
    {
      name: 'email' as const,
      type: 'email',
      placeholder: t('auth.email'),
    },
    {
      name: 'confirmEmail' as const,
      type: 'email',
      placeholder: t('auth.confirmEmail'),
    },
    {
      name: 'password' as const,
      type: 'password',
      placeholder: t('auth.password'),
    },
    {
      name: 'confirmPassword' as const,
      type: 'password',
      placeholder: t('auth.confirmPassword'),
    },
    {
      name: 'age' as const,
      type: 'number',
      placeholder: t('auth.age'),
    },
    {
      name: 'gender' as const,
      type: 'radio',
      placeholder: t('auth.gender'),
      radioOptions: [
        { label: t('auth.male'), value: Gender.MALE },
        { label: t('auth.female'), value: Gender.FEMALE },
        { label: t('auth.other'), value: Gender.OTHER },
      ],
    },
    {
      name: 'description' as const,
      type: 'textarea',
      placeholder: t('auth.description'),
    },
  ];

  return (
    <>
      <InputFields control={control} errors={errors} formFields={formFields} />

      <TouchableOpacity
        style={[styles.button, { backgroundColor: colors.buttonPrimary }]}
        onPress={handleSubmit(onSubmit)}
        disabled={isLoading}
      >
        {isLoading ? (
          <ActivityIndicator color={colors.buttonPrimaryText} />
        ) : (
          <Text
            style={[styles.buttonText, { color: colors.buttonPrimaryText }]}
          >
            {t('auth.register')}
          </Text>
        )}
      </TouchableOpacity>
    </>
  );
};

const styles = StyleSheet.create({
  button: {
    width: '100%',
    height: 50,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: '600',
  },
});

export default RegisterForm;
