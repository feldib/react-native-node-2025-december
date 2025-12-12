import React from 'react';
import { useForm } from 'react-hook-form';

import InputFields from '@/components/input/InputFields/InputFields';
import { render } from '@testing-library/react-native';

const Wrapper = () => {
  const { control } = useForm({ defaultValues: { firstName: '' } });
  const formFields = [
    { name: 'firstName', type: 'text', placeholder: 'First Name' },
  ] as any[];
  return (
    <InputFields
      control={control as any}
      errors={{} as any}
      formFields={formFields}
    />
  );
};

test('InputFields renders a text field', async () => {
  render(<Wrapper />);
});
