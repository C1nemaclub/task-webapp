import { useFormik } from 'formik';
import { useContext } from 'react';
import { AuthContext } from '../../context/auth/auth-context';
import { initialValues, signUpSchema, UserSignUp } from './utils/constants';

const useSignUp = () => {
  const { register } = useContext(AuthContext);

  const registerForm = useFormik({
    initialValues: initialValues,
    validationSchema: signUpSchema,
    onSubmit: handleSubmit,
  });

  async function handleSubmit(payload: UserSignUp) {
    register(payload);
  }

  return { registerForm };
};

export default useSignUp;
