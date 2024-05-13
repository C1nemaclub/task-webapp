import { Task } from '../../types/roles.model';
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import * as service from './taskService';
import { ClientResponseError } from 'pocketbase';

export type TaskState = {
  tasks: Task[];
  loading: boolean;
  error: string | null;
};

const initialState: TaskState = {
  tasks: [],
  loading: false,
  error: null,
};

export const getTasks = createAsyncThunk('task/getTasks', async (_, thunkAPI) => {
  try {
    const response = await service.getTasks();
    return response;
  } catch (e) {
    console.log(e);
    const error = e as ClientResponseError;
    return thunkAPI.rejectWithValue(error.message);
  }
});

export const taskSlice = createSlice({
  name: 'task',
  initialState,
  reducers: {
    reset: () => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(getTasks.pending, (state) => {
        state.loading = true;
      })
      .addCase(getTasks.fulfilled, (state, action: PayloadAction<Task[]>) => {
        state.tasks = action.payload;
        state.loading = false;
      })
      .addCase(getTasks.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { reset } = taskSlice.actions;
export default taskSlice.reducer;
