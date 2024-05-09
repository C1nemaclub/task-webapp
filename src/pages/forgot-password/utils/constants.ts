import * as yup from 'yup';

export type ForgotPasswordType = {
  email: string;
};

export const forgotPasswordSchema = yup.object<ForgotPasswordType>().shape({
  email: yup.string().email('Must be a valid email').required('This field is mandatory'),
});

export const initialValues: ForgotPasswordType = {
  email: '',
};
