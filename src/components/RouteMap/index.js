/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions';

const RouteMap = ({ origin, destination }) => {
  const GOOGLE_MAPS_API_KEY = 'AIzaSyCc2S9XzrUb4Xtz1sGGGbgZWe-m-qcNZzU';

  const originLoc = {
    latitude: origin.details.geometry.location.lat,
    longitude: origin.details.geometry.location.lng,
  };

  const destinationLoc = {
    latitude: destination.details.geometry.location.lat,
    longitude: destination.details.geometry.location.lng,
  };

  return (
    <MapView
      provider={PROVIDER_GOOGLE}
      showsUserLocation={true}
      style={{ height: '100%', width: '100%' }}
      initialRegion={{
        latitude: 47.624984,
        longitude: -122.13339,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      }}>
      {/* From Marker */}
      <MapViewDirections
        origin={originLoc}
        destination={destinationLoc}
        apikey={GOOGLE_MAPS_API_KEY}
      />
      <Marker coordinate={originLoc} title={'Origin'} />
      <Marker coordinate={destinationLoc} title={'Destination'} />
    </MapView>
  );
};

export default RouteMap;
