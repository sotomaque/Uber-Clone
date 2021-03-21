import React from 'react';
import { View, Dimensions } from 'react-native';
import CovidMessage from '../../components/CovidMessage';
import HomeMap from '../../components/HomeMap';
import HomeSearch from '../../components/HomeSearch';

const Home = () => {
  return (
    <View>
      <View style={{ height: Dimensions.get('window').height - 400 }}>
        <HomeMap />
      </View>
      {/* Covid Message */}
      <CovidMessage />
      {/* Bottom Component */}
      <HomeSearch />
    </View>
  );
};

export default Home;
