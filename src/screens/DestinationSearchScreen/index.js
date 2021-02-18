import React from 'react';
import { View, SafeAreaView } from 'react-native';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import PlaceRow from './PlaceRow.js';

import styles from './styles.js';

const DestinationSearchScreen = (props) => {
  const [originPlace, setOriginPlace] = React.useState(null);
  const [destinationPlace, setDestinationPlace] = React.useState(null);

  React.useEffect(() => {
    if (originPlace && destinationPlace) {
      console.warn('Redirect to results');
    }
  }, [originPlace, destinationPlace]);

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
        />
        {/* Line */}
        <View style={styles.circle} />
        <View style={styles.line} />
        <View style={styles.square} />
      </View>
    </SafeAreaView>
  );
};

export default DestinationSearchScreen;
