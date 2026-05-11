import { authService } from './authService';
import { storage } from './storage';
import { taskService } from './taskService';

// Mengekspor instance untuk penggunaan OOP
export { authService, storage, taskService };

// Kompatibilitas mundur (pemetaan metode kelas ke nama fungsi lama)
export const initDB = storage.init.bind(storage);
export const checkLogin = authService.checkLogin.bind(authService);
export const changePassword = authService.changePassword.bind(authService);
export const addTask = taskService.addTask.bind(taskService);
export const getTasks = taskService.getTasks.bind(taskService);
export const toggleTask = taskService.toggleTask.bind(taskService);
export const deleteTask = taskService.deleteTask.bind(taskService);
export const resetDB = taskService.resetDB.bind(taskService);
