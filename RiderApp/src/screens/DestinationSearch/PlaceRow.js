import React from 'react';
import { View, Text } from 'react-native';

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Entypo from 'react-native-vector-icons/Entypo';
import styles from './styles';

const PlaceRow = ({ data }) => {
  return (
    <View style={styles.row}>
      <View style={styles.iconContainer}>
        {data?.description === 'Home' && (
          <Entypo name="home" size={20} color={'white'} />
        )}
        {data?.description === 'Work' && (
          <MaterialCommunityIcons
            name="office-building"
            size={20}
            color={'white'}
          />
        )}
        {data?.description !== 'Home' && data?.description !== 'Work' && (
          <Entypo name="location-pin" size={20} color={'white'} />
        )}
      </View>
      <Text style={styles.locationText}>
        {data?.description || data?.vicinity}
      </Text>
    </View>
  );
};

export default PlaceRow;
