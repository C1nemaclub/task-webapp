export interface GithubMeta {
  id: string;
  name: string;
  username: string;
  email: string;
  avatarUrl: string;
  accessToken: string;
  refreshToken: string;
  expiry: string;
  rawUser: GithubRawUser;
  isNew: boolean;
}

export interface GoogleMeta {
  id: string;
  name: string;
  username: string;
  email: string;
  avatarUrl: string;
  accessToken: string;
  refreshToken: string;
  expiry: string;
  rawUser: GoogleRawUser;
  isNew: boolean;
}

export interface GithubRawUser {
  avatar_url: string;
  bio: string;
  blog: string;
  collaborators: number;
  company?: null;
  created_at: string;
  disk_usage: number;
  email?: null;
  events_url: string;
  followers: number;
  followers_url: string;
  following: number;
  following_url: string;
  gists_url: string;
  gravatar_id: string;
  hireable?: null;
  html_url: string;
  id: number;
  location: string;
  login: string;
  name: string;
  node_id: string;
  organizations_url: string;
  owned_private_repos: number;
  plan: Plan;
  private_gists: number;
  public_gists: number;
  public_repos: number;
  received_events_url: string;
  repos_url: string;
  site_admin: boolean;
  starred_url: string;
  subscriptions_url: string;
  total_private_repos: number;
  twitter_username?: null;
  two_factor_authentication: boolean;
  type: string;
  updated_at: string;
  url: string;
}
export interface Plan {
  collaborators: number;
  name: string;
  private_repos: number;
  space: number;
}

export interface GoogleRawUser {
  email: string;
  family_name: string;
  given_name: string;
  id: string;
  locale: string;
  name: string;
  picture: string;
  verified_email: boolean;
}

// export type TUser = {
//   id: string;
//   username: string;
//   avatar: string;
//   name: string;
//   emailVisibility: boolean;
//   created: string;
//   updated: string;
//   email: string;
//   collectionId: string;
//   collectionName: string;
//   verified: boolean;
//   teamId: Array<Team['id']>;
//   roleId: string[];
// };

export type TUser = {
  id: string;
  username: string;
  avatar: string;
  name: string;
  emailVisibility: boolean;
  created: string;
  updated: string;
  email: string;
  collectionId: string;
  collectionName: string;
  verified: boolean;
  teamId: Array<Team['id']>;
  roleId: string[];
  expand: {
    teamId: Team[];
    roleId: Role[];
  };
};

export type Task = {
  id: string;
  dueDate: string;
  title: string;
  description: string;
  updated: string;
  created: string;
  columnId: Column['id'];
  asignee: TUser['id'];
  createdBy: TUser['id'];
  type: TaskType['id'];
  expand: {
    asignee: TUser;
    type: TaskType;
  };
};

export type TaskType = {
  id: string;
  name: string;
  description: string;
  color: string;
  updated: string;
  created: string;
};

export type Team = {
  id: string;
  name: string;
  updated: string;
  created: string;
};

export type Board = {
  id: string;
  name: string;
  teamId: Team['id'];
  updated: string;
  created: string;
};

export type Column = {
  id: string;
  name: string;
  boardId: Board['id'];
  updated: string;
  created: string;
};

export type ProviderMeta = GithubMeta | GoogleMeta;

export type OAuthResponse = {
  meta: ProviderMeta;
  record: TUser;
  token: string;
};

export type RoleName = 'ADMIN' | 'USER';

export type Role = {
  id: string;
  title: RoleName;
};

export const ROLES: { [key in RoleName]: string } = {
  ADMIN: '7bm4gb04xgfn4b8',
  USER: 'h8q0ffpkng5aobv',
};
