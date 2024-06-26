import { format } from 'date-fns';
import { GithubMeta, GoogleMeta, ProviderMeta } from '../core/types/roles.model';

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
