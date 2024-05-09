import { useFormik } from 'formik';
import {
  initialValues,
  forgotPasswordSchema,
  ForgotPasswordType,
} from './utils/constants';
import { useAuthContext } from '../../context/auth/auth-context';
const useForgotPassword = () => {
  const { forgotPassword } = useAuthContext();

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
