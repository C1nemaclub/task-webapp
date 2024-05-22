import MoreVertIcon from '@mui/icons-material/MoreVert';
import {
  IconButton,
  InputAdornment,
  Stack,
  TextField,
  Tooltip,
  Typography,
} from '@mui/material';
import { grey } from '@mui/material/colors';
import { FC } from 'react';
import { Task } from '../../../core/types/roles.model';
import TaskCard from './task-card';
import { useDroppable } from '@dnd-kit/core';
type TaskColumnProps = {
  column: string;
  tasks: Task[];
};

const TaskColumn: FC<TaskColumnProps> = ({ column, tasks }) => {
  const { isOver, setNodeRef } = useDroppable({
    id: column,
  });

  return (
    <Stack
      ref={setNodeRef}
      justifyContent='start'
      alignItems='start'
      width='100%'
      minHeight={250}
      sx={{
        // border: '1px solid',
        // borderColor: isOver ? 'primary.main' : 'transparent',
        // borderRadius: 1,
        padding: 2,
        backgroundColor: isOver ? 'primary.100' : 'transparent',
      }}
      flexGrow={0.3}
      maxWidth={400}>
      <TextField
        defaultValue={column}
        size='small'
        fullWidth
        focused
        sx={{
          '& .MuiInputBase-input': {
            fontWeight: 'bold',
          },
        }}
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
                ({tasks.length})
              </Typography>
            </InputAdornment>
          ),
        }}
      />
      <Stack mt={4} width='100%'>
        {tasks.map((task) => {
          return <TaskCard key={task.id} task={task} />;
        })}
      </Stack>
    </Stack>
  );
};

export default TaskColumn;
