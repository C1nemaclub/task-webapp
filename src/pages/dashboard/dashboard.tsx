import { Box, Chip, Link, Paper, Typography } from '@mui/material';
import { useContext, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link as RouterLink } from 'react-router-dom';
import { AuthContext } from '../../context/auth/auth-context';
import { AppDispatch, RootState } from '../../store/store';
import { IMAGE_BASE_URL } from '../../utils/constants';
import { useLocalStorage } from '@uidotdev/usehooks';
import SelectTeamCard from './components/select-team-card';
import { Team } from '../../core/types/roles.model';
import { getTasks } from '../../core/features/tasks/taskSlicer';
import TaskCard from './components/task-card';

const Dashboard = () => {
  const { user } = useContext(AuthContext);
  const dispatch = useDispatch<AppDispatch>();
  const tasks = useSelector((state: RootState) => state.tasks.tasks);
  const [teamIndex, setTeamIndex] = useLocalStorage('defaultTeam', 0);

  useEffect(() => {
    dispatch(getTasks());
  }, [dispatch]);

  const avatarSrc = `${IMAGE_BASE_URL}${user?.id}/${user?.avatar}`;
  console.log(user, 'HERE');
  const userTeams = user?.expand.teamId as Team[];
  const userHasTeam = user?.teamId && user.teamId.length > 0;
  const hasTeamSelected = teamIndex !== 0;

  return (
    <Box
      width='100%'
      sx={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        gap: '1rem',
        padding: '1rem',
      }}>
      <Typography variant='h5'>Dashboard</Typography>
      <div>
        {userHasTeam && !hasTeamSelected && (
          <SelectTeamCard teams={userTeams} selectTeam={setTeamIndex} />
        )}

        {!userHasTeam && (
          <Paper
            elevation={3}
            sx={{
              padding: '2rem',
              display: 'flex',
              flexDirection: 'column',
              gap: '.5rem',
              justifyContent: 'center',
              alignItems: 'center',
              marginTop: '4rem',
              maxWidth: '600px',
              marginX: 'auto',
            }}>
            <Typography paragraph textAlign='center' m={0}>
              You don't belong to a team yet
              <Link component={RouterLink} to='/overview/teams/new-team' ml={2}>
                Create one here
              </Link>
            </Typography>
          </Paper>
        )}

        {userHasTeam && hasTeamSelected && (
          <>
            <Chip label={userTeams[teamIndex - 1].name} color='secondary' />
            <h1>{user?.email}</h1>
            <img src={avatarSrc} width='400px' />
            {tasks.map((task) => {
              return <TaskCard key={task.id} task={task} />;
            })}
          </>
        )}
      </div>
    </Box>
  );
};

export default Dashboard;
