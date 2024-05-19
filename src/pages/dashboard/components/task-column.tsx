import React, { FC } from 'react';
import { Column, Task } from '../../../core/types/roles.model';
import {
  IconButton,
  InputAdornment,
  Stack,
  TextField,
  Tooltip,
  Typography,
} from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { grey } from '@mui/material/colors';
type TaskColumnProps = {
  column?: Column;
  tasks?: Task[];
};

const TaskColumn: FC<TaskColumnProps> = ({ column }) => {
  return (
    <Stack justifyContent='start' alignItems='start' width='100%'>
      <Stack>
        <TextField
          defaultValue='In Progress'
          size='small'
          fullWidth
          focused
          InputProps={{
            endAdornment: (
              <InputAdornment position='end'>
                <Tooltip title='Options'>
                  <IconButton>
                    <MoreVertIcon />
                  </IconButton>
                </Tooltip>
              </InputAdornment>
            ),
            startAdornment: (
              <InputAdornment position='start'>
                <Typography
                  sx={{
                    color: grey[400],
                  }}>
                  (1)
                </Typography>
              </InputAdornment>
            ),
          }}
        />
      </Stack>
    </Stack>
  );
};

export default TaskColumn;
