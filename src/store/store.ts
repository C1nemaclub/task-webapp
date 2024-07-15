import { configureStore } from '@reduxjs/toolkit';
import taskReducer from '../core/features/tasks/taskSlicer';
import teamsReducer from '../core/features/teams/teamSlicer';
import columnsReducer from '../core/features/columns/columnSlicer';

export const store = configureStore({
  reducer: {
    tasks: taskReducer,
    teams: teamsReducer,
    columns: columnsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
