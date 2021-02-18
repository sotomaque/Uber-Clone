import React from 'react';
import { View, Text, Pressable } from 'react-native';
import UberTypeRow from '../UberTypeRow';

import typesData from '../../assets/data/types';
import styles from './styles';

const UberTypes = () => {
  const handleOnPress = () => {
    console.log('handleOnPress');
  };
  return (
    <View>
      {typesData.map((type) => (
        <UberTypeRow key={type.id} type={type} />
      ))}
      <Pressable onPress={handleOnPress} style={styles.button}>
        <Text style={styles.buttonLabel}>Confirm Uber</Text>
      </Pressable>
    </View>
  );
};

export default UberTypes;
