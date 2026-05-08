import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F7FAFC', // Slightly grey background like in image
  },
  header: {
    backgroundColor: '#439286',
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
    marginRight: 32,
  },
  backButton: {
    padding: 5,
  },
  listContainer: {
    padding: 20,
    paddingBottom: 40,
  },
  taskCard: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E2E8F0',
    elevation: 1, // Subtle shadow
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
  },
  taskCompleted: {
    backgroundColor: '#F7FAFC',
  },
  checkboxContainer: {
    marginRight: 15,
  },
  taskInfo: {
    flex: 1,
  },
  taskTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2D3748',
    marginBottom: 4,
  },
  textCompleted: {
    textDecorationLine: 'line-through',
    color: '#A0AEC0',
  },
  taskSubtitle: {
    fontSize: 14,
    color: '#718096',
  },
  arrowContainer: {
    marginLeft: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 40,
  },
  emptyText: {
    marginTop: 15,
    fontSize: 18,
    color: '#A0AEC0',
    fontWeight: '600',
    textAlign: 'center',
  },
  emptySubtitle: {
    marginTop: 5,
    fontSize: 14,
    color: '#CBD5E0',
    textAlign: 'center',
  },
});
