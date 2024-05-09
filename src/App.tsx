import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import AuthLayout from './components/shared/auth-layout';
import Toast from './components/shared/toast.tsx';
import UserLayout from './components/shared/user-layout';
import Dashboard from './pages/dashboard/dashboard';
import SignIn from './pages/sign-in/sign-in';
import ForgotPassword from './pages/forgot-password/forgot-password';
import PasswordConfirmReset from './pages/password-confirm-reset/password-confirm-reset';
import SignUp from './pages/sign-up/sign-up';
import { AuthProvider } from './context/auth/auth-context.tsx';
import { ToastProvider } from './context/toast-context.tsx';

function App() {
  return (
    <>
      <Router>
        <ToastProvider>
          <Toast />
          <AuthProvider>
            <Routes>
              <Route path='/auth' element={<AuthLayout />}>
                <Route path='sign-in' element={<SignIn />} />
                <Route path='sign-up' element={<SignUp />} />
                <Route path='forgot-password' element={<ForgotPassword />} />
                <Route
                  path='confirm-password-reset/:token'
                  element={<PasswordConfirmReset />}
                />
              </Route>
              <Route path='/dashboard' element={<UserLayout />}>
                <Route index element={<Dashboard />} />
                <Route path='tasks' element={<h2>Tasks</h2>} />
              </Route>
            </Routes>
          </AuthProvider>
        </ToastProvider>
      </Router>
    </>
  );
}

export default App;
