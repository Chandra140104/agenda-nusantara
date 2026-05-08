import AsyncStorage from '@react-native-async-storage/async-storage';

export let dbState = {
  users: [],
  tasks: []
};

export const saveDB = async () => {
  await AsyncStorage.setItem('agenda_db', JSON.stringify(dbState));
};

export const initDB = async () => {
  try {
    const data = await AsyncStorage.getItem('agenda_db');
    if (data) {
      const parsed = JSON.parse(data);
      dbState.users = parsed.users || [];
      dbState.tasks = parsed.tasks || [];
    }
    
    if (dbState.users.length === 0) {
      dbState.users.push({ id: 1, username: 'user', password: 'user' });
      await saveDB();
    }
  } catch (error) {
    console.error('Error initializing DB:', error);
  }
};
