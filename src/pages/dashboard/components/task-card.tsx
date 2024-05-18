import { Avatar, Box, Card, Chip, Stack, Typography } from '@mui/material';
import { FC } from 'react';
import { Task } from '../../../core/types/roles.model';
import { formatDate } from '../../../utils/functions';
import { grey } from '@mui/material/colors';
import { IMAGE_BASE_URL } from '../../../utils/constants';

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
        <Chip
          label={formatDate(task.dueDate)}
          color='info'
          sx={{
            backgroundColor: 'hsl(236, 42%, 80%)',
            color: `hsl(236, 100%, 50%)`,
          }}
        />
      </Stack>
      <Card
        sx={{
          padding: '1rem',
          backgroundColor: grey[200],
        }}
        elevation={3}>
        <Typography paragraph mb={1.5} fontWeight='600'>
          {task.title}
        </Typography>
        <Typography paragraph color={grey[600]}>
          {task.description}
        </Typography>
        <Typography paragraph mb={0}>
          <Avatar src={`${IMAGE_BASE_URL}${user?.id}/${user?.avatar}`} />
        </Typography>
      </Card>
    </Box>
  );
};

export default TaskCard;
