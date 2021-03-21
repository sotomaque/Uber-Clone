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

import {API, graphqlOperation, Auth} from 'aws-amplify';
import {getCar, listOrders} from '../../graphql/queries';
import {updateCar, updateOrder} from '../../graphql/mutations';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const GOOGLE_MAPS_APIKEY = 'AIzaSyCc2S9XzrUb4Xtz1sGGGbgZWe-m-qcNZzU';

const HomeScreen = () => {
  const [car, setCar] = useState(null); // user car state to be retrieved from db
  const [myPosition, setMyPostion] = useState(null); // position to be set by device
  const [order, setOrder] = useState(null); // accepted order
  const [newOrders, setNewOrders] = useState([]); // queue of riders waiting for a ride retrieved from db

  // Query users car data -> set it in local state variable (car)
  const fetchCar = async () => {
    try {
      const userData = await Auth.currentAuthenticatedUser();
      const carData = await API.graphql(
        graphqlOperation(getCar, {id: userData.attributes.sub}),
      );
      setCar(carData.data.getCar);
    } catch (error) {
      console.error(error);
    }
  };

  // Query orders -> set themin local state variable (newOrders)
  const fetchOrders = async () => {
    try {
      const orders = await API.graphql(
        graphqlOperation(listOrders, {filter: {status: {eq: 'New'}}}),
      );
      console.log('ORDERS', orders.data.listOrders.items);
      setNewOrders(orders.data.listOrders.items);
    } catch (error) {
      console.error('error fetching orders', error);
    }
  };

  // On Mount Effect
  useEffect(() => {
    fetchCar();
    fetchOrders();
  }, []);

  //
  const onGoPress = async () => {
    // update car.isActive
    try {
      const userData = await Auth.currentAuthenticatedUser();
      console.log('userData', userData);
      const input = {
        id: userData.attributes.sub,
        isActive: !car.isActive,
      };
      const updatedCarData = await API.graphql(
        graphqlOperation(updateCar, {
          input,
        }),
      );
      setCar(updatedCarData.data.updateCar);
    } catch (error) {
      console.error('error updating car.isActive');
    }
  };

  const onAccept = async newOrder => {
    // update order status in backend
    try {
      const input = {
        id: newOrder.id,
        status: 'PICKING_UP_CLIENT',
        carId: car.id,
      };
      const orderData = await API.graphql(
        graphqlOperation(updateOrder, {
          input,
        }),
      );
      setOrder(orderData.data.updateOrder);
    } catch (error) {
      console.error('ERROR ACCEPTING RIDE', error);
    }
    setNewOrders(newOrders.filter((_, i) => i > 0));
  };

  const onDecline = () => {
    // remove front of array
    setNewOrders(newOrders.filter((_, i) => i > 0));
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
    if (car?.isActive) {
      return <Text style={styles.bottomText}>You Are Online</Text>;
    } else {
      return <Text style={styles.bottomText}>You Are Offline</Text>;
    }
  };

  const onUserLocationChange = async event => {
    setMyPostion(event.nativeEvent.coordinate);
    const {latitude, longitude, heading} = event.nativeEvent.coordinate;
    try {
      const userData = await Auth.currentAuthenticatedUser();
      const input = {
        id: userData.attributes.sub,
        latitude,
        longitude,
        heading,
      };
      const updatedCarData = await API.graphql(
        graphqlOperation(updateCar, {input}),
      );
      setCar(updatedCarData.data.updateCar);
    } catch (error) {
      console.error(error);
    }
  };

  const onDirectionsFound = event => {
    console.log('eventd', event.distance);
    if (order) {
      // update order status in db

      // update local state
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
    }
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
            origin={{latitude: car?.latitude, longitude: car?.longitude}}
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
        <Text style={styles.goButtonLabel}>
          {!car?.isActive ? 'GO' : 'End'}
        </Text>
      </TouchableOpacity>

      {/* Bottom Sheet */}
      <View style={styles.bottomContainer}>
        <Ionicons name="options-outline" size={24} color="#4a4a4a" />
        {renderBottomTitle()}
        <Entypo name="menu" size={24} color="#4a4a4a" />
      </View>

      {/* New Ride Pop Up */}
      {newOrders.length > 0 && !order && (
        <NewRidePopUp
          newOrder={newOrders[0]}
          onDecline={onDecline}
          onAccept={() => onAccept(newOrders[0])}
          duration={2}
          distance={0.5}
        />
      )}
    </View>
  );
};

export default HomeScreen;
