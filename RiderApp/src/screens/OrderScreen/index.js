import React, { useState, useEffect } from 'react';
import { View, Dimensions, Text } from 'react-native';
import { useRoute } from '@react-navigation/native';
import { API, graphqlOperation } from 'aws-amplify';

import OrderMap from '../../components/OrderMap';
import { getOrder, getCar } from '../../graphql/queries';
import { onCarUpdated, onOrderUpdated } from './subscriptions.graphql';

const OrderScreen = () => {
  const [car, setCar] = useState(null);
  const [order, setOrder] = useState(null);

  const route = useRoute();

  // fetch order
  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const orderData = await API.graphql(
          graphqlOperation(getOrder, {
            id: route.params.id,
          }),
        );
        setOrder(orderData.data.getOrder);
      } catch (error) {
        console.error('error fetching order', error);
      }
    };
    fetchOrder();
  }, []);

  // subscribe to order updates
  useEffect(() => {
    const subscription = API.graphql(
      graphqlOperation(onOrderUpdated, { id: route.params.id }),
    ).subscribe({
      next: ({ value }) => {
        console.table('subscription update', value.data.onOrderUpdated);
        setOrder(value.data.onOrderUpdated);
      },
      error: (error) => console.warn('error with order subscription', error),
    });

    return () => {
      subscription.unsubscribe;
    };
  }, []);

  // fetch car data when order is updated
  useEffect(() => {
    if (!order?.carId || order.carId === '1') return;
    const fetchCar = async () => {
      try {
        const carData = await API.graphql(
          graphqlOperation(getCar, {
            id: order?.carId,
          }),
        );
        setCar(carData.data.getCar);
      } catch (error) {
        console.error('error fetching car', error);
      }
    };
    fetchCar();
  }, [order]);

  // subscribe to car updates
  useEffect(() => {
    if (!order?.carId || order.carId === '1') {
      return;
    }
    console.log('ORDER CAR ID', order.carId);
    const subscription = API.graphql(
      graphqlOperation(onCarUpdated, { id: order.carId }),
    ).subscribe({
      next: ({ value }) => {
        setCar(value.data.onCarUpdated);
      },
      error: (error) => console.warn('error with car subscription', error),
    });

    return () => {
      subscription.unsubscribe;
    };
  }, [order]);

  return (
    <View>
      <View style={{ height: Dimensions.get('window').height - 200 }}>
        <OrderMap car={car} />
      </View>
      <View>
        <Text>order status: {order?.status}</Text>
      </View>
    </View>
  );
};

export default OrderScreen;
