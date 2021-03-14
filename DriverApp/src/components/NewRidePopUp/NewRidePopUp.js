import React from 'react';
import {View, Text, Pressable} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

import styles from './styles';

const NewRidePopUp = () => {
  const onDecline = () => {
    console.warn('DECLINED');
  };
  const onAccept = () => {
    console.warn('onAccept');
  };

  return (
    <View style={styles.root}>
      <Pressable style={styles.declineButton} onPress={onDecline}>
        <Text style={styles.declineLabel}>Decline</Text>
      </Pressable>
      <Pressable style={styles.popupContainer} onPress={onAccept}>
        {/* Top Row */}
        <View style={styles.row}>
          <Text style={styles.uberType}>UberX</Text>
          <View style={styles.userBackground}>
            <FontAwesome name="user" color="white" size={35} />
          </View>
          <Text style={styles.uberType}>
            <AntDesign name="staro" size={18} color="white" />5
          </Text>
        </View>

        {/* ETA */}
        <Text style={styles.min}>2 min</Text>
        <Text style={styles.distance}>0.4 mi</Text>
      </Pressable>
    </View>
  );
};

export default NewRidePopUp;
