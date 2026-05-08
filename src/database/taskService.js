import { dbState, saveDB } from './storage';

export const addTask = async (title, description, due_date, category) => {
  const newTask = {
    id: Date.now(),
    title,
    description,
    due_date,
    category,
    is_completed: 0
  };
  dbState.tasks.push(newTask);
  await saveDB();
};

export const getTasks = async () => {
  return [...dbState.tasks].sort((a, b) => b.id - a.id);
};

export const toggleTask = async (id, isCompleted) => {
  const task = dbState.tasks.find(t => t.id === id);
  if (task) {
    task.is_completed = isCompleted ? 0 : 1;
    await saveDB();
  }
};

export const deleteTask = async (id) => {
  // Update the array in place to keep the reference in dbCore
  const index = dbState.tasks.findIndex(t => t.id === id);
  if (index !== -1) {
    dbState.tasks.splice(index, 1);
    await saveDB();
  }
};

export const resetDB = async () => {
  dbState.tasks.length = 0; // Clear array while keeping reference
  await saveDB();
};
