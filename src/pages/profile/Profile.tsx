import {
  Avatar,
  Divider,
  List,
  ListItem,
  ListItemText,
  Stack,
  Switch,
  Typography,
} from '@mui/material';
import { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import Section from '../../components/shared/section';
import { AuthContext } from '../../context/auth/auth-context';
import { formatDate, formatName, getUserAvatar } from '../../utils/functions';

const Profile = () => {
  const { user } = useContext(AuthContext);
  console.log(user);

  if (!user) {
    return <Navigate to='/auth/sign-in' />;
  }

  return (
    <Section title='My Profile'>
      <Stack>
        <Avatar
          src={getUserAvatar(user)}
          sizes='large'
          sx={{
            mb: 2,
            width: 75,
            height: 75,
          }}
        />
        <Typography variant='h5'>Personal Information</Typography>
        <List disablePadding>
          <ListItem disablePadding>
            <ListItemText primary='Name' secondary={formatName(user.name)} />
          </ListItem>
          <ListItem disablePadding>
            <ListItemText primary='Email' secondary={formatName(user.email)} />
          </ListItem>
          <ListItem disablePadding>
            <ListItemText
              primary='Joined'
              secondary={formatDate(user.created)}
            />
          </ListItem>
        </List>
        <Divider sx={{ py: 1 }} />
        <Typography variant='h5'>Account Information</Typography>
        <List disablePadding>
          <ListItem disablePadding>
            <ListItemText
              primary='Verified'
              secondary={<Switch checked={user.verified} disabled />}
            />
          </ListItem>
        </List>
      </Stack>
    </Section>
  );
};

export default Profile;
