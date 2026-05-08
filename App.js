import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Text, View } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { initDB } from './src/database';
import AppNavigator from './src/navigation/AppNavigator';

export default function App() {
  const [isDbReady, setIsDbReady] = useState(false);
  const [dbError, setDbError] = useState(null);

  useEffect(() => {
    const setupDatabase = async () => {
      try {
        await initDB();
        setIsDbReady(true);
      } catch (error) {
        console.warn('DB Error:', error);
        setDbError(error.message || 'Unknown error');
      }
    };
    setupDatabase();
  }, []);

  if (dbError) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 }}>
        <Text style={{ color: 'red', fontSize: 18, fontWeight: 'bold' }}>Database Error:</Text>
        <Text>{dbError}</Text>
      </View>
    );
  }

  if (!isDbReady) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <SafeAreaProvider>
      <AppNavigator />
    </SafeAreaProvider>
  );
}
