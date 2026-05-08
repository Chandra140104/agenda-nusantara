import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  topHeader: {
    backgroundColor: '#0066CC',
    height: 60,
    paddingHorizontal: 20,
    justifyContent: 'center',
  },
  topHeaderText: {
    fontSize: 22,
    fontWeight: 'bold',
    color: 'white',
  },
  welcomeSection: {
    padding: 20,
    marginTop: 10,
  },
  welcomeText: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#1A202C',
  },
  dateText: {
    fontSize: 16,
    color: '#718096',
    marginTop: 5,
  },
  gridContainer: {
    paddingHorizontal: 15,
    paddingTop: 0, // Setel ke 0 agar jarak murni dari margin chartCard
    paddingBottom: 15,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  card: {
    width: '48%',
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 15,
    alignItems: 'center',
    marginBottom: 15,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  iconContainer: {
    width: 60,
    height: 60,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  cardTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
    textAlign: 'center',
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  statsCard: {
    width: '48%',
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    elevation: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
  },
  statsLabel: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#718096',
    marginBottom: 5,
  },
  statsNumber: {
    fontSize: 32,
    fontWeight: 'bold',
  },
  chartCard: {
    backgroundColor: 'white',
    paddingVertical: 10, // Padding atas dan bawah 10px
    paddingHorizontal: 20, // Padding kiri dan kanan tetap 20px
    borderRadius: 16,
    marginHorizontal: 20,
    marginBottom: 20, // Setel ke 20 agar sama dengan jarak stats ke chart
    borderWidth: 1,
    borderColor: '#E2E8F0',
    elevation: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
  },
  chartTitle: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#718096',
    marginBottom: 20, // Kembalikan ke 20 agar grafik bergeser ke bawah
  },
  chartContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end', // Ini penting agar grafik tumbuh ke atas
    height: 75, // Kurangi tinggi area grafik agar total tinggi box 150px
  },
  barWrapper: {
    alignItems: 'center',
    flex: 1,
  },
  bar: {
    width: 25,
    backgroundColor: '#0066CC', // Warna biru sesuai permintaan
    borderRadius: 4,
  },
  barLabel: {
    marginTop: 8,
    fontSize: 12,
    color: '#A0AEC0',
    fontWeight: '600',
  },
});
