import React, { FC } from 'react';
import { Task } from '../../../core/types/roles.model';
import { Box, Card, Chip, Stack, Typography } from '@mui/material';

type TaskCardProps = {
  task: Task;
};

const TaskCard: FC<TaskCardProps> = ({ task }) => {
  return (
    <Box>
      <Stack direction='row' justifyContent='end'>
        <Chip label={task.dueDate} />
        <Chip label={task.type.title} />
      </Stack>
      <Card>
        <Typography variant='h6'>{task.title}</Typography>
        <Typography paragraph>{task.description}</Typography>
        <Typography>
          <strong>Assigned To:</strong> {task.asignee}
        </Typography>
      </Card>
    </Box>
  );
};

export default TaskCard;
