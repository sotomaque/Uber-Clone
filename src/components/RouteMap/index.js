/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions';

const RouteMap = () => {
  const GOOGLE_MAPS_API_KEY = 'AIzaSyCc2S9XzrUb4Xtz1sGGGbgZWe-m-qcNZzU';

  const origin = {
    latitude: 28.450627,
    longitude: -16.263045,
  };

  const destination = {
    latitude: 28.450127,
    longitude: -16.269045,
  };
  return (
    <MapView
      provider={PROVIDER_GOOGLE}
      showsUserLocation
      style={{ height: '100%', width: '100%' }}
      initialRegion={{
        latitude: 28.450627,
        longitude: -16.263045,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      }}>
      {/* From Marker */}
      <MapViewDirections
        origin={origin}
        destination={destination}
        apikey={GOOGLE_MAPS_API_KEY}
      />
      <Marker coordinate={origin} title={'Origin'} />
      <Marker coordinate={destination} title={'Destination'} />
    </MapView>
  );
};

export default RouteMap;
