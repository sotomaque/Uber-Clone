import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';

import StackNavigator from './Stack';
import { View, Text } from 'react-native';
import CustomDrawer from './CustomDrawer';

const Drawer = createDrawerNavigator();

const DummyScreen = (props) => (
  <View style={{ justifyContent: 'center', alignItems: 'center' }}>
    <Text>{props.name}</Text>
  </View>
);

const RootNavigator = () => {
  return (
    <NavigationContainer>
      <Drawer.Navigator drawerContent={(props) => <CustomDrawer {...props} />}>
        <Drawer.Screen name={'Home'} component={StackNavigator} />
        <Drawer.Screen name={'Your Trips'}>
          {() => <DummyScreen name={'Your Trips'} />}
        </Drawer.Screen>
        <Drawer.Screen name={'Help'}>
          {() => <DummyScreen name={'Help'} />}
        </Drawer.Screen>
        <Drawer.Screen name={'Settings'}>
          {() => <DummyScreen name={'Settings'} />}
        </Drawer.Screen>
        <Drawer.Screen name={'Wallet'}>
          {() => <DummyScreen name={'Wallet'} />}
        </Drawer.Screen>
      </Drawer.Navigator>
    </NavigationContainer>
  );
};

export default RootNavigator;
