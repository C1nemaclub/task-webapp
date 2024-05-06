import * as yup from 'yup';
import { isValidFileType } from '../../../utils/functions';

// .matches(
//     /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
//     "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and One Special Case Character"
//   ),

const MAX_FILE_SIZE = 1024 * 1024 * 5; //100KB

export type UserSignUp = {
  email: string;
  name: string;
  password: string;
  passwordConfirmation: string;
  username?: string;
  avatar?: File;
};

export const signUpSchema = yup.object().shape({
  email: yup.string().email('Must a valid email').required('This field is mandatory'),
  name: yup
    .string()
    .max(30)
    .min(2, 'Minimun 2 Characters')
    .required('This field is mandatory'),
  password: yup
    .string()
    .min(8, 'Minimun 8 Characters')
    .required('This field is mandatory'),
  passwordConfirmation: yup
    .string()
    .oneOf([yup.ref('password')], 'Passwords must match')
    .required('This field is mandatory'),
  username: yup.string().nullable().max(30).min(3),
  avatar: yup
    .mixed()
    .test('is-valid-type', 'Not a valid image type', (value) => {
      if (value instanceof File) {
        return isValidFileType(value && value.name.toLowerCase(), 'image');
      }
      return true;
    })
    .test('is-valid-size', 'Max allowed size is 5MB', (value) => {
      if (value instanceof File) {
        return value && value.size <= MAX_FILE_SIZE;
      }
      return true;
    })
    .nullable(),
});

export const initialValues: UserSignUp = {
  email: '',
  name: '',
  password: '',
  passwordConfirmation: '',
  username: '',
  // avatar: new File([''], 'placeholder.png'),
};
