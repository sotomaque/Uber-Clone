import React from 'react';
import { View, SafeAreaView } from 'react-native';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { useNavigation } from '@react-navigation/native';

import PlaceRow from './PlaceRow.js';
import styles from './styles.js';

const DestinationSearch = () => {
  const navigation = useNavigation();

  const [originPlace, setOriginPlace] = React.useState(null);
  const [destinationPlace, setDestinationPlace] = React.useState(null);

  React.useEffect(() => {
    if (originPlace && destinationPlace) {
      navigation.navigate('SearchResults', {
        originPlace,
        destinationPlace,
      });
    }
  }, [originPlace, destinationPlace, navigation]);

  const home = {
    description: 'Home',
    geometry: { location: { lat: 47.624984, lng: -122.13339 } },
  };
  const work = {
    description: 'Work',
    geometry: { location: { lat: 47.669549, lng: -122.196904 } },
  };

  return (
    <SafeAreaView>
      <View style={styles.container}>
        {/* Origin Input */}
        <GooglePlacesAutocomplete
          placeholder="Where from?"
          onPress={(data, details = null) => {
            setOriginPlace({ data, details });
          }}
          suppressDefaultStyles
          enablePoweredByContainer={false}
          currentLocation={true}
          currentLocationLabel="Current location"
          styles={{
            textInput: styles.textInput,
            container: styles.autoCompleteContainer,
            listView: styles.listView,
            separator: styles.separator,
          }}
          fetchDetails
          query={{
            key: 'AIzaSyCc2S9XzrUb4Xtz1sGGGbgZWe-m-qcNZzU',
            language: 'en',
          }}
          renderRow={(data) => <PlaceRow data={data} />}
          renderDescription={(data) => data?.description || data?.vicinity}
          predefinedPlaces={[home, work]}
        />
        {/* Destination Input */}
        <GooglePlacesAutocomplete
          placeholder="Where to?"
          onPress={(data, details = null) => {
            setDestinationPlace({ data, details });
          }}
          suppressDefaultStyles
          enablePoweredByContainer={false}
          styles={{
            textInput: styles.textInput,
            container: { ...styles.autoCompleteContainer, top: 55 },
            separator: styles.separator,
          }}
          fetchDetails
          query={{
            key: 'AIzaSyCc2S9XzrUb4Xtz1sGGGbgZWe-m-qcNZzU',
            language: 'en',
          }}
          renderRow={(data) => <PlaceRow data={data} />}
          predefinedPlaces={[home, work]}
        />
        {/* Line */}
        <View style={styles.circle} />
        <View style={styles.line} />
        <View style={styles.square} />
      </View>
    </SafeAreaView>
  );
};

export default DestinationSearch;
