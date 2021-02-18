/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */
import 'react-native-gesture-handler';

import React from 'react';
import { StatusBar } from 'react-native';

import SearchResultsScreen from './src/screens/SearchResultsScreen';
import HomeScreen from './src/screens/HomeScreen';

const App: () => React$Node = () => {
  return (
    <>
      <StatusBar barStyle="dark-content" />
      <SearchResultsScreen />
    </>
  );
};

export default App;
