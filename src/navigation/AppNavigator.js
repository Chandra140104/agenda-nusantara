import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import LoginScreen from '../screens/LoginScreen';
import HomeScreen from '../screens/HomeScreen';
import AddImportantTaskScreen from '../screens/AddImportantTaskScreen';
import AddRegularTaskScreen from '../screens/AddRegularTaskScreen';
import TaskListScreen from '../screens/TaskListScreen';
import SettingsScreen from '../screens/SettingsScreen';

const Stack = createNativeStackNavigator();

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Home" component={HomeScreen} options={{ title: 'Agenda Nusantara', headerBackVisible: false }} />
        <Stack.Screen name="AddImportantTask" component={AddImportantTaskScreen} options={{ title: 'Tambah Tugas Penting' }} />
        <Stack.Screen name="AddRegularTask" component={AddRegularTaskScreen} options={{ title: 'Tambah Tugas Biasa' }} />
        <Stack.Screen name="TaskList" component={TaskListScreen} options={{ title: 'Daftar Tugas' }} />
        <Stack.Screen name="Settings" component={SettingsScreen} options={{ title: 'Pengaturan' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
