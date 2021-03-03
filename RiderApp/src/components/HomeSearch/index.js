import React from 'react';
import { View, Text, Pressable } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import AntDesign from 'react-native-vector-icons/AntDesign';
import Entypo from 'react-native-vector-icons/Entypo';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import styles from './styles';

const HomeSearch = () => {
  const navigation = useNavigation();
  return (
    <View>
      {/* Input Box */}
      <Pressable
        style={styles.inputContainer}
        onPress={() => navigation.navigate('DestinationSearch')}>
        <Text style={styles.inputText}>Where To?</Text>
        <View style={styles.timeContainer}>
          <AntDesign name={'clockcircle'} size={16} color={'#535353'} />
          <Text>Now</Text>
          <MaterialIcons name={'keyboard-arrow-down'} size={16} />
        </View>
      </Pressable>
      {/* Previous destination */}
      <View style={styles.row}>
        <View style={styles.iconContainer}>
          <AntDesign name={'clockcircle'} size={16} color={'#ffffff'} />
        </View>
        <Text style={styles.destinationText}>Spin Nightclub</Text>
      </View>
      {/* Home */}
      <View style={styles.row}>
        <View style={[styles.iconContainer, { backgroundColor: '#218cff' }]}>
          <Entypo name={'home'} size={16} color={'#ffffff'} />
        </View>
        <Text style={styles.destinationText}>Home</Text>
      </View>
    </View>
  );
};

export default HomeSearch;
