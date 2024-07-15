import { TextField, TextFieldProps } from '@mui/material';
import { FormikProps } from 'formik';
import { getFieldError } from '../../utils/functions';

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
      {...getFieldError(form, name)}
      fullWidth
      {...props}
    />
  );
};

export default InputField;
