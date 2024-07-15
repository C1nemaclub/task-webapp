import { format } from 'date-fns';
import {
  GithubMeta,
  GoogleMeta,
  ProviderMeta,
  TUser,
} from '../core/types/roles.model';
import { IMAGE_BASE_URL } from './constants';
import { FormikProps } from 'formik';

const validFileExtensions = {
  image: ['jpg', 'gif', 'png', 'jpeg', 'svg', 'webp'],
};

export const isValidFileType = (
  fileName: string,
  fileType: keyof typeof validFileExtensions
) => {
  if (fileName) {
    return (
      validFileExtensions[fileType].indexOf(String(fileName.split('.').pop())) >
      -1
    );
  }
  return false;
};

export const isGithubUser = (user: ProviderMeta): user is GithubMeta => {
  return (user as GithubMeta).rawUser.followers !== undefined;
};

export const isGoogleUser = (user: ProviderMeta): user is GoogleMeta => {
  return (user as GoogleMeta).rawUser.locale !== undefined;
};

export const formatDate = (date: string) => {
  return format(new Date(date), 'dd/MM/yyyy');
};

export const dateToWhen = (date: string) => {
  const now = new Date();
  const dueDate = new Date(date);
  const diff = dueDate.getTime() - now.getTime();
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  if (days < 0) {
    return 'Overdue';
  }
  if (days === 0) {
    return 'Today';
  }
  if (days === 1) {
    return 'Tomorrow';
  }
  return formatDate(date);
};

export const isUserValid = (user: TUser) => {
  if (typeof user.expand === 'undefined') {
    return false;
  }
  return true;
};

export const getUserAvatar = (user: TUser) => {
  const avatarSrc = `${IMAGE_BASE_URL}${user.id}/${user.avatar}`;
  return avatarSrc;
};

export const formatName = (name: string) => {
  return name.charAt(0).toUpperCase() + name.slice(1);
};

export const getFieldError = (form: FormikProps<any>, fieldName: string) => {
  const isError = Boolean(form.errors[fieldName] && form.touched[fieldName]);
  const message = isError ? (form.errors[fieldName] as string) : '';
  return { error: isError, helperText: message };
};
