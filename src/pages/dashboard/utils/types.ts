import {
  Board,
  Column,
  TaskType,
  Team,
  TUser,
} from '../../../core/types/roles.model';

export interface TaskFormEntity {
  title: string;
  description: string;
  taskType: TaskType | null;
  asignee: TUser | null;
  team: Team | null;
  board: Board | null;
  column: Column | null;
}
