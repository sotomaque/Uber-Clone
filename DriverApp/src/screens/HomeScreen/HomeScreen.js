/* eslint-disable react-native/no-inline-styles */
import React, {useEffect, useState} from 'react';
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
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';

import {NewRidePopUp} from '../../components';

import styles from './styles';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const GOOGLE_MAPS_APIKEY = 'AIzaSyCc2S9XzrUb4Xtz1sGGGbgZWe-m-qcNZzU';

const HomeScreen = () => {
  const [isOnline, setIsOnline] = useState(false);
  const [myPosition, setMyPostion] = useState(null);
  const [order, setOrder] = useState(null);
  const [newOrder, setNewOrder] = useState({
    id: '1',
    type: 'UberX',
    originLatitude: 47.684984,
    originLongitude: -122.12139,
    destLatitude: 47.984984,
    destLongitude: -122.16139,
    user: {
      name: 'Enrique',
      rating: 4.98,
    },
  });

  const onGoPress = () => {
    setIsOnline(!isOnline);
  };

  const onAccept = acceptedOrder => {
    setOrder(acceptedOrder);
    setNewOrder(null);
  };

  const onDecline = () => {
    setNewOrder(null);
  };

  const renderBottomTitle = () => {
    // Label when we are finishing a ride
    if (order && order.isRideCompleted) {
      return (
        <View style={{alignItems: 'center'}}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: '#cb1a1a',
              width: 200,
              padding: 10,
              borderRadius: 5,
            }}>
            <Text style={{color: 'white', fontWeight: 'bold'}}>
              Complete {order.type?.toUpperCase()}
            </Text>
          </View>
          <Text style={styles.bottomText}>{order.user?.name}</Text>
        </View>
      );
    }
    // Label when we are in the middle of giving a rider a ride
    if (order && order.isPickedUp) {
      return (
        <View style={{alignItems: 'center'}}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Text>{order.duration?.toFixed(2)} min</Text>
            <View
              style={{
                marginHorizontal: 10,
                backgroundColor: '#d41212',
                width: 40,
                height: 40,
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: 20,
              }}>
              <FontAwesome name="user" color="white" size={20} />
            </View>
            <Text>{order.distance?.toFixed(2)} mi</Text>
          </View>
          <Text style={styles.bottomText}>Dropping off {order.user?.name}</Text>
        </View>
      );
    }

    // Label when we are picking up a rider
    if (order) {
      return (
        <View style={{alignItems: 'center'}}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Text>{order.duration?.toFixed(2)} min</Text>
            <View
              style={{
                marginHorizontal: 10,
                backgroundColor: '#48d42a',
                width: 40,
                height: 40,
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: 20,
              }}>
              <FontAwesome name="user" color="white" size={20} />
            </View>
            <Text>{order.distance?.toFixed(2)} mi</Text>
          </View>
          <Text style={styles.bottomText}>Picking up {order.user?.name}</Text>
        </View>
      );
    }

    // labels for when we dont have a rider
    if (isOnline) {
      return <Text style={styles.bottomText}>You Are Online</Text>;
    } else {
      return <Text style={styles.bottomText}>You Are Offline</Text>;
    }
  };

  const onUserLocationChange = event => {
    setMyPostion(event.nativeEvent.coordinate);
  };

  const onDirectionsFound = event => {
    console.log('eventd', event.distance);
    order &&
      setOrder({
        ...order,
        distance: event.distance,
        duration: event.duration,
        // event distance is constantly changing
        // if we have picked up user, event distance is distance to
        // riders destination else its distance to riders pickup location
        isPickedUp: order.isPickedUp || event.distance < 0.2,
        isRideCompleted: order.isPickedUp && event.distance < 0.2,
      });
  };

  const getDestination = () => {
    if (order && order.isPickedUp) {
      return {
        latitude: order.destLatitude,
        longitude: order.destLongitude,
      };
    }
    return {
      latitude: order.originLatitude,
      longitude: order.originLongitude,
    };
  };

  return (
    <View>
      <MapView
        showsUserLocation
        onUserLocationChange={onUserLocationChange}
        style={{width: windowWidth, height: windowHeight - 150}}
        provider={PROVIDER_GOOGLE}
        initialRegion={{
          latitude: 47.624984,
          longitude: -122.13339,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}>
        {order && (
          <MapViewDirections
            onReady={onDirectionsFound}
            strokeWidth={5}
            strokeColor="black"
            origin={myPosition}
            destination={getDestination()}
            apikey={GOOGLE_MAPS_APIKEY}
          />
        )}
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
        {renderBottomTitle()}
        <Entypo name="menu" size={24} color="#4a4a4a" />
      </View>

      {/* New Ride Pop Up */}
      {newOrder && (
        <NewRidePopUp
          newOrder={newOrder}
          onDecline={onDecline}
          onAccept={() => onAccept(newOrder)}
          duration={2}
          distance={0.5}
        />
      )}
    </View>
  );
};

export default HomeScreen;
