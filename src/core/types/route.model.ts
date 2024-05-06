import { Role } from './roles.model';

export type BasicRoute = {
  role: Role;
  element: JSX.Element;
  redirect: string;
  path: string;
};
