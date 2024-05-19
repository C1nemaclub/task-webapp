import { Task } from '../../../core/types/roles.model';

export type GroupedTasks = {
  [columnTitle: string]: Task[];
};
