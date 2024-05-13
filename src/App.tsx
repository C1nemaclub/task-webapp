import { Navigate, Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import AuthLayout from './components/shared/auth-layout.tsx';
import Toast from './components/shared/toast.tsx';
import UserLayout from './components/shared/user-layout.tsx';
import Dashboard from './pages/dashboard/dashboard';
import SignIn from './pages/sign-in/sign-in.tsx';
import ForgotPassword from './pages/forgot-password/forgot-password.tsx';
import PasswordConfirmReset from './pages/password-confirm-reset/password-confirm-reset.tsx';
import SignUp from './pages/sign-up/sign-up.tsx';
import Teams from './pages/teams/teams.tsx';
import NewTeam from './pages/new-team/new-team.tsx';
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
              <Route index element={<Navigate to='/auth/sign-in' />} />
              <Route path='/auth' element={<AuthLayout />}>
                <Route path='sign-in' element={<SignIn />} />
                <Route path='sign-up' element={<SignUp />} />
                <Route path='forgot-password' element={<ForgotPassword />} />
                <Route
                  path='confirm-password-reset/:token'
                  element={<PasswordConfirmReset />}
                />
              </Route>
              <Route path='/overview' element={<UserLayout />}>
                <Route index element={<Navigate to='/overview/dashboard' />} />
                <Route path='dashboard' element={<Dashboard />} />
                <Route path='tasks' element={<h2>Tasks</h2>} />
                <Route path='teams' element={<Teams />} />
                <Route path='teams/new-team' element={<NewTeam />} />
                <Route path='settings' element={<h2>Settings</h2>} />
              </Route>
            </Routes>
          </AuthProvider>
        </ToastProvider>
      </Router>
    </>
  );
}

export default App;
