import { Box, Grid, Stack, Typography } from '@mui/material';
import CustomButton from '../../components/shared/CustomButton';
import InputField from '../../components/shared/input-field';
import useNewTeam from './use-new-team';

const NewTeam = () => {
  const { newTeamForm } = useNewTeam();

  return (
    <Stack maxWidth={450}>
      <Typography component='h2' variant='h5' textAlign='center' mb={2}>
        New Team
      </Typography>
      <Typography component='p' textAlign='center' mb={4}>
        Create a new Team
      </Typography>
      <Box component='form' onSubmit={newTeamForm.handleSubmit}>
        <Grid container columns={12} spacing={2}>
          <Grid item xs={12}>
            <InputField
              form={newTeamForm}
              name='teamName'
              label='Team name'
              autoComplete='false'
            />
          </Grid>

          <Grid item xs={12} mt={2}>
            <CustomButton
              variant='contained'
              fullWidth
              type='submit'
              disabled={newTeamForm.isSubmitting}>
              Create team
            </CustomButton>
          </Grid>
        </Grid>
      </Box>
    </Stack>
  );
};

export default NewTeam;
