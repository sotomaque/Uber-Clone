import React from 'react';
import { View, Image, Text, Pressable } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

import { images } from '../../constants';
import styles from './styles';

const UberTypeRow = ({ type, onPress, isSelected }) => {
  return (
    <Pressable
      style={[
        styles.container,
        { backgroundColor: isSelected ? '#eee' : '#fff' },
      ]}
      onPress={onPress}>
      {/* Uber Type Image */}
      {type?.type === 'UberX' && (
        <Image source={images.uberX} style={styles.image} />
      )}
      {type?.type === 'UberXL' && (
        <Image source={images.uberXL} style={styles.image} />
      )}
      {type?.type === 'Comfort' && (
        <Image source={images.comfort} style={styles.image} />
      )}

      <View style={styles.middleContainer}>
        <Text style={styles.uberTypeLabel}>
          {type.type}
          {'  '}
          <Ionicons name={'person'} size={16} />3
        </Text>
        <Text style={styles.timeLabel}>8:03PM drop off</Text>
      </View>
      <View style={styles.rightContainer}>
        <Ionicons name={'pricetag'} size={20} color={'#47d742'} />
        <Text style={styles.priceLabel}>est. ${type.price}</Text>
      </View>
    </Pressable>
  );
};

export default UberTypeRow;
