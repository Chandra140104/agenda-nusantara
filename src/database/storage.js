import AsyncStorage from '@react-native-async-storage/async-storage';

class Storage {
  constructor() {
    this.dbState = {
      users: [],
      tasks: []
    };
    this.STORAGE_KEY = 'agenda_db';
  }

  async save() {
    try {
      await AsyncStorage.setItem(this.STORAGE_KEY, JSON.stringify(this.dbState));
    } catch (error) {
      console.error('Error saving to storage:', error);
    }
  }

  async init() {
    try {
      const data = await AsyncStorage.getItem(this.STORAGE_KEY);
      if (data) {
        const parsed = JSON.parse(data);
        this.dbState.users = parsed.users || [];
        this.dbState.tasks = parsed.tasks || [];
      }
      
      if (this.dbState.users.length === 0) {
        this.dbState.users.push({ id: 1, username: 'user', password: 'user' });
        await this.save();
      }
    } catch (error) {
      console.error('Error initializing storage:', error);
    }
  }

  getTasks() {
    return this.dbState.tasks;
  }

  getUsers() {
    return this.dbState.users;
  }
}

// Export a single instance (Singleton Pattern)
export const storage = new Storage();
