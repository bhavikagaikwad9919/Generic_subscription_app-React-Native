import React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import CustomerProfile from './CustomerProfile';
import Customer_Edit from './Customer_Edit';
import CustomerHomeMiddle from './CustomerHomeMiddle'; 
import Login from '../Login';
import App from '../../App';
import { NativeScreenContainer } from 'react-native-screens';

const CustomerProfileMiddle = () => {
    const Stack = createNativeStackNavigator();

  return (
    <NavigationContainer independent={true}>
    <Stack.Navigator initialRouteName="CustomerProfile">
      <Stack.Screen
        name="CustomerProfile"
        component={CustomerProfile}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Customer_Edit"
        component={Customer_Edit}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Login"
        component={Login}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  </NavigationContainer>
  )
}

export default CustomerProfileMiddle


