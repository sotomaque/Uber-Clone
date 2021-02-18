/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import { Image } from 'react-native';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';

import cars from '../../assets/data/cars';
import { images } from '../../constants';

const HomeMap = () => {
  const getImage = (item) => {
    if (item.type === 'UberX') {
      return images.topUberX;
    } else if (item.type === 'UberXL') {
      return images.topUberXL;
    } else {
      return images.topComfort;
    }
  };
  return (
    <MapView
      provider={PROVIDER_GOOGLE}
      style={{ height: '100%', width: '100%' }}
      initialRegion={{
        latitude: 28.450627,
        longitude: -16.263045,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      }}>
      {cars.map((car) => (
        <Marker
          key={car.id}
          coordinate={{
            latitude: car?.latitude,
            longitude: car?.longitude,
          }}>
          <Image
            source={getImage(car)}
            style={{
              width: 50,
              height: 50,
              resizeMode: 'contain',
              transform: [
                {
                  rotate: `${car.heading}deg`,
                },
              ],
            }}
          />
        </Marker>
      ))}
    </MapView>
  );
};

export default HomeMap;
