import { storage } from './storage';

class AuthService {
  async checkLogin(username, password) {
    const users = storage.getUsers();
    return users.find(u => u.username === username && u.password === password);
  }
}

export const authService = new AuthService();
