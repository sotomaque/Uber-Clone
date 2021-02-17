import React from 'react';
import { View, Text } from 'react-native';
import CovidMessage from '../../components/CovidMessage';
import HomeMap from '../../components/HomeMap';
import HomeSearch from '../../components/HomeSearch';

const HomeScreen = () => {
  return (
    <View>
      <HomeMap />

      {/* Covid Message */}
      <CovidMessage />

      {/* Bottom Component */}
      <HomeSearch />
    </View>
  );
};

export default HomeScreen;
