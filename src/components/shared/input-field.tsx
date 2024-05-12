import { TextField, TextFieldProps, Typography } from '@mui/material';
import { FormikProps } from 'formik';

type InputFieldProps = TextFieldProps & {
  form: FormikProps<any>;
  name: string;
};

const InputField = ({ name, form, ...props }: InputFieldProps) => {
  const isError = !!form.errors[name] && !!form.touched[name] && form.submitCount >= 1;
  return (
    <TextField
      name={name}
      onChange={form.handleChange}
      onBlur={form.handleBlur}
      value={form.values[name]}
      error={isError}
      helperText={
        isError && <Typography component='span'>{form.errors[name] as string}</Typography>
      }
      fullWidth
      {...props}
    />
  );
};

export default InputField;
