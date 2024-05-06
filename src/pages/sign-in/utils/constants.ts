import * as yup from 'yup';

export type UserSignIn = {
  email: string;
  password: string;
};

export const signInSchema = yup.object<UserSignIn>().shape({
  email: yup.string().email('Must a valid email').required('This field is mandatory'),
  password: yup.string().required('This field is mandatory'),
});

export const initialValues: UserSignIn = {
  email: '',
  password: '',
};
