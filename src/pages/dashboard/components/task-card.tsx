import AccessTimeIcon from '@mui/icons-material/AccessTime';
import CreateIcon from '@mui/icons-material/Create';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import {
  Avatar,
  Box,
  Card,
  Chip,
  IconButton,
  Stack,
  Tooltip,
  Typography,
} from '@mui/material';
import { grey } from '@mui/material/colors';
import { FC } from 'react';
import { Task } from '../../../core/types/roles.model';
import { IMAGE_BASE_URL } from '../../../utils/constants';
import { formatDate } from '../../../utils/functions';
import { useDraggable } from '@dnd-kit/core';

type TaskCardProps = {
  task: Task;
};

const TaskCard: FC<TaskCardProps> = ({ task }) => {
  const user = task.expand.asignee;
  const type = task.expand.type;

  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: task.id,
  });

  return (
    <Box
      mb={2}
      width='100%'
      ref={setNodeRef}
      {...listeners}
      {...attributes}
      sx={{
        cursor: 'pointer',
        transform: transform
          ? `translate3d(${transform.x}px, ${transform.y}px, 0)`
          : undefined,
        padding: '1rem',
        backgroundColor: grey[100],
      }}>
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
          <Tooltip title={user?.name}>
            <IconButton>
              <Avatar
                src={`${IMAGE_BASE_URL}${user?.id}/${user?.avatar}`}
                alt={user?.name}
              />
            </IconButton>
          </Tooltip>
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
