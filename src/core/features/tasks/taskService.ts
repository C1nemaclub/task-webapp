import pb from '../../../libs/pocketbase';
import { Task } from '../../types/roles.model';

export const getTasks = async () => {
  return await pb.collection('tasks').getFullList<Task>({ expand: 'asignee,type' });
  // return await pb.collection('tasks').getList(0, 20, {
  //   filter: 'asignee = "ujygyjgeu3y69l8"',
  //   expand: 'asignee',
  // });
};
