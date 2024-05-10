import { Link } from 'react-router-dom';
import { useAuthContext } from '../../context/auth/auth-context';

const Dashboard = () => {
  const { logOut, user } = useAuthContext();
  console.log(user, 'Dashboard');

  const avatarSrc = `http://127.0.0.1:8090/api/files/_pb_users_auth_/${user?.id}/${user?.avatar}`;

  return (
    <div>
      <h2>Dashboard </h2>
      <h1>{user?.email}</h1>
      <button onClick={logOut}>Logout</button>
      <img src={avatarSrc} width='400px' />
      <Link to='tasks'>Tasks</Link>
      <h1>Her</h1>
    </div>
  );
};

export default Dashboard;
