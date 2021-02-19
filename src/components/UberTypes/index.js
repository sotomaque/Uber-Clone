import React from 'react';
import { View, Text, Pressable } from 'react-native';
import UberTypeRow from '../UberTypeRow';

import typesData from '../../assets/data/types';
import styles from './styles';

const UberTypes = ({ typeState, onSubmit }) => {
  const [selectedType, setSelectedType] = typeState;

  return (
    <View>
      {typesData.map((type) => (
        <UberTypeRow
          key={type.id}
          type={type}
          onPress={() => setSelectedType(type.type)}
          isSelected={type.type === selectedType}
        />
      ))}
      <Pressable onPress={onSubmit} style={styles.button}>
        <Text style={styles.buttonLabel}>Confirm Uber</Text>
      </Pressable>
    </View>
  );
};

export default UberTypes;
