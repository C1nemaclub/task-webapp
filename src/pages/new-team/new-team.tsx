import { Box, Grid } from '@mui/material';
import CustomButton from '../../components/shared/CustomButton';
import InputField from '../../components/shared/input-field';
import Section from '../../components/shared/section';
import useNewTeam from './use-new-team';

const NewTeam = () => {
  const { newTeamForm } = useNewTeam();

  return (
    <Section title='Create Team'>
      <Box component='form' onSubmit={newTeamForm.handleSubmit}>
        <Grid container columns={12} spacing={2}>
          <Grid item xs={6}>
            <InputField
              form={newTeamForm}
              name='teamName'
              label='Team name'
              autoComplete='false'
              size='small'
            />
          </Grid>
          <Grid item xs={12}>
            <CustomButton
              variant='contained'
              type='submit'
              disabled={newTeamForm.isSubmitting || !newTeamForm.isValid}>
              Create team
            </CustomButton>
          </Grid>
        </Grid>
      </Box>
    </Section>
  );
};

export default NewTeam;
