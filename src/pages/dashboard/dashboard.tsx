import { Box, Button, Link, Paper, Stack, Typography } from '@mui/material';
import { useLocalStorage } from '@uidotdev/usehooks';
import { useContext, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link as RouterLink } from 'react-router-dom';
import Section from '../../components/shared/section';
import { AuthContext } from '../../context/auth/auth-context';
import { getTeamBoards } from '../../core/features/teams/teamSlicer';
import { Column, Team } from '../../core/types/roles.model';
import pb from '../../libs/pocketbase';
import { AppDispatch, RootState } from '../../store/store';
import { IMAGE_BASE_URL } from '../../utils/constants';
import SelectTeamCard from './components/select-team-card';
import TaskColumn from './components/task-column';
import AddIcon from '@mui/icons-material/Add';

const Dashboard = () => {
  const { user } = useContext(AuthContext);
  const dispatch = useDispatch<AppDispatch>();
  const [activeTeam, setActiveTeam] = useLocalStorage('defaultTeam', '');
  const teamState = useSelector((state: RootState) => state.teams);
  const columnState = useSelector((state: RootState) => state.columns);
  const [activeBoard, setActiveBoard] = useState('');
  const [cols, setCols] = useState<any[]>([]);

  useEffect(() => {
    const getBoardData = async () => {
      const res = await pb.collection('ColumnsAndTasks').getFullList<Column>({
        filter: `boardId="${activeBoard}"`,
        expand: 'tasks',
      });
      setCols(res);
    };
    dispatch(getTeamBoards(activeTeam));
    getBoardData();
  }, [dispatch, activeTeam, activeBoard]);

  useEffect(() => {
    setCols(columnState.columns);
  }, [columnState.columns]);

  const avatarSrc = `${IMAGE_BASE_URL}${user?.id}/${user?.avatar}`;

  const userTeams = user?.expand.teamId as Team[];

  const userHasTeam = userTeams && userTeams.length > 0;
  const hasTeamSelected = activeTeam !== '';

  // const currentTeam =
  //   userTeams && userTeams.find((team) => team.id === activeTeam);

  useEffect(() => {
    if (teamState.boards.length > 0) {
      setActiveBoard(teamState.boards[0].id);
    }
  }, [teamState.boards]);

  if (teamState.loading) {
    return <Typography>Loading...</Typography>;
  }

  return (
    <Section
      title='Dashboard'
      sx={{
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        gap: '1rem',
        padding: '1rem',
      }}>
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
            <Stack direction='column' spacing={1} alignItems='start'>
              <Link to='/overview/new-task' component={RouterLink} ml='auto'>
                <Button
                  startIcon={<AddIcon />}
                  sx={{ ml: 'auto' }}
                  size='small'>
                  Add Task
                </Button>
              </Link>
              <Stack
                gap={2}
                justifyContent={{ xs: 'center', md: 'space-between' }}
                alignItems={{ xs: 'center', md: 'flex-start' }}
                direction={{ xs: 'column', md: 'row' }}>
                {cols.length > 0 &&
                  cols.map((column) => {
                    return (
                      <TaskColumn
                        id={column.id}
                        column={column.name}
                        tasks={column.tasks}
                        key={column.id}
                      />
                    );
                  })}
              </Stack>
            </Stack>
          </>
        )}
        <img src={avatarSrc} width='400px' />
      </Box>
    </Section>
  );
};

export default Dashboard;
