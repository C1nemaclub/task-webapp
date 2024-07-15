import AddIcon from '@mui/icons-material/Add';
import {
  Button,
  Link,
  Stack,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
} from '@mui/material';
import { useFormik } from 'formik';
import { useContext, useEffect, useState } from 'react';
import { Navigate, Link as RouterLink } from 'react-router-dom';
import Section from '../../components/shared/section';
import { AuthContext } from '../../context/auth/auth-context';
import { TUser } from '../../core/types/roles.model';
import pb from '../../libs/pocketbase';
import { initialValues, validationSchema } from './utils/constants';
import { ActiveTeamForm } from './utils/types';

const Teams = () => {
  const { user } = useContext(AuthContext);
  const [initialValuesForm, setInitialValuesForm] = useState(initialValues);

  const handleSubmit = async (payload: ActiveTeamForm) => {
    console.log(payload);
    // export const updateColumn = async (columnName: string, columnId: string) => {
    //   return await pb.collection('columns').update<Column>(columnId, {
    //     name: columnName,
    //   });
    // };
    const res = await pb.collection('users').update<TUser>(String(user?.id), {
      activeTeam: payload.activeTeam,
    });
    console.log(res);
  };

  const form = useFormik<ActiveTeamForm>({
    enableReinitialize: true,
    initialValues: initialValuesForm,
    validationSchema: validationSchema,
    onSubmit: handleSubmit,
  });

  useEffect(() => {
    if (user) {
      setInitialValuesForm({
        activeTeam: user.activeTeam,
      });
    }
  }, [user]);

  if (!user) {
    return <Navigate to='/auth/sign-in' />;
  }

  const didChange = form.values.activeTeam === form.initialValues.activeTeam;

  return (
    <Section
      title='Teams'
      sx={{
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        gap: '1rem',
      }}>
      <Link to='/overview/teams/new-team' component={RouterLink} ml='auto'>
        <Button startIcon={<AddIcon />} sx={{ ml: 'auto' }} size='small'>
          New Team
        </Button>
      </Link>
      <Typography variant='h5' mb={2} mt={2}>
        Current Teams
      </Typography>
      <Stack
        component='form'
        onSubmit={form.handleSubmit}
        gap={2}
        alignItems='start'>
        <ToggleButtonGroup
          onChange={(_, value) => form.setFieldValue('activeTeam', value)}
          value={form.values.activeTeam}
          exclusive
          color='primary'>
          {user.expand.teamId.map((team) => {
            return (
              <ToggleButton key={team.id} value={team.id}>
                {team.name}
              </ToggleButton>
            );
          })}
        </ToggleButtonGroup>
        <Button type='submit' disabled={!form.isValid || didChange}>
          Update
        </Button>
      </Stack>
    </Section>
  );
};

export default Teams;
