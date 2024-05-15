import pb from '../../../libs/pocketbase';
import { Team } from '../../types/roles.model';

export const getTeams = async () => {
  return await pb.collection('teams').getFullList<Team>();
};

// const getTeamsByUser = (userId: string, start: number = 0, end: number = 10) => {
//   return await pb.collection('teams').getList<Team>(start, end, { expand: {} });
// };

export const createTeam = async (teamName: string) => {
  return await pb.collection('teams').create<Team>({
    name: teamName,
  });
};

// export const joinTeam = async (teamId: string, userId: string) => {

// };
