import React from 'react';
import { View, Text } from 'react-native';

import styles from './styles';

const CovidMessage = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Travel only if necessary</Text>
      <Text style={styles.text}>
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quibusdam fuga
        tempore facilis rem alias voluptatem eveniet earum voluptatum
        consectetur obcaecati minima minus voluptate illo excepturi natus,
        dolores aliquam inventore sunt?
      </Text>
      <Text style={styles.learnMore}>Learn More.</Text>
    </View>
  );
};

export default CovidMessage;
