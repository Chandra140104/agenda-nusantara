import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  header: {
    backgroundColor: '#C0392B',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    height: 60,
  },
  headerTitle: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
    flex: 1,
    textAlign: 'center',
    marginRight: 32, // Match the back button space
  },
  backButton: {
    padding: 5,
  },
  content: {
    padding: 25,
  },
  badge: {
    backgroundColor: '#FFEBEE',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 8,
    alignSelf: 'flex-start',
    marginBottom: 25,
  },
  badgeText: {
    color: '#E53935',
    fontWeight: 'bold',
    fontSize: 12,
  },
  label: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#4A5568',
    marginBottom: 10,
    marginTop: 5,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E2E8F0',
    borderRadius: 12,
    paddingHorizontal: 15,
    marginBottom: 20,
    backgroundColor: 'white',
  },
  input: {
    flex: 1,
    paddingVertical: 14,
    fontSize: 16,
    color: '#2D3748',
  },
  textArea: {
    height: 75,
    textAlignVertical: 'top',
  },
  saveButton: {
    backgroundColor: '#C0392B',
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 20,
  },
  saveButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    letterSpacing: 1,
  },
  dateDisplay: {
    fontSize: 16,
    color: '#2D3748',
  },
});
