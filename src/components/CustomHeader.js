import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';

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

const styles = StyleSheet.create({
  header: {
    height: 60,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 15,
  },
  backButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  placeholder: {
    width: 40,
  },
  title: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
    flex: 1,
  },
  titleCenter: {
    textAlign: 'left', // Home screen usually left-aligned, but we can make it dynamic if needed
    paddingLeft: 5,
  },
  titleWithBack: {
    textAlign: 'center',
  },
});

export default CustomHeader;
