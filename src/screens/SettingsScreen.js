import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { resetDB } from '../database/database';

export default function SettingsScreen({ navigation }) {
  const handleLogout = () => {
    Alert.alert('Logout', 'Apakah Anda yakin ingin keluar?', [
      { text: 'Batal', style: 'cancel' },
      { text: 'Keluar', style: 'destructive', onPress: () => navigation.replace('Login') }
    ]);
  };

  const handleResetDB = () => {
    Alert.alert('Reset Database', 'Ini akan menghapus semua tugas. Lanjutkan?', [
      { text: 'Batal', style: 'cancel' },
      { 
        text: 'Reset', 
        style: 'destructive', 
        onPress: async () => {
          try {
            await resetDB();
            Alert.alert('Sukses', 'Semua tugas telah dihapus.');
          } catch (error) {
            console.error(error);
          }
        } 
      }
    ]);
  };

  return (
    <View style={styles.container}>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Akun</Text>
        <TouchableOpacity style={styles.menuItem} onPress={handleLogout}>
          <View style={styles.menuLeft}>
            <Ionicons name="log-out-outline" size={24} color="#E74C3C" />
            <Text style={[styles.menuText, { color: '#E74C3C' }]}>Logout</Text>
          </View>
            <Ionicons name="chevron-forward" size={20} color="#BDC3C7" />
        </TouchableOpacity>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Database</Text>
        <TouchableOpacity style={styles.menuItem} onPress={handleResetDB}>
          <View style={styles.menuLeft}>
            <Ionicons name="trash-bin-outline" size={24} color="#E74C3C" />
            <Text style={[styles.menuText, { color: '#E74C3C' }]}>Reset Semua Tugas</Text>
          </View>
            <Ionicons name="chevron-forward" size={20} color="#BDC3C7" />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  section: {
    marginTop: 20,
    backgroundColor: 'white',
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: '#EEEEEE',
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#7F8C8D',
    marginLeft: 15,
    marginTop: 15,
    marginBottom: 5,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#FAFAFA',
  },
  menuLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  menuText: {
    fontSize: 16,
    marginLeft: 15,
    color: '#333',
  },
});
