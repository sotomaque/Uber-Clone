import {Dimensions, StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  bottomContainer: {
    height: 100,
    backgroundColor: 'white',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
  },
  bottomText: {
    fontSize: 22,
    color: '#4a4a4a',
  },
  roundButton: {
    position: 'absolute',
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 25,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
  },
  goButton: {
    position: 'absolute',
    backgroundColor: '#1495ff',
    width: 80,
    height: 80,
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
    bottom: 110,
    left: Dimensions.get('window').width / 2 - 40,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.5,
    shadowRadius: 2.62,
  },
  goButtonLabel: {
    fontSize: 30,
    color: 'white',
    fontWeight: 'bold',
  },
  balanceButton: {
    position: 'absolute',
    backgroundColor: '#1c1c1c',
    width: 100,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 50,
    top: 35,
    left: Dimensions.get('window').width / 2 - 50,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.5,
    shadowRadius: 2.62,
  },
  balanceLabel: {
    fontSize: 22,
    color: 'white',
    fontWeight: 'bold',
  },
});
export default styles;
