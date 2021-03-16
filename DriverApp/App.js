/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useEffect} from 'react';
import {SafeAreaView, StatusBar, useColorScheme} from 'react-native';
import Amplify, {Auth, API, graphqlOperation} from 'aws-amplify';
import config from './aws-exports';
import {withAuthenticator} from 'aws-amplify-react-native';
import {Colors} from 'react-native/Libraries/NewAppScreen';

import {createCar} from './src/graphql/mutations';
import {getCarById} from './src/graphql/queries';
import HomeScreen from './src/screens/HomeScreen';

Amplify.configure({
  ...config,
  Analytics: {
    disabled: true,
  },
});

const App = () => {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  useEffect(() => {
    const updateUserCar = async () => {
      // get authenticated user
      const authUser = await Auth.currentAuthenticatedUser({bypassCache: true});
      if (!authUser) {
        return;
      }
      // check if user has a car
      let carData;
      try {
        carData = await API.graphql(
          graphqlOperation(getCarById, {
            id: authUser.attributes.sub,
          }),
        );
      } catch (error) {
        console.error('error querying user', error);
        return;
      }

      // if not, create a new car for user
      if (carData.data.getCar) {
        console.log('USER ALREADY HAS CAR ASSIGNED');
        return;
      } else {
        const newCar = {
          id: authUser.attributes.sub,
          type: 'UberX',
          userId: authUser.attributes.sub,
        };
        console.log('newCar', newCar);
        try {
          await API.graphql(
            graphqlOperation(createCar, {
              input: newCar,
            }),
          );
        } catch (error) {
          console.error('error creating car', error.errors);
          return;
        }
      }
      console.log('carData', carData);
    };

    updateUserCar();
  }, []);

  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <HomeScreen />
    </SafeAreaView>
  );
};

export default withAuthenticator(App);
