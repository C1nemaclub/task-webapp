import { useFormik } from 'formik';
import { initialValues, signInSchema, UserSignIn } from './utils/constants';
import { useAuthContext } from '../../context/auth/auth-context';
const useSignIn = () => {
  const { logIn } = useAuthContext();

  const loginForm = useFormik({
    initialValues,
    validationSchema: signInSchema,
    onSubmit: handleSubmit,
    validateOnBlur: false,
  });

  function handleSubmit(payload: UserSignIn) {
    logIn(payload);
  }

  return { loginForm };
};

export default useSignIn;
