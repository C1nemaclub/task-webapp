import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import React from 'react';
import NewTeam from '../new-team/new-team';

interface TabPanelProps {
  children?: React.ReactNode;
  dir?: string;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role='tabpanel'
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}>
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

const Teams = () => {
  const [value, setValue] = React.useState(1);

  const handleChange = (_: React.SyntheticEvent, newValue: string) => {
    setValue(Number(newValue));
  };

  return (
    <div>
      Teams
      <Box sx={{ width: '100%' }}>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label='wrapped label tabs example'>
          <Tab value={1} label='Item One' />
          <Tab value={2} label='Item Two' />
          <Tab value={3} label='New Team' />
        </Tabs>
        <TabPanel value={value} index={1}>
          Item One
        </TabPanel>
        <TabPanel value={value} index={3}>
          <NewTeam />
        </TabPanel>
      </Box>
      {/* <Outlet /> */}
    </div>
  );
};

export default Teams;
