import { Paper, Stack, Typography } from '@mui/material';
import { FC } from 'react';
import CustomButton from '../../../components/shared/CustomButton';
import { Team } from '../../../core/types/roles.model';

type SelectTeamCardProps = {
  teams: Team[];
  selectTeam: (teamIndex: string) => void;
};

const SelectTeamCard: FC<SelectTeamCardProps> = ({ teams, selectTeam }) => {
  return (
    <Paper
      sx={{
        padding: '2rem',
        display: 'flex',
        flexDirection: 'column',
        gap: '.5rem',
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <Typography variant='h5' textAlign='center'>
        Select Team
      </Typography>
      <Typography paragraph>
        You currently belong to the following teams, please select one to start
      </Typography>
      <Stack direction='row' spacing={2}>
        {teams.map((team) => (
          <CustomButton key={team.id} onClick={() => selectTeam(team.id)}>
            {team.name}
          </CustomButton>
        ))}
      </Stack>
    </Paper>
  );
};

export default SelectTeamCard;
