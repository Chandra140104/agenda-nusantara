import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useIsFocused } from '@react-navigation/native';
import CustomHeader from '../components/CustomHeader';
import { getTasks } from '../database';
import styles from '../styles/HomeStyles';

export default function HomeScreen({ navigation }) {
  const [completedCount, setCompletedCount] = useState(0);
  const [pendingCount, setPendingCount] = useState(0);
  const [chartData, setChartData] = useState([
    { day: 'Sen', value: 0 },
    { day: 'Sel', value: 0 },
    { day: 'Rab', value: 0 },
    { day: 'Kam', value: 0 },
    { day: 'Jum', value: 0 },
    { day: 'Sab', value: 0 },
    { day: 'Min', value: 0 },
  ]);
  const isFocused = useIsFocused();

  const menuItems = [
    { title: 'Tambah Tugas Penting', icon: 'alert-circle', route: 'AddImportantTask', color: '#E74C3C' },
    { title: 'Tambah Tugas Biasa', icon: 'clipboard', route: 'AddRegularTask', color: '#4fa156' },
    { title: 'Daftar Tugas', icon: 'list', route: 'TaskList', color: '#3B82F6' },
    { title: 'Pengaturan', icon: 'settings', route: 'Settings', color: '#64748B' },
  ];

  const currentDate = new Date().toLocaleDateString('id-ID', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  useEffect(() => {
    const loadStats = async () => {
      try {
        const tasks = await getTasks();
        
        // Hitung total selesai dan belum selesai
        const completed = tasks.filter(t => t.is_completed === 1).length;
        const pending = tasks.filter(t => t.is_completed === 0).length;
        setCompletedCount(completed);
        setPendingCount(pending);

        // Hitung tugas selesai per hari (berdasarkan due_date)
        const completedTasks = tasks.filter(t => t.is_completed === 1);
        const dayCounts = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0, 0: 0 }; // 1: Sen, ..., 0: Min
        
        completedTasks.forEach(task => {
          if (task.due_date) {
            const date = new Date(task.due_date);
            const day = date.getDay();
            dayCounts[day] += 1;
          }
        });

        setChartData([
          { day: 'Sen', value: dayCounts[1] },
          { day: 'Sel', value: dayCounts[2] },
          { day: 'Rab', value: dayCounts[3] },
          { day: 'Kam', value: dayCounts[4] },
          { day: 'Jum', value: dayCounts[5] },
          { day: 'Sab', value: dayCounts[6] },
          { day: 'Min', value: dayCounts[0] },
        ]);

      } catch (error) {
        console.error(error);
      }
    };

    if (isFocused) {
      loadStats();
    }
  }, [isFocused]);

  // Cari nilai maksimum untuk skala grafik
  const maxVal = Math.max(...chartData.map(d => d.value), 0);
  const scale = maxVal > 0 ? 50 / maxVal : 0; // Maksimal tinggi batang 50px agar muat di box 150px

  return (
    <View style={styles.container}>
      <CustomHeader title="Beranda" backgroundColor="#0066CC" />
      
      <ScrollView>
        <View style={styles.welcomeSection}>
          <Text style={styles.welcomeText}>Halo, User! 👋</Text>
          <Text style={styles.dateText}>{currentDate}</Text>
        </View>

        {/* Statistik Tugas */}
        <View style={styles.statsContainer}>
          <View style={styles.statsCard}>
            <Text style={styles.statsLabel}>TUGAS SELESAI</Text>
            <Text style={[styles.statsNumber, { color: '#27AE60' }]}>{completedCount}</Text>
          </View>
          <View style={styles.statsCard}>
            <Text style={styles.statsLabel}>BELUM SELESAI</Text>
            <Text style={[styles.statsNumber, { color: '#C0392B' }]}>{pendingCount}</Text>
          </View>
        </View>

        {/* Grafik Tugas Selesai / Hari */}
        <View style={styles.chartCard}>
          <Text style={styles.chartTitle}>TUGAS SELESAI / HARI</Text>
          
          <View style={styles.chartContainer}>
            {/* Bar untuk setiap hari */}
            {chartData.map((item, index) => (
              <View key={index} style={styles.barWrapper}>
                <View style={[styles.bar, { height: item.value * scale }]} />
                <Text style={styles.barLabel}>{item.day}</Text>
              </View>
            ))}
          </View>
        </View>

        <View style={styles.gridContainer}>
          {menuItems.map((item, index) => (
            <TouchableOpacity 
              key={index} 
              style={styles.card}
              onPress={() => navigation.navigate(item.route)}
            >
              <View style={[styles.iconContainer, { backgroundColor: item.color }]}>
                <Ionicons name={item.icon} size={30} color="white" />
              </View>
              <Text style={styles.cardTitle}>{item.title}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </View>
  );
}
