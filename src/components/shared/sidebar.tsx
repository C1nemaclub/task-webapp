import AssignmentTurnedInIcon from '@mui/icons-material/AssignmentTurnedIn';
import HomeIcon from '@mui/icons-material/Home';
import SettingsIcon from '@mui/icons-material/Settings';
import WorkspacesIcon from '@mui/icons-material/Workspaces';
import {
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Tooltip,
} from '@mui/material';
import { NavLink } from 'react-router-dom';
import useWindowSize from '../../hooks/use-window-size';
import Logo from './logo';

const drawerWidth = 240;

const drawerStyle = {
  width: drawerWidth,
  height: '100%',
  minHeight: '100vh',
  flexShrink: 0,
  position: 'sticky',
  top: 64,
  '& .MuiDrawer-paper': {
    padding: '20px 0px 0px 20px',
    width: drawerWidth,
    height: '100%',
    boxSizing: 'border-box',
    position: 'sticky',
    top: 64,
    overflow: 'visible',
  },
  '& .MuiDivider-root': {
    backgroundColor: 'transparent',
  },
};

const categories = [
  { Icon: HomeIcon, route: 'dashboard', name: 'Dashboard', id: '1' },
  { Icon: AssignmentTurnedInIcon, route: 'tasks', name: 'Tasks', id: '2' },
  { Icon: WorkspacesIcon, route: 'teams', name: 'Teams', id: '3' },
  { Icon: SettingsIcon, route: 'settings', name: 'Settings', id: '4' },
];

const Sidebar = () => {
  const {
    windowSize: { width },
  } = useWindowSize();
  return (
    <Drawer
      anchor='left'
      variant='persistent'
      open={width > 800 ? true : false}
      sx={{
        marginRight: width > 800 ? '0' : '-240px',
        transition: '.3s ease-in-out',
        ...drawerStyle,
      }}>
      <Logo
        title='Tasky'
        textProps={{
          variant: 'h5',
          fontWeight: 'bold',
        }}
      />
      <List
        sx={{
          marginTop: '1rem',
          overflow: 'hidden',
        }}>
        {categories.map(({ name, id, route, Icon }) => (
          <ListItem key={id} disablePadding>
            <NavLink
              key={name}
              to={route}
              className={({ isActive }) => (isActive ? 'active-nav nav' : 'nav')}>
              {({ isActive }) => {
                return (
                  <ListItemButton
                    disableRipple
                    sx={{
                      padding: 0,
                      display: 'flex',
                      justifyContent: 'space-between',
                      width: '100%',
                    }}>
                    <IconButton>
                      <Tooltip title={name} enterDelay={100}>
                        <Icon
                          sx={{
                            color: isActive ? 'primary.contrastText' : '',
                            transition: '.5s ease-in-out',
                          }}
                        />
                      </Tooltip>
                    </IconButton>
                    <ListItemText
                      secondary={name}
                      sx={{
                        '& .MuiTypography-root': {
                          color: isActive ? 'primary.contrastText' : '',
                          transition: '.5s ease-in-out',
                        },
                      }}
                    />
                  </ListItemButton>
                );
              }}
            </NavLink>
          </ListItem>
        ))}
      </List>
    </Drawer>
  );
};

export default Sidebar;
