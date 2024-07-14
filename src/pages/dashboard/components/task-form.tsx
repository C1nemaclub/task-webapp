import {
  Autocomplete,
  Box,
  Button,
  Grid,
  ListItem,
  ListItemText,
  TextField,
} from '@mui/material';
import { FormikHelpers, useFormik } from 'formik';
import { FC, useCallback, useContext, useEffect, useState } from 'react';
import * as yup from 'yup';
import InputField from '../../../components/shared/input-field';
import {
  Board,
  Column,
  Task,
  TaskType,
  TUser,
} from '../../../core/types/roles.model';
import pb from '../../../libs/pocketbase';
import { TaskFormEntity } from '../utils/types';
import { ToastContext } from '../../../context/toast-context';
import { getFieldError } from '../../../utils/functions';
import { AuthContext } from '../../../context/auth/auth-context';
import { getTeamBoards } from '../../../core/features/teams/teamService';
import LoadingScreen from '../../../components/shared/loading-screen';
import { useNavigate } from 'react-router-dom';

type TaskFormProps = {
  initialValues?: TaskFormEntity;
  taskId?: string;
  type?: 'create' | 'edit';
};

const initialForm: TaskFormEntity = {
  title: '',
  description: '',
  taskType: null,
  asignee: null,
  team: null,
  board: null,
  column: null,
};

const validationSchema = yup.object().shape({
  title: yup
    .string()
    .trim()
    .max(30, 'Maximum 30 characters')
    .required('Title is required'),
  description: yup
    .string()
    .trim()
    .max(255, 'Maximum 255 characters')
    .required('Description is required'),
  taskType: yup.object().required('Task type is required'),
  asignee: yup.object().required('Asignee is required'),
  team: yup.object().required('Team is required'),
  board: yup.object().required('Board is required'),
  column: yup.object().required('Column is required'),
});

