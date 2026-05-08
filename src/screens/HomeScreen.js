import React from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import CustomHeader from '../components/CustomHeader';
import styles from '../styles/HomeStyles';

export default function HomeScreen({ navigation }) {
  const menuItems = [
    { title: 'Tambah Tugas Penting', icon: 'alert-circle', route: 'AddImportantTask', color: '#E74C3C' },
    { title: 'Tambah Tugas Biasa', icon: 'clipboard', route: 'AddRegularTask', color: '#4fa156' },
    { title: 'Daftar Tugas', icon: 'list', route: 'TaskList', color: '#439286' },
    { title: 'Pengaturan', icon: 'settings', route: 'Settings', color: '#439286' },
  ];

  const currentDate = new Date().toLocaleDateString('id-ID', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  return (
    <View style={styles.container}>
      <CustomHeader title="Beranda" backgroundColor="#0066CC" />
      
      <ScrollView>
        <View style={styles.welcomeSection}>
          <Text style={styles.welcomeText}>Halo, User! 👋</Text>
          <Text style={styles.dateText}>{currentDate}</Text>
        </View>

        <View style={styles.gridContainer}>
          {menuItems.map((item, index) => (
            <TouchableOpacity 
              key={index} 
              style={styles.card}
              onPress={() => navigation.navigate(item.route)}
            >
              <View style={[styles.iconContainer, { backgroundColor: item.color + '20' }]}>
                <Ionicons name={item.icon} size={30} color={item.color} />
              </View>
              <Text style={styles.cardTitle}>{item.title}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </View>
  );
}
