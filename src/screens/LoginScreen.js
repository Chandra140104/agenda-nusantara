import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, Keyboard, Image } from 'react-native';
import { checkLogin } from '../database/database';
import styles from '../styles/LoginStyles';

export default function LoginScreen({ navigation }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    Keyboard.dismiss();
    
    if (!username || !password) {
      Alert.alert('Error', 'Username dan password tidak boleh kosong!');
      return;
    }

    try {
      const cleanUsername = username.trim().toLowerCase();
      const cleanPassword = password.trim();

      const user = await checkLogin(cleanUsername, cleanPassword);
      
      if (user) {
        navigation.replace('Home');
      } else {
        Alert.alert('Error', 'Username atau password salah!');
      }
    } catch (error) {
      console.error(error);
      Alert.alert('Error', 'Terjadi kesalahan saat login.');
    }
  };

  return (
    <View style={styles.container}>
      <Image 
        source={require('../../assets/images/logo.png')} 
        style={styles.logo} 
        resizeMode="contain"
      />
      <Text style={styles.title}>Agenda Nusantara</Text>
      <Text style={styles.subtitle}>Kelola tugasmu, raih harimu</Text>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>USERNAME</Text>
        <TextInput
          style={styles.input}
          placeholder="user"
          value={username}
          onChangeText={setUsername}
          autoCapitalize="none"
        />
        <Text style={styles.label}>PASSWORD</Text>
        <TextInput
          style={styles.input}
          placeholder="...."
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />
        <TouchableOpacity style={styles.button} onPress={handleLogin}>
          <Text style={styles.buttonText}>LOGIN</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

