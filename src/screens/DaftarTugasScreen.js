import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useIsFocused } from '@react-navigation/native';
import CustomHeader from '../components/CustomHeader';
import { getTasks, toggleTask, deleteTask as removeTask } from '../database';
import styles from '../styles/DaftarTugasStyles';

export default function DaftarTugasScreen({ navigation }) {
  const [tasks, setTasks] = useState([]);
  const [expandedTaskId, setExpandedTaskId] = useState(null);
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
    const isExpanded = expandedTaskId === item.id;
    const d = new Date(item.due_date);
    const monthNames = ['Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'];
    const dateStr = `${d.getDate().toString().padStart(2, '0')} ${monthNames[d.getMonth()]} ${d.getFullYear()}`;

    return (
      <View style={[styles.taskCard, item.is_completed === 1 && styles.taskCompleted, { flexDirection: 'column', alignItems: 'stretch' }]}>
        {/* Area Utama (Bisa Diklik untuk Expand) */}
        <TouchableOpacity 
          style={{ flexDirection: 'row', alignItems: 'center' }}
          onPress={() => setExpandedTaskId(isExpanded ? null : item.id)}
          activeOpacity={0.7}
        >
          {/* Checkbox di sebelah kiri */}
          <TouchableOpacity 
            onPress={() => toggleComplete(item.id, item.is_completed)} 
            style={styles.checkboxContainer}
          >
            <Ionicons 
              name={item.is_completed === 1 ? 'checkbox' : 'square-outline'} 
              size={28} 
              color={item.is_completed === 1 ? '#439286' : '#CBD5E0'} 
            />
          </TouchableOpacity>

          {/* Informasi Tugas di tengah */}
          <View style={styles.taskInfo}>
            <Text style={[styles.taskTitle, item.is_completed === 1 && styles.textCompleted]}>
              {item.title}
            </Text>
            <Text style={styles.taskSubtitle}>
              {dateStr} · {item.category}
            </Text>
          </View>

          {/* Ikon panah di sebelah kanan */}
          <View style={styles.arrowContainer}>
            <Ionicons 
              name={isExpanded ? "chevron-down" : "play"} 
              size={20} 
              color={isImportant ? '#E53935' : '#4fa156'} 
            />
          </View>
        </TouchableOpacity>

        {/* Area Deskripsi & Delete (Hanya muncul jika di-expand) */}
        {isExpanded && (
          <View style={styles.expandedContent}>
            <Text style={styles.taskDescription}>
              {item.description || 'Tidak ada deskripsi untuk tugas ini.'}
            </Text>
            
            <TouchableOpacity style={styles.deleteButton} onPress={() => deleteTask(item.id)}>
              <Ionicons name="trash-outline" size={18} color="#E53935" />
              <Text style={styles.deleteText}>Hapus Tugas</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <CustomHeader 
        title="Daftar Tugas" 
        backgroundColor="#439286" 
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
