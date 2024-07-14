import {
  Button,
  Stack,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
} from '@mui/material';
import { useFormik } from 'formik';
import { useContext, useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import Section from '../../components/shared/section';
import { AuthContext } from '../../context/auth/auth-context';
import { initialValues, validationSchema } from './utils/constants';
import { ActiveTeamForm } from './utils/types';
import pb from '../../libs/pocketbase';
import { TUser } from '../../core/types/roles.model';

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
    <div>
      <Section title='Teams'>
        <Typography variant='h5' mb={2}>
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
    </div>
  );
};

export default Teams;
