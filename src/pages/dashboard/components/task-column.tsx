import { useDroppable } from '@dnd-kit/core';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import {
  Box,
  IconButton,
  InputAdornment,
  Stack,
  Tooltip,
  Typography,
} from '@mui/material';
import { grey } from '@mui/material/colors';
import { useFormik } from 'formik';
import { FC, useContext } from 'react';
import InputField from '../../../components/shared/input-field';
import { Task } from '../../../core/types/roles.model';
import { AppDispatch } from '../../../store/store';
import { EditColumn, editColumnSchema } from '../utils/constants';
import TaskCard from './task-card';
import { useDispatch } from 'react-redux';
import { ToastContext } from '../../../context/toast-context';
import { updateColumn } from '../../../core/features/columns/columnSlicer';
type TaskColumnProps = {
  column: string;
  tasks: Task[];
};

const TaskColumn: FC<TaskColumnProps> = ({ column, tasks }) => {
  const dispatch = useDispatch<AppDispatch>();
  const { openToast } = useContext(ToastContext);

  const { isOver, setNodeRef } = useDroppable({
    id: column,
  });

  const handleSubmit = ({ name }: EditColumn) => {
    try {
      if (!didNameChange) return;
      const columnId = tasks[0].expand.column.id;
      dispatch(updateColumn({ name: name, id: columnId }));
    } catch (e) {
      openToast({
        message: "Couldn't update column name",
        severity: 'error',
      });
    }
  };

  const form = useFormik({
    initialValues: { name: column },
    validationSchema: editColumnSchema,
    onSubmit: handleSubmit,
  });

  const didNameChange = form.values.name !== column;

  return (
    <Stack
      ref={setNodeRef}
      justifyContent='start'
      alignItems='start'
      width='100%'
      minHeight={250}
      sx={{
        padding: 2,
        backgroundColor: isOver ? 'primary.100' : 'transparent',
      }}
      flexGrow={0.3}
      maxWidth={400}>
      <Box component='form' onSubmit={form.handleSubmit}>
        <InputField
          form={form}
          name='name'
          size='small'
          onBlur={() => form.handleSubmit()}
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
      </Box>
      <Stack mt={4} width='100%'>
        {tasks.map((task) => {
          return <TaskCard key={task.id} task={task} />;
        })}
      </Stack>
    </Stack>
  );
};

export default TaskColumn;
