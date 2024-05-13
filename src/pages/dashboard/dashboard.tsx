import { Typography } from '@mui/material';
import { useContext, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../context/auth/auth-context';
import { getTeams } from '../../core/features/teams/teamSlicer';
import { AppDispatch, RootState } from '../../store/store';
import { IMAGE_BASE_URL } from '../../utils/constants';

const Dashboard = () => {
  const { logOut, user } = useContext(AuthContext);
  const dispatch = useDispatch<AppDispatch>();
  const tasks = useSelector((state: RootState) => state.teams.teams);
  console.log(tasks);

  useEffect(() => {
    dispatch(getTeams());
  }, [dispatch]);

  const avatarSrc = `${IMAGE_BASE_URL}${user?.id}/${user?.avatar}`;
  console.log(user?.teamId);

  return (
    <div>
      <div>
        {user?.teamId && user.teamId.length > 0 ? (
          <h1>Welcome</h1>
        ) : (
          <>
            <Typography>
              You dont belong to a team yet
              <Link to='/overview/teams/new-team'>Create one Here</Link>
            </Typography>
          </>
        )}
        <h2>Dashboard</h2>
        <h1>{user?.email}</h1>
        <button onClick={logOut}>Logout</button>
        <img src={avatarSrc} width='400px' />
      </div>
    </div>
  );
};

export default Dashboard;
