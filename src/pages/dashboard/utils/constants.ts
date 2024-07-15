import { Task } from '../../../core/types/roles.model';
import * as yup from 'yup';

export type GroupedTasks = {
  [columnTitle: string]: Task[];
};

export const editColumnSchema = yup.object().shape({
  name: yup.string().required('Column name is required').min(2).max(30),
});

export type EditColumn = yup.InferType<typeof editColumnSchema>;

export const initialValuesEdit: EditColumn = {
  name: '',
};
