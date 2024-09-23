import React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import CustomerTransaction from './CustomerTransaction';
import Transaction_Details from './Transaction_Details';

const CustomerTansactionMiddle = () => {
    const Stack = createNativeStackNavigator();

  return (
    <NavigationContainer independent={true}>
    <Stack.Navigator initialRouteName="CustomerTransaction">
      <Stack.Screen
        name="CustomerTransaction"
        component={CustomerTransaction}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Transaction_Details"
        component={Transaction_Details}
        options={{ headerShown: true }}
      />
    </Stack.Navigator>
  </NavigationContainer>
  )
}

export default CustomerTansactionMiddle
