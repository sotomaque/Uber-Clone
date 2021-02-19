/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import { View, Text, Pressable } from 'react-native';
import {
  DrawerContentScrollView,
  DrawerItemList,
} from '@react-navigation/drawer';
import { Auth } from 'aws-amplify';

const CustomDrawer = (props) => {
  return (
    <DrawerContentScrollView {...props}>
      {/* Top (Dark) Drawer Part */}
      <View style={{ backgroundColor: '#000', padding: 15 }}>
        {/* User Row */}
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
          }}>
          <View
            style={{
              backgroundColor: '#cacaca',
              width: 50,
              height: 50,
              borderRadius: 25,
              marginRight: 10,
            }}
          />
          <View>
            <Text style={{ color: 'white', fontSize: 18, fontWeight: '500' }}>
              Enrique Sotomayor
            </Text>
            <Text style={{ color: 'white', fontSize: 16, fontWeight: '300' }}>
              4.98
            </Text>
          </View>
        </View>
        {/* Messages Row */}
        <View
          style={{
            borderTopWidth: 1,
            borderBottomWidth: 1,
            borderColor: '#919191',
            marginVertical: 15,
          }}>
          <Pressable
            style={{ marginVertical: 10 }}
            onPress={() => console.log('lol')}>
            <Text style={{ color: 'white' }}>Messsages</Text>
          </Pressable>
        </View>
        {/* Do More */}
        <Pressable
          style={{ marginVertical: 10 }}
          onPress={() => console.log('lol')}>
          <Text style={{ color: 'white' }}>Do More With Your Accoutn</Text>
        </Pressable>
        {/* Make Money */}
        <Pressable
          style={{ marginVertical: 10 }}
          onPress={() => console.log('lol')}>
          <Text style={{ color: 'white' }}>Make Money Driving</Text>
        </Pressable>
      </View>
      <DrawerItemList {...props} />
      {/* Make Money */}
      <Pressable style={{ marginVertical: 10 }} onPress={() => Auth.signOut()}>
        <Text style={{ padding: 5, paddingLeft: 20 }}>Logout</Text>
      </Pressable>
    </DrawerContentScrollView>
  );
};

export default CustomDrawer;
