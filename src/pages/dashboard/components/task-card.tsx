import { Box, Card, Chip, Stack, Typography } from '@mui/material';
import { FC } from 'react';
import { Task } from '../../../core/types/roles.model';
import { formatDate } from '../../../utils/functions';

type TaskCardProps = {
  task: Task;
};

const TaskCard: FC<TaskCardProps> = ({ task }) => {
  console.log(task.expand.type.name);

  return (
    <Box maxWidth={'400px'} mb={2}>
      <Stack direction='row' justifyContent='space-between' mb={1}>
        <Chip label={task.expand.type.name} />
        <Chip label={formatDate(task.dueDate)} color='info' />
      </Stack>
      <Card
        sx={{
          padding: '1rem',
        }}
        elevation={3}>
        <Typography paragraph mb={0}>
          {task.title}
        </Typography>
        <Typography paragraph>{task.description}</Typography>
        <Typography>
          <strong>Assigned To:</strong> {task.expand.asignee.name}
        </Typography>
      </Card>
    </Box>
  );
};

export default TaskCard;
