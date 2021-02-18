import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    padding: 10,
    height: '100%',
  },
  textInput: {
    padding: 10,
    backgroundColor: '#eee',
    marginVertical: 5,
    marginLeft: 20,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
  },
  iconContainer: {
    backgroundColor: '#a2a2a2',
    padding: 5,
    borderRadius: 50,
    marginRight: 10,
  },
  autoCompleteContainer: {
    position: 'absolute',
    top: 0,
    left: 10,
    right: 10,
  },
  separator: {
    backgroundColor: '#eee',
    height: 1,
  },
  listView: {
    position: 'absolute',
    top: 102,
  },
  circle: {
    height: 5,
    width: 5,
    backgroundColor: 'black',
    borderRadius: 5,
    position: 'absolute',
    top: 20,
    left: 12,
  },
  line: {
    height: 60,
    width: 1,
    backgroundColor: '#919191',
    borderRadius: 5,
    position: 'absolute',
    top: 25,
    left: 14,
  },
  square: {
    height: 5,
    width: 5,
    backgroundColor: 'black',
    position: 'absolute',
    top: 80,
    left: 12,
  },
});

export default styles;
