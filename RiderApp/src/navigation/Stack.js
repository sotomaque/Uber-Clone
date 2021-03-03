import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import Home from '../screens/Home';
import DestinationSearch from '../screens/DestinationSearch';
import SearchResults from '../screens/SearchResults';

const Stack = createStackNavigator();

const StackNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName={'Home'}
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name={'Home'} component={Home} />
      <Stack.Screen name={'DestinationSearch'} component={DestinationSearch} />
      <Stack.Screen name={'SearchResults'} component={SearchResults} />
    </Stack.Navigator>
  );
};

export default StackNavigator;
