import { Task } from '../core/types/roles.model';

export const messages = {
  login: {
    error:
      'Invalid login credentials. Please check your email and password and try again.',
  },
  register: {
    error:
      'Sorry, we couldn`t process your registration. Double-check your details and try again.',
  },
};

export const IMAGE_BASE_URL = `${import.meta.env.VITE_API_URL}api/files/_pb_users_auth_/`;

export const columnMapper = {
  Backlog: 'backlog',
  Completed: 'completed',
  'In Progress': 'inProgress',
} as const;

export type ColumnMapperKeys = keyof typeof columnMapper;

export type ColumnKey = { [key in ColumnMapperKeys]: Array<Task> };
