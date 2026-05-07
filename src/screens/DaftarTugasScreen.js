import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useIsFocused } from '@react-navigation/native';
import CustomHeader from '../components/CustomHeader';
import { getTasks, toggleTask, deleteTask as removeTask } from '../database/database';
import styles from '../styles/DaftarTugasStyles';

export default function DaftarTugasScreen({ navigation }) {
  const [tasks, setTasks] = useState([]);
  const isFocused = useIsFocused();

  const loadTasks = async () => {
    try {
      const allTasks = await getTasks();
      setTasks(allTasks);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (isFocused) {
      loadTasks();
    }
  }, [isFocused]);

  const toggleComplete = async (id, currentStatus) => {
    try {
      await toggleTask(id, currentStatus);
      loadTasks();
    } catch (error) {
      console.error(error);
    }
  };

  const deleteTask = (id) => {
    Alert.alert('Hapus Tugas', 'Apakah Anda yakin ingin menghapus tugas ini?', [
      { text: 'Batal', style: 'cancel' },
      {
        text: 'Hapus',
        style: 'destructive',
        onPress: async () => {
          try {
            await removeTask(id);
            loadTasks();
          } catch (error) {
            console.error(error);
          }
        }
      }
    ]);
  };

  const renderItem = ({ item }) => {
    const isImportant = item.category === 'Penting';
    const d = new Date(item.due_date);
    const dateStr = `${d.getDate().toString().padStart(2, '0')} ${['Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun', 'Jul', 'Agu', 'Sep', 'Okt', 'Nov', 'Des'][d.getMonth()]} ${d.getFullYear()}`;

    return (
      <View style={[styles.taskCard, item.is_completed === 1 && styles.taskCompleted]}>
        <View style={styles.taskInfo}>
          <Text style={[styles.taskTitle, item.is_completed === 1 && styles.textCompleted]}>
            {item.title}
          </Text>
          <Text style={styles.taskDesc} numberOfLines={2}>
            {item.description || 'Tidak ada deskripsi'}
          </Text>
          <View style={styles.badgeContainer}>
            <View style={[styles.badge, { backgroundColor: isImportant ? '#FFEBEE' : '#E3F2FD' }]}>
              <Text style={[styles.badgeText, { color: isImportant ? '#E53935' : '#1E88E5' }]}>
                {item.category.toUpperCase()}
              </Text>
            </View>
            <Text style={styles.dateText}>{dateStr}</Text>
          </View>
        </View>

        <View style={styles.actions}>
          <TouchableOpacity onPress={() => toggleComplete(item.id, item.is_completed)} style={styles.iconButton}>
            <Ionicons 
              name={item.is_completed === 1 ? 'checkmark-circle' : 'ellipse-outline'} 
              size={30} 
              color={item.is_completed === 1 ? '#27AE60' : '#CBD5E0'} 
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => deleteTask(item.id)} style={styles.iconButton}>
            <Ionicons name="trash-outline" size={24} color="#E53935" />
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <CustomHeader 
        title="Daftar Tugas" 
        backgroundColor="#27AE60" 
        showBackButton={true} 
      />

      {tasks.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Ionicons name="document-text-outline" size={80} color="#E2E8F0" />
          <Text style={styles.emptyText}>Belum Ada Tugas</Text>
          <Text style={styles.emptySubtitle}>Ayo mulai produktif hari ini!</Text>
        </View>
      ) : (
        <FlatList
          data={tasks}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderItem}
          contentContainerStyle={styles.listContainer}
          showsVerticalScrollIndicator={false}
        />
      )}
    </View>
  );
}
