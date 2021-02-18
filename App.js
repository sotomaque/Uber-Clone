/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */
import 'react-native-gesture-handler';

import React from 'react';
import { StatusBar, PermissionsAndroid, Platform } from 'react-native';
import Geolocation from '@react-native-community/geolocation';

import DestinationSearchScreen from './src/screens/DestinationSearchScreen';
import SearchResultsScreen from './src/screens/SearchResultsScreen';
import HomeScreen from './src/screens/HomeScreen';

navigator.geolocation = require('@react-native-community/geolocation');

const App: () => React$Node = () => {
  const androidPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          title: 'UberClone App Location Permission',
          message:
            'Uber App needs access to your location ' +
            'so you can take awesome rides.',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log('You can use the location');
      } else {
        console.log('Location permission denied');
      }
    } catch (err) {
      console.warn(err);
    }
  };

  React.useEffect(() => {
    if (Platform.OS === 'android') {
      androidPermission();
    } else {
      // IOS
      Geolocation.requestAuthorization();
    }
  }, []);

  return (
    <>
      <StatusBar barStyle="dark-content" />
      <DestinationSearchScreen />
    </>
  );
};

export default App;
