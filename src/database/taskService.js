import { storage } from './storage';

class TaskService {
  async addTask(title, description, due_date, category) {
    const tasks = storage.getTasks();
    const newTask = {
      id: Date.now(),
      title,
      description,
      due_date,
      category,
      is_completed: 0
    };
    tasks.push(newTask);
    await storage.save();
  }

  async getTasks() {
    const tasks = storage.getTasks();
    return [...tasks].sort((a, b) => b.id - a.id);
  }

  async toggleTask(id, isCompleted) {
    const tasks = storage.getTasks();
    const task = tasks.find(t => t.id === id);
    if (task) {
      task.is_completed = isCompleted ? 0 : 1;
      await storage.save();
    }
  }

  async deleteTask(id) {
    const tasks = storage.getTasks();
    const index = tasks.findIndex(t => t.id === id);
    if (index !== -1) {
      tasks.splice(index, 1);
      await storage.save();
    }
  }

  async resetDB() {
    const tasks = storage.getTasks();
    tasks.length = 0;
    await storage.save();
  }
}

export const taskService = new TaskService();
