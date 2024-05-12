import { useFormik } from 'formik';
import { useContext } from 'react';
import { useParams } from 'react-router-dom';
import * as yup from 'yup';
import { AuthContext } from '../../context/auth/auth-context';

const passwordResetSchema = yup.object().shape({
  password: yup
    .string()
    .min(8, 'Minimum 8 Characters')
    .required('This field is mandatory'),
  passwordConfirmation: yup
    .string()
    .oneOf([yup.ref('password')], 'Passwords must match')
    .required('This field is mandatory'),
});

export type PasswordReset = yup.InferType<typeof passwordResetSchema>;

const initialValues: PasswordReset = {
  password: '',
  passwordConfirmation: '',
};

const usePasswordConfirmReset = () => {
  const { token } = useParams();
  const { resetPassword } = useContext(AuthContext);

  const passwordResetForm = useFormik<PasswordReset>({
    initialValues,
    onSubmit: handleSubmit,
    validationSchema: passwordResetSchema,
  });

  async function handleSubmit(payload: PasswordReset) {
    await resetPassword(payload, token || '');
    passwordResetForm.setSubmitting(false);
  }
  return passwordResetForm;
};

export default usePasswordConfirmReset;
