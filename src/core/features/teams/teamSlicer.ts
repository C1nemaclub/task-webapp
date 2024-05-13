import { Team } from '../../types/roles.model';
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import * as service from './teamService';
import { ClientResponseError } from 'pocketbase';

export type TeamState = {
  teams: Team[];
  loading: boolean;
  error: string | null;
};

const initialState: TeamState = {
  teams: [],
  loading: false,
  error: null,
};

export const getTeams = createAsyncThunk('team/getTeams', async (_, thunkAPI) => {
  try {
    const response = await service.getTeams();
    return response;
  } catch (e) {
    console.log(e);
    const error = e as ClientResponseError;
    return thunkAPI.rejectWithValue(error.message);
  }
});

export const createTeam = createAsyncThunk(
  'team/createTeam',
  async (teamName: string, thunkAPI) => {
    try {
      const response = await service.createTeam(teamName);
      return response;
    } catch (e) {
      console.log(e);
      const error = e as ClientResponseError;
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const teamSlice = createSlice({
  name: 'team',
  initialState,
  reducers: {
    reset: () => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(getTeams.pending, (state) => {
        state.loading = true;
      })
      .addCase(getTeams.fulfilled, (state, action: PayloadAction<Team[]>) => {
        state.teams = action.payload;
        state.loading = false;
      })
      .addCase(getTeams.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(createTeam.pending, (state) => {
        state.loading = true;
      })
      .addCase(createTeam.fulfilled, (state, action: PayloadAction<Team>) => {
        state.teams = [...state.teams, action.payload];
        state.loading = false;
      })
      .addCase(createTeam.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { reset } = teamSlice.actions;
export default teamSlice.reducer;
