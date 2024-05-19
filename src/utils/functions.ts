import { format } from 'date-fns';
import { GithubMeta, GoogleMeta, ProviderMeta, TUser } from '../core/types/roles.model';

const validFileExtensions = { image: ['jpg', 'gif', 'png', 'jpeg', 'svg', 'webp'] };

export const isValidFileType = (
  fileName: string,
  fileType: keyof typeof validFileExtensions
) => {
  if (fileName) {
    return validFileExtensions[fileType].indexOf(String(fileName.split('.').pop())) > -1;
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
