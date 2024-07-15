import pb from '../../../libs/pocketbase';
import { Board, Team } from '../../types/roles.model';

export const getTeams = async () => {
  return await pb.collection('teams').getFullList<Team>();
};

export const createTeam = async (teamName: string) => {
  return await pb.collection('teams').create<Team>({
    name: teamName,
  });
};

export const getTeamBoards = async (teamId: string) => {
  return await pb.collection('boards').getFullList<Board>({
    filter: `teamId="${teamId}"`,
  });
};
