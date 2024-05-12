import { FormikHelpers, useFormik } from 'formik';
import { initialValues, signInSchema, UserSignIn } from './utils/constants';
import { AuthContext } from '../../context/auth/auth-context';
import { useContext } from 'react';
const useSignIn = () => {
  const { logIn } = useContext(AuthContext);

  const loginForm = useFormik({
    initialValues,
    validationSchema: signInSchema,
    onSubmit: handleSubmit,
  });

  function handleSubmit(
    payload: UserSignIn,
    { setSubmitting }: FormikHelpers<UserSignIn>
  ) {
    logIn(payload);
    setSubmitting(false);
  }

  return { loginForm };
};

export default useSignIn;
