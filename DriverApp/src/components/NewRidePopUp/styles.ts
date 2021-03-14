import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  root: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    padding: 20,
    height: '100%',
    justifyContent: 'space-between',
    backgroundColor: '#00000099',
  },
  popupContainer: {
    backgroundColor: 'black',
    borderRadius: 10,
    height: 250,
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 10,
  },
  uberType: {
    color: 'white',
    fontSize: 20,
    marginHorizontal: 10,
  },
  userBackground: {
    backgroundColor: '#008bff',
    height: 60,
    width: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  min: {
    color: 'lightgrey',
    fontSize: 33,
  },
  distance: {
    color: 'lightgrey',
    fontSize: 20,
  },
  declineButton: {
    backgroundColor: 'black',
    padding: 20,
    borderRadius: 40,
    width: 100,
    alignItems: 'center',
  },
  declineLabel: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default styles;
