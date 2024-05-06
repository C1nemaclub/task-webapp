import { useFormik } from 'formik';
import { initialValues, signUpSchema, UserSignUp } from './utils/constants';
import { useAuthContext } from '../../context/auth/auth-context';

const useSignUp = () => {
  const { register } = useAuthContext();

  const registerForm = useFormik({
    initialValues: initialValues,
    validationSchema: signUpSchema,
    onSubmit: handleSubmit,
    validateOnChange: true,
    validateOnBlur: false,
  });

  function handleSubmit(payload: UserSignUp) {
    register(payload);
  }

  return { registerForm };
};

export default useSignUp;
