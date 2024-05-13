import { useContext, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AuthContext } from '../../context/auth/auth-context';
import { getTasks } from '../../core/features/tasks/taskSlicer';
import { AppDispatch, RootState } from '../../store/store';
import { IMAGE_BASE_URL } from '../../utils/constants';

const Dashboard = () => {
  const { logOut, user } = useContext(AuthContext);
  const dispatch = useDispatch<AppDispatch>();
  const tasks = useSelector((state: RootState) => state.tasks.tasks);
  console.log(tasks);

  useEffect(() => {
    dispatch(getTasks());
  }, [dispatch]);

  const avatarSrc = `${IMAGE_BASE_URL}${user?.id}/${user?.avatar}`;

  return (
    <div>
      <div>
        <h2>Dashboard </h2>
        <h1>{user?.email}</h1>
        <button onClick={logOut}>Logout</button>
        <img src={avatarSrc} width='400px' />
      </div>
    </div>
  );
};

export default Dashboard;
