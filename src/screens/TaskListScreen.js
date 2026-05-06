import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useIsFocused } from '@react-navigation/native';
import { getTasks, toggleTask, deleteTask as removeTask } from '../database/database';

export default function TaskListScreen() {
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
    const dateStr = new Date(item.due_date).toLocaleDateString('id-ID');

    return (
      <View style={[styles.taskCard, item.is_completed && styles.taskCompleted]}>
        <View style={styles.taskInfo}>
          <Text style={[styles.taskTitle, item.is_completed && styles.textCompleted]}>
            {item.title}
          </Text>
          <Text style={styles.taskDesc} numberOfLines={2}>
            {item.description}
          </Text>
          <View style={styles.badgeContainer}>
            <View style={[styles.badge, { backgroundColor: isImportant ? '#FFEAEA' : '#EAF4FC' }]}>
              <Text style={[styles.badgeText, { color: isImportant ? '#E74C3C' : '#3498DB' }]}>
                {item.category}
              </Text>
            </View>
            <Text style={styles.dateText}>{dateStr}</Text>
          </View>
        </View>

        <View style={styles.actions}>
          <TouchableOpacity onPress={() => toggleComplete(item.id, item.is_completed)} style={styles.iconButton}>
            <Ionicons 
              name={item.is_completed ? 'checkmark-circle' : 'ellipse-outline'} 
              size={28} 
              color={item.is_completed ? '#2ECC71' : '#BDC3C7'} 
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => deleteTask(item.id)} style={styles.iconButton}>
            <Ionicons name="trash-outline" size={24} color="#E74C3C" />
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      {tasks.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Ionicons name="document-text-outline" size={60} color="#BDC3C7" />
          <Text style={styles.emptyText}>Belum ada tugas.</Text>
        </View>
      ) : (
        <FlatList
          data={tasks}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderItem}
          contentContainerStyle={styles.listContainer}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  listContainer: {
    padding: 15,
  },
  taskCard: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 15,
    marginBottom: 12,
    flexDirection: 'row',
    elevation: 2,
  },
  taskCompleted: {
    opacity: 0.7,
  },
  taskInfo: {
    flex: 1,
    paddingRight: 10,
  },
  taskTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  textCompleted: {
    textDecorationLine: 'line-through',
    color: '#7F8C8D',
  },
  taskDesc: {
    fontSize: 14,
    color: '#666',
    marginBottom: 10,
  },
  badgeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  badge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    marginRight: 10,
  },
  badgeText: {
    fontSize: 12,
    fontWeight: '600',
  },
  dateText: {
    fontSize: 12,
    color: '#95A5A6',
  },
  actions: {
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  iconButton: {
    padding: 5,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyText: {
    marginTop: 10,
    fontSize: 16,
    color: '#7F8C8D',
  },
});
