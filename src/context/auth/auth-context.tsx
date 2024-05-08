import React, { createContext, useContext, useState } from 'react';
import { TUser } from '../../core/types/roles.model';
import pb from '../../libs/pocketbase';
import { UserSignUp } from '../../pages/sign-up/utils/constants';
import { UserSignIn } from '../../pages/sign-in/utils/constants';
import { ToastContext } from '../../context/toast-context.tsx';
import { messages } from '../../utils/constants.ts';

type AuthContextType = {
  user: TUser | null;
  logOut: () => void;
  logIn: (data: UserSignIn) => void;
  register: (data: UserSignUp) => void;
  forgotPassword: (email: string) => void;
};

const AuthContext = createContext<AuthContextType>({} as AuthContextType);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const userFromStorage = pb.authStore.model as TUser;
  const [user, setUser] = useState<TUser | null>(userFromStorage || null);
  const toast = useContext(ToastContext);

  const logOut = async () => {
    console.log('Logging out...');
    pb.authStore.clear();
    setUser(null);
  };

  const logIn = async (data: UserSignIn) => {
    try {
      console.log('Logging in...');
      await pb.collection('users').authWithPassword(data.email, data.password);
      const user = pb.authStore.model as TUser;
      console.log('Logged in as: ', user);
      setUser(user);
    } catch (e) {
      console.log(e, '📷');
      toast.openToast({
        severity: 'error',
        message: messages.login.error,
      });
    }
  };

  const register = async (data: UserSignUp) => {
    try {
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
      const response = await pb.collection('users').create(payload);
      console.log(response);
      logIn({ email: data.email, password: data.password });
    } catch (e) {
      console.log(e, '📷');
      toast.openToast({
        severity: 'error',
        message: messages.register.error,
      });
    }
  };

  const forgotPassword = async (email: string) => {
    const response = await pb.collection('users').requestPasswordReset(email);
    console.log(response);
  };

  return (
    <AuthContext.Provider value={{ user, logOut, logIn, register, forgotPassword }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => useContext(AuthContext);
