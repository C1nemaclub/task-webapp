import MoreVertIcon from '@mui/icons-material/MoreVert';
import {
  IconButton,
  InputAdornment,
  Stack,
  Tooltip,
  Typography,
} from '@mui/material';
import { grey } from '@mui/material/colors';
import { useFormik } from 'formik';
import { FC, useContext } from 'react';
import { useDispatch } from 'react-redux';
import InputField from '../../../components/shared/input-field';
import { ToastContext } from '../../../context/toast-context';
import { updateColumn } from '../../../core/features/columns/columnSlicer';
import { Task } from '../../../core/types/roles.model';
import { AppDispatch } from '../../../store/store';
import { EditColumn, editColumnSchema } from '../utils/constants';
import TaskCard from './task-card';

type TaskColumnProps = {
  column: string;
  id: string;
  tasks: Task[];
};

const TaskColumn: FC<TaskColumnProps> = ({ column, id, tasks }) => {
  const dispatch = useDispatch<AppDispatch>();
  const { openToast } = useContext(ToastContext);

  const handleSubmit = ({ name }: EditColumn) => {
    try {
      if (!didNameChange) return;
      dispatch(updateColumn({ name: name, id }));
    } catch (e) {
      console.log(e);

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
      position='relative'
      justifyContent='start'
      alignItems='start'
      width='100%'
      minHeight={250}
      sx={{
        py: 2,
        overflowY: 'auto',
      }}
      flexGrow={0.3}
      maxWidth={400}>
      <Stack component='form' onSubmit={form.handleSubmit} direction='row'>
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
      </Stack>
      <Stack mt={4} width='100%'>
        {tasks.map((task) => {
          return <TaskCard key={task.id} task={task} />;
        })}
      </Stack>
    </Stack>
  );
};

export default TaskColumn;
