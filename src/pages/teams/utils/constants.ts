import * as yup from 'yup';
import { ActiveTeamForm } from './types';

export const validationSchema = yup.object().shape({
  activeTeam: yup.string().required('Select a team'),
});

export const initialValues: ActiveTeamForm = {
  activeTeam: '',
};
