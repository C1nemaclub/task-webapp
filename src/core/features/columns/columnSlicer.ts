import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ClientResponseError } from 'pocketbase';
import { Column } from '../../types/roles.model';
import * as service from './columnService';

export type TaskState = {
  columns: Column[];
  loading: boolean;
  error: string | null;
};

const initialState: TaskState = {
  columns: [],
  loading: false,
  error: null,
};

export const createColumn = createAsyncThunk(
  'team/createColumn',
  async (columnName: string, thunkAPI) => {
    try {
      const response = await service.createColumn(columnName);
      return response;
    } catch (e) {
      console.log(e);
      const error = e as ClientResponseError;
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const updateColumn = createAsyncThunk(
  'team/updateColumn',
  async ({ name, id }: { name: string; id: string }, thunkAPI) => {
    try {
      const response = await service.updateColumn(name, id);
      return response;
    } catch (e) {
      console.log(e);
      const error = e as ClientResponseError;
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const columnSlicer = createSlice({
  name: 'column',
  initialState,
  reducers: {
    reset: () => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(createColumn.pending, (state) => {
        state.loading = true;
      })
      .addCase(createColumn.fulfilled, (state, action: PayloadAction<Column>) => {
        state.columns = [...state.columns, action.payload];
        state.loading = false;
      })
      .addCase(createColumn.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(updateColumn.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateColumn.fulfilled, (state, action: PayloadAction<Column>) => {
        state.columns = state.columns.map((column) =>
          column.id === action.payload.id ? action.payload : column
        );
        state.loading = false;
      })
      .addCase(updateColumn.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { reset } = columnSlicer.actions;
export default columnSlicer.reducer;
