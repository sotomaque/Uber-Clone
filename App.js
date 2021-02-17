/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */
import 'react-native-gesture-handler';

import React from 'react';
import { StatusBar, Text } from 'react-native';

import Icon from 'react-native-vector-icons/FontAwesome';

const App: () => React$Node = () => {
  return (
    <>
      <StatusBar barStyle="dark-content" />
      <Text>Hi</Text>
      <Icon name={'rocket'} size={30} />
    </>
  );
};

export default App;
