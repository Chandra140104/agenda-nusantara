import { dbState } from './storage';

export const checkLogin = async (username, password) => {
  return dbState.users.find(u => u.username === username && u.password === password);
};
