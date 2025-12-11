import { FieldValues, Path } from 'react-hook-form';
import { TextInputProps } from 'react-native';

type InputType =
  | 'text'
  | 'textarea'
  | 'email'
  | 'password'
  | 'number'
  | 'radio';

type RadioOption = {
  label: string;
  value: string;
};

export type BaseFormField<T extends FieldValues> = {
  name: Path<T>;
  type: InputType;
  placeholder: string;
  autoCapitalize?: TextInputProps['autoCapitalize'];
};

export type TextareaFormField<T extends FieldValues> = BaseFormField<T> & {
  type: 'textarea';
  numberOfLines?: number;
};

export type RadioFormField<T extends FieldValues> = BaseFormField<T> & {
  type: 'radio';
  radioOptions: RadioOption[];
};

type FormField<T extends FieldValues> =
  | BaseFormField<T>
  | TextareaFormField<T>
  | RadioFormField<T>;

export default FormField;
export type { RadioOption };
