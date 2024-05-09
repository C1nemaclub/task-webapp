import { TextField, TextFieldProps, Typography } from '@mui/material';
import React from 'react';
import { FormikProps } from 'formik';

type InputFieldProps = TextFieldProps & {
  form: FormikProps<any>;
  name: string;
};

const InputField = ({ name, form, ...props }: InputFieldProps) => {
  return (
    <TextField
      name={name}
      onChange={form.handleChange}
      onBlur={form.handleBlur}
      value={form.values[name]}
      error={!!form.errors[name]}
      helperText={
        form.errors && (
          <Typography component='span'>{form.errors[name] as string}</Typography>
        )
      }
      fullWidth
      {...props}
    />
  );
};

export default InputField;
