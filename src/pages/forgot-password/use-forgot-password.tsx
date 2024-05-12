import { useFormik } from 'formik';
import { useContext } from 'react';
import { AuthContext } from '../../context/auth/auth-context';
import {
  forgotPasswordSchema,
  ForgotPasswordType,
  initialValues,
} from './utils/constants';
const useForgotPassword = () => {
  const { forgotPassword } = useContext(AuthContext);

  const forgotPasswordForm = useFormik({
    initialValues,
    validationSchema: forgotPasswordSchema,
    onSubmit: handleSubmit,
    validateOnBlur: false,
  });

  function handleSubmit(payload: ForgotPasswordType) {
    forgotPassword(payload.email);
  }

  return { forgotPasswordForm };
};

export default useForgotPassword;
