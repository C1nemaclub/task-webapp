import {
  Avatar,
  Box,
  Card,
  Chip,
  IconButton,
  Paper,
  Stack,
  Typography,
} from '@mui/material';
import { FC } from 'react';
import { Task } from '../../../core/types/roles.model';
import { formatDate } from '../../../utils/functions';
import { grey } from '@mui/material/colors';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import { IMAGE_BASE_URL } from '../../../utils/constants';
import CreateIcon from '@mui/icons-material/Create';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';

type TaskCardProps = {
  task: Task;
};

const TaskCard: FC<TaskCardProps> = ({ task }) => {
  const user = task.expand.asignee;
  const type = task.expand.type;
  return (
    <Box maxWidth={'400px'} mb={2}>
      <Stack direction='row' justifyContent='space-between' mb={1}>
        <Chip
          label={task.expand.type.name}
          sx={{
            backgroundColor: `hsl(${type.color}, 100%, 91%)`,
            color: `hsl(${type.color}, 35%, 50%)`,
          }}
        />
        <Stack>
          <Chip
            avatar={<AccessTimeIcon />}
            label={formatDate(task.dueDate)}
            sx={{
              backgroundColor: grey[100],
              color: `hsl(236, 85%, 70%)`,
            }}
          />
        </Stack>
      </Stack>
      <Card
        sx={{
          padding: '1rem',
          backgroundColor: grey[100],
        }}
        elevation={0}>
        <Typography paragraph mb={1.5} fontWeight='600'>
          {task.title}
        </Typography>
        <Typography paragraph color={grey[600]}>
          {task.description}
        </Typography>
        <Stack direction='row' justifyContent='space-between' alignItems='center'>
          <IconButton>
            <Avatar
              src={`${IMAGE_BASE_URL}${user?.id}/${user?.avatar}`}
              alt={user?.name}
            />
          </IconButton>
          <Stack direction='row'>
            <IconButton>
              <CreateIcon fontSize='medium' color='primary' />
            </IconButton>
            <IconButton>
              <DeleteForeverIcon fontSize='medium' color='primary' />
            </IconButton>
          </Stack>
        </Stack>
      </Card>
    </Box>
  );
};

export default TaskCard;
