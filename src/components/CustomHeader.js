import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import styles from '../styles/CustomHeaderStyles';

const CustomHeader = ({ title, backgroundColor = '#0066CC', showBackButton = false }) => {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation();

  return (
    <View>
      {/* Status Bar Spacer */}
      <View style={{ height: insets.top, backgroundColor: 'white' }} />
      
      {/* Header Bar */}
      <View style={[styles.header, { backgroundColor }]}>
        {showBackButton && (
          <TouchableOpacity 
            onPress={() => navigation.goBack()} 
            style={styles.backButton}
          >
            <Ionicons name="chevron-back" size={24} color="white" />
          </TouchableOpacity>
        )}

        <Text style={[styles.title, showBackButton ? styles.titleWithBack : styles.titleCenter]}>
          {title}
        </Text>

        {/* Right placeholder to keep title centered when back button is shown */}
        {showBackButton && <View style={styles.placeholder} />}
      </View>
    </View>
  );
};

export default CustomHeader;
