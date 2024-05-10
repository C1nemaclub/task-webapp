import React, { createContext, useContext, useEffect, useState } from 'react';
import { TUser } from '../../core/types/roles.model';
import pb from '../../libs/pocketbase';
import { UserSignUp } from '../../pages/sign-up/utils/constants';
import { UserSignIn } from '../../pages/sign-in/utils/constants';
import { ToastContext } from '../../context/toast-context.tsx';
import { messages } from '../../utils/constants.ts';
import { PasswordReset } from '../../pages/password-confirm-reset/use-password-confirm-reset.tsx';
import { useNavigate } from 'react-router-dom';

type AuthContextType = {
  user: TUser | null;
  loading: boolean;
  logOut: () => void;
  logIn: (data: UserSignIn) => void;
  register: (data: UserSignUp) => void;
  forgotPassword: (email: string) => void;
  resetPassword: (data: PasswordReset, token: string) => void;
  getUser: () => void;
};

const AuthContext = createContext<AuthContextType>({} as AuthContextType);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const userFromStorage = pb.authStore.model as TUser;
  const [user, setUser] = useState<TUser | null>(userFromStorage || null);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const toast = useContext(ToastContext);

  const logOut = async () => {
    console.log('Logging out...');
    pb.authStore.clear();
    setUser(null);
  };

  const logIn = async (data: UserSignIn) => {
    try {
      setLoading(true);
      await pb.collection('users').authWithPassword(data.email, data.password);
      const user = pb.authStore.model as TUser;
      setUser(user);
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
        message: 'Password succesfully reseted, please sign in',
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
    // const user = pb.authStore.model as TUser;
    // const roles = await pb.collection('users').getOne(user.id, { expand: 'roleId' });
    // console.log(roles);
    try {
      pb.authStore.isValid && (await pb.collection('users').authRefresh());
      setUser(pb.authStore.model as TUser);
    } catch (e) {
      console.log(e);
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
      }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => useContext(AuthContext);
