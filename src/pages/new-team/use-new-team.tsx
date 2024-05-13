import { useFormik } from 'formik';
import { useDispatch } from 'react-redux';
import * as yup from 'yup';
import { createTeam } from '../../core/features/teams/teamSlicer';
import { Team, TUser } from '../../core/types/roles.model';
import { AppDispatch } from '../../store/store';
import { useContext } from 'react';
import { AuthContext } from '../../context/auth/auth-context';
import pb from '../../libs/pocketbase';

export const newTeamSchema = yup.object().shape({
  teamName: yup
    .string()
    .min(2, 'Minimum 2 characters')
    .max(20, 'Maximum 20 characters')
    .required('This field is mandatory'),
});

export type NewTeam = yup.InferType<typeof newTeamSchema>;

export const initialValues: NewTeam = {
  teamName: '',
};

const useNewTeam = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { user } = useContext(AuthContext);

  const newTeamForm = useFormik({
    initialValues,
    validationSchema: newTeamSchema,
    onSubmit: handleSubmit,
    validateOnBlur: false,
  });

  async function handleSubmit(payload: NewTeam) {
    const res = await dispatch(createTeam(payload.teamName));
    const createdTeam = res.payload as Team;
    console.log(createdTeam, 'created Team');
    if (user && createdTeam) {
      joinTeam(createdTeam.id, user);
    }
  }

  const joinTeam = async (teamId: string, user: TUser) => {
    console.log(teamId, user.id);
    const res = await pb.collection('users').update(user.id, {
      teamId: [...user.teamId, teamId],
    });
    console.log(res, 'RES JOIN TEAM');
  };

  return { newTeamForm };
};

export default useNewTeam;