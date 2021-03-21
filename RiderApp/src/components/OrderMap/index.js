import React from 'react';
import { Image } from 'react-native';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';

import { images } from '../../constants';

const OrderMap = ({ car }) => {
  console.warn('car', car);

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
      showsUserLocation={true}
      style={{ height: '100%', width: '100%' }}
      initialRegion={{
        latitude: 47.624984,
        longitude: -122.13339,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      }}>
      {car && (
        <Marker
          key={car.id}
          coordinate={{
            latitude: car.latitude,
            longitude: car.longitude,
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
      )}
    </MapView>
  );
};

export default OrderMap;
