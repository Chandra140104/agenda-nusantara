import { storage } from './storage';

class AuthService {
  async checkLogin(username, password) {
    const users = storage.getUsers();
    return users.find(u => u.username === username && u.password === password);
  }

  async changePassword(username, currentPassword, newPassword) {
    const users = storage.getUsers();
    const user = users.find(u => u.username === username && u.password === currentPassword);
    if (!user) {
      throw new Error('Password saat ini salah');
    }
    user.password = newPassword;
    await storage.save();
    return true;
  }
}

export const authService = new AuthService();
