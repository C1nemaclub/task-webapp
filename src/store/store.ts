import { configureStore } from '@reduxjs/toolkit';
import taskReducer from '../core/features/tasks/taskSlicer';
import teamsReducer from '../core/features/teams/teamSlicer';

export const store = configureStore({
  reducer: {
    tasks: taskReducer,
    teams: teamsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
