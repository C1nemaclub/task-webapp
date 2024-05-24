import pb from '../../../libs/pocketbase';
import { Column } from '../../types/roles.model';

export const createColumn = async (columnName: string) => {
  return await pb.collection('columns').create<Column>({
    name: columnName,
  });
};

export const updateColumn = async (columnName: string, columnId: string) => {
  return await pb.collection('columns').update<Column>(columnId, {
    name: columnName,
  });
};
