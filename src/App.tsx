import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import './App.css';
import AuthLayout from './components/shared/auth-layout';
import UserLayout from './components/shared/user-layout';
import Dashboard from './pages/dashboard/dashboard';
import SignIn from './pages/sign-in/sign-in';
import SignUp from './pages/sign-up/sign-up';
import Toast from './components/shared/toast.tsx';

function App() {
  return (
    <>
      <Toast />
      <Router>
        <Routes>
          <Route path='/' element={<AuthLayout />}>
            <Route path='sign-in' element={<SignIn />} />
            <Route path='sign-up' element={<SignUp />} />
          </Route>
          <Route path='/dashboard' element={<UserLayout />}>
            <Route index element={<Dashboard />} />
            <Route path='tasks' element={<h2>Tasks</h2>} />
          </Route>
        </Routes>
      </Router>
    </>
  );
}

export default App;
