import AsyncStorage from '@react-native-async-storage/async-storage';

let dbState = {
  users: [],
  tasks: []
};

const saveDB = async () => {
  await AsyncStorage.setItem('agenda_db', JSON.stringify(dbState));
};

export const initDB = async () => {
  try {
    const data = await AsyncStorage.getItem('agenda_db');
    if (data) {
      dbState = JSON.parse(data);
    }
    
    if (dbState.users.length === 0) {
      dbState.users.push({ id: 1, username: 'user', password: 'user' });
      await saveDB();
    }
  } catch (error) {
    console.error('Error initializing DB:', error);
  }
};

export const checkLogin = async (username, password) => {
  return dbState.users.find(u => u.username === username && u.password === password);
};

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
  dbState.tasks = dbState.tasks.filter(t => t.id !== id);
  await saveDB();
};

export const resetDB = async () => {
  dbState.tasks = [];
  await saveDB();
};
