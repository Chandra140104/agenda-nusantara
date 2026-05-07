import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import LoginScreen from '../screens/LoginScreen';
import HomeScreen from '../screens/HomeScreen';
import TambahTugasPentingScreen from '../screens/TambahTugasPentingScreen';
import TambahTugasBiasaScreen from '../screens/TambahTugasBiasaScreen';
import DaftarTugasScreen from '../screens/DaftarTugasScreen';
import SettingsScreen from '../screens/SettingsScreen';

const Stack = createNativeStackNavigator();

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
        <Stack.Screen name="AddImportantTask" component={TambahTugasPentingScreen} options={{ headerShown: false }} />
        <Stack.Screen name="AddRegularTask" component={TambahTugasBiasaScreen} options={{ headerShown: false }} />
        <Stack.Screen name="TaskList" component={DaftarTugasScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Settings" component={SettingsScreen} options={{ headerShown: false }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
