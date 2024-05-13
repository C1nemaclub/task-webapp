import pb from '../../../libs/pocketbase';
import { Team } from '../../types/roles.model';

export const getTeams = async () => {
  return await pb.collection('teams').getFullList<Team>();
};

export const createTeam = async (teamName: string) => {
  return await pb.collection('teams').create<Team>({
    name: teamName,
  });
};

// export const joinTeam = async (teamId: string, userId: string) => {

// };
