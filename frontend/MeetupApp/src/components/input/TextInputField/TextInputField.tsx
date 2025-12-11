import { StyleSheet, TextInput, Text } from 'react-native';
import { FieldValues } from 'react-hook-form';
import FormField, { TextareaFormField } from '@/types/forms/FormField';
import { useMemo } from 'react';

type TextInputFieldProps<T extends FieldValues> = {
  field: FormField<T>;
  errorMessage?: string;
  value: any;
  onChange: (value: any) => void;
  onBlur: () => void;
};

const TextInputField = <T extends FieldValues>({
  field,
  errorMessage,
  value,
  onChange,
  onBlur,
}: TextInputFieldProps<T>) => {
  const autoCapitalize = useMemo(() => {
    if (field.autoCapitalize) {
      return field.autoCapitalize;
    }
    if (field.type === 'textarea') {
      return 'sentences';
    }
  }, [field]);

  const keyboardType = useMemo(() => {
    switch (field.type) {
      case 'email':
        return 'email-address';
      case 'number':
        return 'numeric';
      default:
        return 'default';
    }
  }, [field]);

  const numberOfLines = useMemo(() => {
    if (field.type === 'textarea') {
      return (field as TextareaFormField<T>).numberOfLines ?? 4;
    } else {
      return undefined;
    }
  }, [field]);

  return (
    <>
      <TextInput
        style={[styles.input, field.type === 'textarea' && styles.textArea]}
        placeholder={field.placeholder}
        value={value?.toString() || ''}
        onChangeText={onChange}
        onBlur={onBlur}
        autoCapitalize={autoCapitalize}
        keyboardType={keyboardType}
        secureTextEntry={field.type === 'password'}
        multiline={field.type === 'textarea'}
        numberOfLines={numberOfLines}
      />
      {errorMessage && <Text style={styles.fieldError}>{errorMessage}</Text>}
    </>
  );
};

const styles = StyleSheet.create({
  label: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 10,
    color: '#333',
  },
  input: {
    width: '100%',
    height: 50,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    paddingHorizontal: 15,
    marginBottom: 15,
    fontSize: 16,
  },
  textArea: {
    height: 100,
    textAlignVertical: 'top',
    paddingTop: 15,
  },
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
  fieldError: {
    color: 'red',
    fontSize: 12,
    marginBottom: 10,
    marginLeft: 5,
  },
});

export default TextInputField;
