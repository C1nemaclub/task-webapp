import { Box, Chip, Link, Paper, Stack, Typography } from '@mui/material';
import { useLocalStorage } from '@uidotdev/usehooks';
import { useContext, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link as RouterLink } from 'react-router-dom';
import { AuthContext } from '../../context/auth/auth-context';
import { getTasks, getTasksByTeamId } from '../../core/features/tasks/taskSlicer';
import { Task, Team } from '../../core/types/roles.model';
import pb from '../../libs/pocketbase';
import { AppDispatch, RootState } from '../../store/store';
import { IMAGE_BASE_URL } from '../../utils/constants';
import SelectTeamCard from './components/select-team-card';
import TaskColumn from './components/task-column';
import { GroupedTasks } from './utils/constants';
import { TeamState } from '../../core/features/teams/teamSlicer';

const Dashboard = () => {
  const { user } = useContext(AuthContext);
  const dispatch = useDispatch<AppDispatch>();
  const taskState = useSelector((state: RootState) => state.tasks);
  const [loadingTeams, setLoadingTeams] = useState(true);

  const [activeTeam, setActiveTeam] = useLocalStorage('defaultTeam', '');
  const [myTeams, setMyTeams] = useState<Team[]>([]);

  const { teamTasks } = taskState;

  useEffect(() => {
    dispatch(getTasks());
    (async () => {
      setLoadingTeams(true);
      const teamsFilterQuery = user?.teamId.map((id) => `id="${id}"`).join('||');
      const teamsResponse = await pb.collection('teams').getFullList<Team>({
        filter: teamsFilterQuery,
      });
      setMyTeams(teamsResponse);
      setLoadingTeams(false);
    })();
  }, [dispatch, user]);

  useEffect(() => {
    dispatch(getTasksByTeamId(activeTeam));
  }, [activeTeam, dispatch]);

  const avatarSrc = `${IMAGE_BASE_URL}${user?.id}/${user?.avatar}`;
  const userTeams = user?.expand.teamId as Team[];
  // const userHasTeam = user?.teamId && user.teamId.length > 0;
  const userHasTeam = myTeams.length > 0;
  const hasTeamSelected = activeTeam !== '';

  const currentTeam = userTeams.find((team) => team.id === activeTeam);
  // console.log(teamTasks);

  console.log(teamTasks);
  const groupedTasks = teamTasks.reduce((acc, current) => {
    const columnName = current.expand.column.name;
    if (!acc[columnName]) {
      acc[columnName] = [];
    }
    acc[columnName].push(current);
    return acc;
  }, {} as GroupedTasks);

  if (loadingTeams) return <Typography variant='h1'>Loading...</Typography>;

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
      <Box>
        {userHasTeam && !hasTeamSelected && (
          <SelectTeamCard teams={userTeams} selectTeam={setActiveTeam} />
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
            <Chip label={currentTeam && currentTeam.name} color='secondary' />
            <Stack
              spacing={2}
              mt={3}
              justifyContent={{ xs: 'center', md: 'space-between' }}
              alignItems={{ xs: 'center', md: 'flex-start' }}
              direction={{ xs: 'column', md: 'row' }}>
              {Object.entries(groupedTasks).map((group) => {
                const [column, tasks] = group as [string, Task[]];
                return <TaskColumn column={column} tasks={tasks} key={column} />;
              })}
            </Stack>
          </>
        )}
        <img src={avatarSrc} width='400px' />
      </Box>
    </Box>
  );
};

export default Dashboard;
