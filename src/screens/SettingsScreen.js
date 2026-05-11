import { useState } from 'react';
import { Alert, Image, ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';
import CustomHeader from '../components/CustomHeader';
import { changePassword } from '../database';
import styles from '../styles/SettingsStyles';

export default function SettingsScreen({ navigation }) {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');

  const handleSavePassword = async () => {
    if (!currentPassword || !newPassword) {
      Alert.alert('Error', 'Semua field harus diisi');
      return;
    }

    try {
      // Menggunakan username default 'user' karena aplikasi belum memiliki sistem multi-user/sesi
      await changePassword('user', currentPassword, newPassword);
      Alert.alert('Sukses', 'Password berhasil diubah!');
      setCurrentPassword('');
      setNewPassword('');
    } catch (error) {
      Alert.alert('Error', error.message || 'Gagal mengubah password');
    }
  };

  const handleLogout = () => {
    Alert.alert('Logout', 'Apakah Anda yakin ingin keluar?', [
      { text: 'Batal', style: 'cancel' },
      { text: 'Keluar', style: 'destructive', onPress: () => navigation.replace('Login') }
    ]);
  };

  return (
    <View style={styles.container}>
      <CustomHeader
        title="Pengaturan"
        backgroundColor="#439286"
        showBackButton={true}
      />

      <ScrollView contentContainerStyle={styles.content}>
        {/* Section Ganti Password */}
        <Text style={styles.sectionTitle}>GANTI PASSWORD</Text>
        <View style={styles.card}>
          <Text style={styles.label}>PASSWORD SAAT INI</Text>
          <View style={styles.inputWrapper}>
            <TextInput
              style={styles.input}
              placeholder="••••"
              placeholderTextColor="#A0AEC0"
              value={currentPassword}
              onChangeText={setCurrentPassword}
              secureTextEntry
            />
          </View>

          <Text style={styles.label}>PASSWORD BARU</Text>
          <View style={styles.inputWrapper}>
            <TextInput
              style={styles.input}
              placeholder="••••••••"
              placeholderTextColor="#A0AEC0"
              value={newPassword}
              onChangeText={setNewPassword}
              secureTextEntry
            />
          </View>

          <TouchableOpacity style={styles.saveButton} onPress={handleSavePassword}>
            <Text style={styles.saveButtonText}>SIMPAN PASSWORD</Text>
          </TouchableOpacity>
        </View>

        {/* Section Developer */}
        <Text style={styles.sectionTitle}>DEVELOPER</Text>
        <View style={styles.card}>
          <View style={styles.developerContainer}>
            <Image
              source={require('../../assets/images/profile.png')}
              style={styles.avatarImage}
            />
            <View style={styles.devInfo}>
              <Text style={styles.devName}>[Chandra Bagus Sulaksono]</Text>
              <Text style={styles.devNim}>NIM: [2241760079]</Text>
              <Text style={styles.devRole}>DEVELOPER APLIKASI</Text>
            </View>
          </View>
        </View>

        {/* Tombol Logout */}
        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <Text style={styles.logoutButtonText}>KELUAR AKUN</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}
