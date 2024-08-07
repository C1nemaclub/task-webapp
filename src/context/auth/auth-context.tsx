import React, { createContext, useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ToastContext } from '../../context/toast-context.tsx';
import { OAuthResponse, TUser } from '../../core/types/roles.model';
import pb from '../../libs/pocketbase';
import { PasswordReset } from '../../pages/password-confirm-reset/use-password-confirm-reset.tsx';
import { UserSignIn } from '../../pages/sign-in/utils/constants';
import { UserSignUp } from '../../pages/sign-up/utils/constants';
import { messages } from '../../utils/constants.ts';
import { ROLES } from '../../core/types/roles.model';
import { useLocalStorage } from '@uidotdev/usehooks';

type AuthContextType = {
  user: TUser | null;
  loading: boolean;
  logOut: () => void;
  logIn: (data: UserSignIn) => void;
  register: (data: UserSignUp) => void;
  forgotPassword: (email: string) => void;
  resetPassword: (data: PasswordReset, token: string) => void;
  getUser: () => void;
  authWithProvider: (provider: string) => void;
  setUser: React.Dispatch<React.SetStateAction<TUser | null>>;
};

export const AuthContext = createContext<AuthContextType>(
  {} as AuthContextType
);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [, setActiveTeam] = useLocalStorage('defaultTeam', '');
  const [user, setUser] = useState<TUser | null>(null);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const toast = useContext(ToastContext);

  const logOut = async () => {
    console.log('Logging out...');
    pb.authStore.clear();
    setActiveTeam('');
    setUser(null);
  };

  const logIn = async (data: UserSignIn) => {
    try {
      setLoading(true);
      await pb.collection('users').authWithPassword(data.email, data.password, {
        expand: 'teamId,roleId,activeTeam',
      });
      const user = pb.authStore.model as TUser;
      setUser(user);
      toast.openToast({
        severity: 'success',
        message: 'You have successfully logged in! 🎉',
      });
      navigate('/overview/dashboard');
    } catch (e) {
      console.log(e, '📷');
      toast.openToast({
        severity: 'error',
        message: messages.login.error,
      });
    } finally {
      setLoading(false);
    }
  };

  const authWithProvider = async (provider: string) => {
    try {
      setLoading(true);
      const authData = (await pb.collection('users').authWithOAuth2({
        provider,
        query: { expand: 'teamId,roleId' },
      })) as OAuthResponse;
      console.log(authData);
      setUser(authData.record);
    } catch (e) {
      console.log(e, '📷');
      toast.openToast({
        severity: 'error',
        message: messages.register.error,
      });
    } finally {
      setLoading(false);
    }
  };

  const register = async (data: UserSignUp) => {
    try {
      setLoading(true);
      const payload = new FormData();
      payload.append('username', String(data.username));
      payload.append('email', data.email);
      payload.append('emailVisibility', 'true');
      payload.append('password', data.password);
      payload.append('passwordConfirm', data.passwordConfirmation);
      payload.append('name', data.name);
      payload.append('roleId', ROLES.USER);
      if (data.avatar) {
        payload.append('avatar', data.avatar);
      }
      await pb.collection('users').create(payload);
      logIn({ email: data.email, password: data.password });
    } catch (e) {
      console.log(e, '📷');
      toast.openToast({
        severity: 'error',
        message: messages.register.error,
      });
    } finally {
      setLoading(false);
    }
  };

  const forgotPassword = async (email: string) => {
    const response = await pb.collection('users').requestPasswordReset(email);
    console.log(response);
  };

  const resetPassword = async (data: PasswordReset, token: string) => {
    try {
      setLoading(true);
      const oldAuth = pb.authStore.model as TUser;
      await pb
        .collection('users')
        .confirmPasswordReset(token, data.password, data.passwordConfirmation);
      toast.openToast({
        severity: 'success',
        message: 'Password successfully reset, please sign in',
      });
      setTimeout(() => {
        if (!oldAuth) {
          navigate('/auth/sign-in');
        } else {
          logIn({
            email: oldAuth.email,
            password: data.password,
          });
        }
        setLoading(false);
      }, 3000);
      return;
    } catch (e) {
      console.log(e, '📷');
      toast.openToast({
        severity: 'error',
        message: messages.register.error,
      });
      setLoading(false);
    }
  };

  const getUser = async () => {
    try {
      setLoading(true);
      pb.authStore.isValid &&
        (await pb
          .collection('users')
          .authRefresh({ expand: 'teamId,roleId,activeTeam' }));
      setUser(pb.authStore.model as TUser);
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getUser();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        logOut,
        logIn,
        register,
        forgotPassword,
        resetPassword,
        loading,
        getUser,
        setUser,
        authWithProvider,
      }}>
      {children}
    </AuthContext.Provider>
  );
};
