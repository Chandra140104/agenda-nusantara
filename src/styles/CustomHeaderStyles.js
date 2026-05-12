import { StyleSheet } from 'react-native';

export default StyleSheet.create({
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
    textAlign: 'left',
    paddingLeft: 5,
  },
  titleWithBack: {
    textAlign: 'center',
  },
});
