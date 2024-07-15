import {
  Avatar,
  IconButton,
  Link,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  MenuList,
  Stack,
  Typography,
} from '@mui/material';
import React, { useContext } from 'react';
import { AuthContext } from '../../context/auth/auth-context';
import { getUserAvatar } from '../../utils/functions';
import { Link as RouterLink, Navigate } from 'react-router-dom';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

const Navbar = () => {
  const { user } = useContext(AuthContext);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  if (!user) {
    return <Navigate to='/auth/sign-in' />;
  }

  const imgUrl = getUserAvatar(user);
  const open = Boolean(anchorEl);

  return (
    <Stack
      direction='row'
      justifyContent='space-between'
      py={1}
      px={2}
      sx={{
        backgroundColor: ({ palette }) => palette.common.white,
      }}>
      <Stack ml='auto' direction='row' alignItems='center' gap={1}>
        <Typography variant='h6' component='span' color='primary'>
          Hi, {user?.name}
        </Typography>
        <IconButton onClick={handleClick}>
          <Avatar src={imgUrl} alt={user?.name} />
        </IconButton>
      </Stack>
      <Menu open={open} onClose={handleClose} anchorEl={anchorEl}>
        <MenuList>
          <Link
            to='/overview/profile'
            component={RouterLink}
            onClick={handleClose}
            sx={{
              textDecoration: 'none',
              color: 'inherit',
            }}>
            <MenuItem>
              <ListItemIcon>
                <AccountCircleIcon fontSize='small' />
              </ListItemIcon>
              <ListItemText>Profile</ListItemText>
            </MenuItem>
          </Link>
        </MenuList>
      </Menu>
    </Stack>
  );
};

export default Navbar;
