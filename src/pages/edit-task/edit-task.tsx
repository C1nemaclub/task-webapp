import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Section from '../../components/shared/section';
import pb from '../../libs/pocketbase';
import TaskForm from '../dashboard/components/task-form';
import { TaskFormEntity } from '../dashboard/utils/types';

const EditTask = () => {
  const { id } = useParams<{ id: string }>();
  const [initialValues, setInitialValues] = useState<TaskFormEntity>(
    {} as TaskFormEntity
  );
  console.log(id);

  useEffect(() => {
    const getTask = async () => {
      try {
        if (id) {
          const response = await pb.collection('ProTasks').getOne(id, {
            expand: 'asignee,type,teamId,boardId,column',
          });
          const task: TaskFormEntity = {
            title: response.title,
            description: response.description,
            taskType: response.expand?.type,
            asignee: response.expand?.asignee,
            team: response.expand?.teamId,
            board: response.expand?.boardId,
            column: response.expand?.column,
          };
          setInitialValues(task);
        }
      } catch (e) {
        console.log(e);
      }
    };
    getTask();
  }, [id]);

  return (
    <Section title='Edit Task'>
      <TaskForm type='edit' initialValues={initialValues} taskId={id} />
    </Section>
  );
};

export default EditTask;
