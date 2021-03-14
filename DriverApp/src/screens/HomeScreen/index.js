import React, {useState} from 'react';
import {
  View,
  Dimensions,
  Text,
  Pressable,
  TouchableOpacity,
} from 'react-native';
import MapView, {PROVIDER_GOOGLE} from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions';
import Entypo from 'react-native-vector-icons/Entypo';
import Ionicons from 'react-native-vector-icons/Ionicons';

import {NewRidePopUp} from '../../components';

import styles from './styles';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const GOOGLE_MAPS_APIKEY = 'AIzaSyCc2S9XzrUb4Xtz1sGGGbgZWe-m-qcNZzU';

const HomeScreen = () => {
  const [isOnline, setIsOnline] = useState(false);
  const origin = {latitude: 37.3318456, longitude: -122.0296002};
  const destination = {latitude: 37.771707, longitude: -122.4053769};

  const onGoPress = () => {
    setIsOnline(!isOnline);
  };

  return (
    <View>
      <MapView
        showsUserLocation
        style={{width: windowWidth, height: windowHeight - 150}}
        provider={PROVIDER_GOOGLE}
        initialRegion={{
          latitude: 47.624984,
          longitude: -122.13339,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}>
        <MapViewDirections
          origin={origin}
          destination={destination}
          apikey={GOOGLE_MAPS_APIKEY}
        />
      </MapView>
      {/* Balance */}
      <Pressable
        style={styles.balanceButton}
        onPress={() => {
          console.log('pressed');
        }}>
        <Text style={styles.balanceLabel}>
          <Text style={{color: 'grey'}}>$</Text> 0.00
        </Text>
      </Pressable>
      {/* Corner Buttons */}
      <Pressable
        style={[
          styles.roundButton,
          {
            top: 35,
            left: 15,
          },
        ]}
        onPress={() => {
          console.log('pressed');
        }}>
        <Ionicons name="options-outline" size={24} color="#4a4a4a" />
      </Pressable>
      <Pressable
        style={[
          styles.roundButton,
          {
            top: 35,
            right: 15,
          },
        ]}
        onPress={() => {
          console.log('pressed');
        }}>
        <Ionicons name="options-outline" size={24} color="#4a4a4a" />
      </Pressable>
      <Pressable
        style={[
          styles.roundButton,
          {
            bottom: 110,
            left: 15,
          },
        ]}
        onPress={() => {
          console.log('pressed');
        }}>
        <Ionicons name="options-outline" size={24} color="#4a4a4a" />
      </Pressable>
      <Pressable
        style={[
          styles.roundButton,
          {
            bottom: 110,
            right: 15,
          },
        ]}
        onPress={() => {
          console.log('pressed');
        }}>
        <Ionicons name="options-outline" size={24} color="#4a4a4a" />
      </Pressable>

      {/* Go Round Button */}
      <TouchableOpacity style={styles.goButton} onPress={onGoPress}>
        <Text style={styles.goButtonLabel}>{!isOnline ? 'GO' : 'End'}</Text>
      </TouchableOpacity>

      {/* Bottom Sheet */}
      <View style={styles.bottomContainer}>
        <Ionicons name="options-outline" size={24} color="#4a4a4a" />
        {isOnline ? (
          <Text style={styles.bottomText}>You Are Online</Text>
        ) : (
          <Text style={styles.bottomText}>You Are Offline</Text>
        )}
        <Entypo name="menu" size={24} color="#4a4a4a" />
      </View>

      {/* New Ride Pop Up */}
      <NewRidePopUp />
    </View>
  );
};

export default HomeScreen;
