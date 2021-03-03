import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
  },
  image: {
    height: 70,
    width: 70,
    resizeMode: 'contain',
  },
  middleContainer: {
    flex: 1,
    marginHorizontal: 10,
  },
  uberTypeLabel: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  timeLabel: {
    color: '#5d5d5d',
  },
  rightContainer: {
    width: 100,
    justifyContent: 'flex-end',
    flexDirection: 'row',
  },
  priceLabel: {
    fontWeight: '500',
    fontSize: 18,
    marginLeft: 5,
  },
});

export default styles;
