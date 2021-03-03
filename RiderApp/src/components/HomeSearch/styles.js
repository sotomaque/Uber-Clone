import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  inputContainer: {
    backgroundColor: '#eeeeee',
    margin: 10,
    padding: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  inputText: {
    fontSize: 20,
    fontWeight: '400',
    color: '#6e6e6e',
  },
  timeContainer: {
    flexDirection: 'row',
    width: 95,
    justifyContent: 'space-between',
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 15,
  },
  row: {
    flexDirection: 'row',
    padding: 15,
    alignItems: 'center',
    borderBottomWidth: 1,
    borderColor: '#eeeeee',
  },
  iconContainer: {
    backgroundColor: '#b3b3b3',
    padding: 6,
    borderRadius: 25,
  },
  destinationText: {
    fontSize: 16,
    fontWeight: '500',
    marginLeft: 15,
  },
});

export default styles;
