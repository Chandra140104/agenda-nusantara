import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, Platform, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import CustomHeader from '../components/CustomHeader';
import DateTimePicker from '@react-native-community/datetimepicker';
import { addTask } from '../database/database';
import styles from '../styles/TambahTugasBiasaStyles';

export default function TambahTugasBiasaScreen({ navigation }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);

  const handleSave = async () => {
    if (!title.trim()) {
      Alert.alert('Error', 'Judul tugas tidak boleh kosong');
      return;
    }

    try {
      await addTask(title, description, date.toISOString(), 'Biasa');
      Alert.alert('Sukses', 'Tugas biasa berhasil ditambahkan!', [
        { text: 'OK', onPress: () => navigation.goBack() }
      ]);
    } catch (error) {
      console.error(error);
      Alert.alert('Error', 'Gagal menyimpan tugas');
    }
  };

  const onDateChange = (event, selectedDate) => {
    setShowDatePicker(Platform.OS === 'ios');
    if (selectedDate) {
      setDate(selectedDate);
    }
  };

  const formatDate = (date) => {
    const d = new Date(date);
    const day = d.getDate().toString().padStart(2, '0');
    const monthNames = ['Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'];
    const month = monthNames[d.getMonth()];
    const year = d.getFullYear();
    return `${day} ${month} ${year}`;
  };

  return (
    <View style={styles.container}>
      <CustomHeader 
        title="Tambah Tugas Biasa" 
        backgroundColor="#2980B9" 
        showBackButton={true} 
      />

      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.badge}>
          <Text style={styles.badgeText}>BIASA</Text>
        </View>

        <Text style={styles.label}>TANGGAL JATUH TEMPO</Text>
        <TouchableOpacity style={styles.inputWrapper} onPress={() => setShowDatePicker(true)}>
          <Ionicons name="calendar-outline" size={20} color="#718096" style={{ marginRight: 10 }} />
          <View style={styles.input}>
            <Text style={styles.dateDisplay}>{formatDate(date)}</Text>
          </View>
        </TouchableOpacity>

        <Text style={styles.label}>JUDUL TUGAS</Text>
        <View style={styles.inputWrapper}>
          <TextInput
            style={styles.input}
            placeholder="Contoh: Belanja bulanan"
            placeholderTextColor="#A0AEC0"
            value={title}
            onChangeText={setTitle}
          />
        </View>

        <Text style={styles.label}>DESKRIPSI</Text>
        <View style={[styles.inputWrapper, { alignItems: 'flex-start' }]}>
          <TextInput
            style={[styles.input, styles.textArea]}
            placeholder="Jelaskan tugas..."
            placeholderTextColor="#A0AEC0"
            value={description}
            onChangeText={setDescription}
            multiline
            numberOfLines={4}
          />
        </View>

        {showDatePicker && (
          <DateTimePicker
            value={date}
            mode="date"
            display="default"
            onChange={onDateChange}
          />
        )}

        <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
          <Text style={styles.saveButtonText}>SIMPAN</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}
