import {
  Navigate,
  Route,
  BrowserRouter as Router,
  Routes,
  useRoutes,
} from 'react-router-dom';
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
import NewTask from './pages/new-task/new-task.tsx';
import EditTask from './pages/edit-task/edit-task.tsx';
import Profile from './pages/profile/Profile.tsx';
import { AuthProvider } from './context/auth/auth-context.tsx';
import { ToastProvider } from './context/toast-context.tsx';
import Settings from './pages/settings/settings.tsx';

function App() {
  return (
    <>
      {/* <Router> */}
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
              <Route path='profile' element={<Profile />} />
              <Route path='dashboard' element={<Dashboard />} />
              <Route path='tasks' element={<h2>Tasks</h2>} />
              <Route path='teams' element={<Teams />} />
              <Route path='teams/new-team' element={<NewTeam />} />
              <Route path='settings' element={<Settings />} />
              <Route path='new-task' element={<NewTask />} />
              <Route path='edit-task/:id' element={<EditTask />} />
            </Route>
          </Routes>
        </AuthProvider>
      </ToastProvider>
    </>
  );
}

export default App;
