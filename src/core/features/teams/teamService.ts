import pb from '../../../libs/pocketbase';
import { Team } from '../../types/roles.model';

export const getTeams = async () => {
  return await pb.collection('teams').getFullList<Team>();
};

// const getTeamsByUser = async (teamIds: string[]) => {
//   return await pb.collection('teams').getFullList<Team>({ filter: '' });
// };

export const createTeam = async (teamName: string) => {
  return await pb.collection('teams').create<Team>({
    name: teamName,
  });
};
