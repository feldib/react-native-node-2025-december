import { Controller, Control, FieldErrors, FieldValues } from 'react-hook-form';
import FormField from '../types/forms/FormField';
import TextInputField from './TextInputField';
import RadioInputField from './RadioInputField';
import { useMemo } from 'react';

type InputFieldsProps<T extends FieldValues> = {
  control: Control<T>;
  errors: FieldErrors<T>;
  formFields: FormField<T>[];
};

const InputFields = <T extends FieldValues>({
  control,
  errors,
  formFields,
}: InputFieldsProps<T>) => {
  const errorMessageOf = useMemo(() => {
    return (fieldName: keyof T) => {
      return errors[fieldName] ? String(errors[fieldName]?.message) : undefined;
    };
  }, [errors]);
  return (
    <>
      {formFields.map(field => (
        <Controller
          key={field.name}
          control={control}
          name={field.name}
          render={({ field: { onChange, onBlur, value } }) => (
            <>
              {field.type === 'radio' ? (
                <RadioInputField
                  field={field}
                  errorMessage={errorMessageOf(field.name)}
                  value={value}
                  onChange={onChange}
                />
              ) : (
                <TextInputField
                  field={field}
                  errorMessage={errorMessageOf(field.name)}
                  value={value}
                  onChange={onChange}
                  onBlur={onBlur}
                />
              )}
            </>
          )}
        />
      ))}
    </>
  );
};

export default InputFields;
