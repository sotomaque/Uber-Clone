/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import { View, Dimensions, Alert } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { API, graphqlOperation, Auth } from 'aws-amplify';

import { createOrder } from '../../graphql/mutations';
import RouteMap from '../../components/RouteMap';
import UberTypes from '../../components/UberTypes';

const SearchResults = (props) => {
  const navigation = useNavigation();
  const typeState = React.useState(null);
  const route = useRoute();
  const { originPlace = '', destinationPlace = '' } = route?.params;

  const onSubmit = async () => {
    const date = new Date();
    const [type] = typeState;
    if (!type) {
      return;
    }

    // submit ride request to server
    try {
      const userInfo = await Auth.currentAuthenticatedUser();
      console.log(userInfo);
      const input = {
        type,
        originLatitude: originPlace.details.geometry.location.lat,
        originLongitude: originPlace.details.geometry.location.lng,
        destLatitude: destinationPlace.details.geometry.location.lat,
        destLongitude: destinationPlace.details.geometry.location.lng,
        userId: userInfo.attributes.sub,
        carId: '1',
        createdAt: date.toISOString(),
      };
      const res = await API.graphql(
        graphqlOperation(createOrder, {
          input,
        }),
      );
      console.log(res);
      Alert.alert('Yay!', 'Your ride has been booked', [
        {
          text: 'Go Home',
          onPress: () => navigation.navigate('Home'),
        },
      ]);
    } catch (error) {
      console.error('Error creating order', error);
    }
  };

  return (
    <View style={{ display: 'flex', justifyContent: 'space-between' }}>
      <View style={{ height: Dimensions.get('window').height - 400 }}>
        <RouteMap origin={originPlace} destination={destinationPlace} />
      </View>
      <View style={{ height: 500 }}>
        <UberTypes typeState={typeState} onSubmit={onSubmit} />
      </View>
    </View>
  );
};

export default SearchResults;
