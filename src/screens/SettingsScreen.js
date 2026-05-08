import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import CustomHeader from '../components/CustomHeader';
import { resetDB } from '../database';

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
      <CustomHeader 
        title="Pengaturan" 
        backgroundColor="#95A5A6" 
        showBackButton={true} 
      />

      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Akun</Text>
          <TouchableOpacity style={styles.item} onPress={handleLogout}>
            <View style={[styles.iconBox, { backgroundColor: '#FFEBEE' }]}>
              <Ionicons name="log-out-outline" size={22} color="#E53935" />
            </View>
            <Text style={styles.itemText}>Keluar Akun</Text>
            <Ionicons name="chevron-forward" size={20} color="#CBD5E0" />
          </TouchableOpacity>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Sistem</Text>
          <TouchableOpacity style={styles.item} onPress={handleResetDB}>
            <View style={[styles.iconBox, { backgroundColor: '#FFF3E0' }]}>
              <Ionicons name="refresh-outline" size={22} color="#FB8C00" />
            </View>
            <Text style={styles.itemText}>Reset Database</Text>
            <Ionicons name="chevron-forward" size={20} color="#CBD5E0" />
          </TouchableOpacity>
          
          <View style={styles.item}>
            <View style={[styles.iconBox, { backgroundColor: '#E3F2FD' }]}>
              <Ionicons name="information-circle-outline" size={22} color="#1E88E5" />
            </View>
            <Text style={styles.itemText}>Versi Aplikasi</Text>
            <Text style={styles.versionText}>1.0.0</Text>
          </View>
        </View>

        <View style={styles.footer}>
          <Text style={styles.footerText}>Agenda Nusantara © 2026</Text>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  content: {
    padding: 20,
  },
  section: {
    marginBottom: 30,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#A0AEC0',
    marginBottom: 15,
    marginLeft: 5,
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 16,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#EDF2F7',
  },
  iconBox: {
    width: 40,
    height: 40,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  itemText: {
    flex: 1,
    fontSize: 16,
    color: '#2D3748',
    fontWeight: '600',
  },
  versionText: {
    fontSize: 14,
    color: '#A0AEC0',
  },
  footer: {
    marginTop: 20,
    alignItems: 'center',
  },
  footerText: {
    fontSize: 12,
    color: '#CBD5E0',
  },
});