const TaskForm: FC<TaskFormProps> = ({
  initialValues = initialForm,
  type = 'create',
  taskId,
}) => {
  const [users, setUsers] = useState<TUser[]>([]);
  const [taskTypes, setTaskTypes] = useState<TaskType[]>([]);
  const [teamBoards, setTeamBoards] = useState<Board[]>([]);
  const [boardColumns, setBoardColumns] = useState<Column[]>([]);
  const [loading, setLoading] = useState(true);
  const toast = useContext(ToastContext);
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const handleSubmit = async (
    formData: TaskFormEntity,
    { setSubmitting }: FormikHelpers<TaskFormEntity>
  ) => {
    try {
      setSubmitting(true);
      const payload = {
        title: formData.title,
        dueDate: new Date(),
        description: formData.description,
        columnId: formData.column?.id,
        asignee: formData.asignee?.id,
        createdBy: user?.id,
        type: formData.taskType?.id,
      };
      if (type === 'edit' && taskId) {
        await pb.collection('tasks').update<Task>(taskId, payload);
        navigate('/overview');
        return;
      }
      await pb.collection('tasks').create<Task>(payload);
      navigate('/overview');
    } catch (e) {
      console.log(e);

      toast.openToast({
        severity: 'error',
        message: 'Failed to create task',
      });
    } finally {
      setSubmitting(false);
    }
  };

  const form = useFormik<TaskFormEntity>({
    validateOnMount: true,
    enableReinitialize: true,
    validateOnChange: true,
    initialValues: initialValues,
    onSubmit: handleSubmit,
    validationSchema: validationSchema,
  });

  const getData = useCallback(async () => {
    setLoading(true);
    const getUsers = pb.collection('users').getFullList<TUser>();
    const getTaskTypes = pb.collection('task_types').getFullList<TaskType>();
    const data: [
      PromiseSettledResult<TUser[]>,
      PromiseSettledResult<TaskType[]>
    ] = await Promise.allSettled([getUsers, getTaskTypes]);

    if (data.some((d) => d.status === 'rejected')) {
      toast.openToast({
        severity: 'error',
        message: 'Failed to fetch data',
      });
      return;
    }
    const [users, taskTypes] = data;
    taskTypes.status === 'fulfilled' && setTaskTypes(taskTypes.value);
    if (users.status === 'fulfilled') {
      const filteredUsers = users.value.filter((target) =>
        target.teamId.some((teamId) => user?.teamId.includes(teamId))
      );
      setUsers(filteredUsers);
    }
    setLoading(false);
  }, [toast, user]);

  const getAvailableBoards = async () => {
    try {
      const teamId = form.values.team?.id;
      if (teamId) {
        const result = await getTeamBoards(teamId);
        setTeamBoards(result);
      }
    } catch (e) {
      toast.openToast({
        severity: 'error',
        message: 'Failed to fetch boards',
      });
    }
  };

  const getAvailableColumn = async () => {
    try {
      const boardId = form.values.board?.id;
      const availableColumns = await pb
        .collection('columns')
        .getFullList<Column>({
          filter: `boardId="${boardId}"`,
        });
      setBoardColumns(availableColumns);
    } catch (e) {
      toast.openToast({
        severity: 'error',
        message: 'Failed to fetch columns',
      });
    }
  };

  useEffect(() => {
    getData();
  }, [getData]);

  useEffect(() => {
    getAvailableBoards();
  }, [form.values.team]);

  useEffect(() => {
    getAvailableColumn();
  }, [form.values.board]);

  const str1 = JSON.stringify(form.values);
  const str2 = JSON.stringify(form.initialValues);
  const isSame = str1 === str2;

  return (
    <>
      <Box component={'form'} onSubmit={form.handleSubmit}>
        {loading ? (
          <LoadingScreen />
        ) : (
          <Grid container columns={12} spacing={2}>
            <Grid item xs={12} md={12}>
              <InputField
                form={form}
                name='title'
                label='Title'
                autoComplete='false'
                size='small'
              />
            </Grid>
            <Grid item xs={12} md={12}>
              <InputField
                form={form}
                name='description'
                label='Description'
                autoComplete='false'
                size='small'
                minRows={4}
                maxRows={8}
                multiline
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <Autocomplete
                size='small'
                options={users || []}
                value={form.values.asignee || null}
                isOptionEqualToValue={(option, value) =>
                  option.username === value.username
                }
                onChange={(_, value) => form.setFieldValue('asignee', value)}
                onBlur={form.handleBlur}
                getOptionLabel={(option) => option.name}
                renderOption={(props, option) => {
                  return (
                    <ListItem {...props} key={option.username}>
                      <ListItemText
                        primary={option.name}
                        secondary={option.email}
                      />
                    </ListItem>
                  );
                }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label='Asignee'
                    name='asignee'
                    variant='outlined'
                    size='small'
                    autoComplete='false'
                    {...getFieldError(form, 'asignee')}
                  />
                )}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <Autocomplete
                size='small'
                options={taskTypes}
                value={form.values.taskType || null}
                onChange={(_, value) => form.setFieldValue('taskType', value)}
                onBlur={form.handleBlur}
                isOptionEqualToValue={(option, value) => option === value}
                getOptionLabel={(option) => option.name}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    name='taskType'
                    label='Task Type'
                    autoComplete='false'
                    {...getFieldError(form, 'taskType')}
                  />
                )}
              />
            </Grid>
            <Grid item xs={12}>
              <Autocomplete
                size='small'
                disabled={type === 'edit'}
                options={user?.expand.teamId || []}
                value={form.values.team || null}
                onChange={(_, value) => {
                  form.setFieldValue('board', null);
                  form.setFieldValue('team', value);
                }}
                onBlur={form.handleBlur}
                isOptionEqualToValue={(option, value) => option === value}
                getOptionLabel={(option) => option.name}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    name='team'
                    label='Team'
                    autoComplete='false'
                    {...getFieldError(form, 'team')}
                  />
                )}
              />
            </Grid>
            <Grid item xs={12}>
              <Autocomplete
                size='small'
                disabled={!form.values.team || type === 'edit'}
                options={teamBoards}
                value={form.values.board || null}
                onChange={(_, value) => {
                  form.setFieldValue('column', null);
                  form.setFieldValue('board', value);
                }}
                onBlur={form.handleBlur}
                isOptionEqualToValue={(option, value) => option === value}
                getOptionLabel={(option) => option.name}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    name='board'
                    label='Board'
                    autoComplete='false'
                    {...getFieldError(form, 'board')}
                  />
                )}
              />
            </Grid>
            <Grid item xs={12}>
              <Autocomplete
                size='small'
                disabled={!form.values.board || type === 'edit'}
                options={boardColumns}
                value={form.values.column || null}
                onChange={(_, value) => form.setFieldValue('column', value)}
                onBlur={form.handleBlur}
                isOptionEqualToValue={(option, value) => option === value}
                getOptionLabel={(option) => option.name}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    name='column'
                    label='Column'
                    autoComplete='false'
                    {...getFieldError(form, 'column')}
                  />
                )}
              />
            </Grid>
            <Grid item xs={12}>
              <Button
                type='submit'
                disabled={!form.isValid || form.isSubmitting || isSame}>
                {type === 'create' ? 'Create' : 'Update'}
              </Button>
            </Grid>
          </Grid>
        )}
      </Box>
    </>
  );
};

export default TaskForm;
