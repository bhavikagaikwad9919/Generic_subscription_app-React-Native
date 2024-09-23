import React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import CustomerHome from './CustomerHome';
import Buy_Plan from './Buy_Plan';

const CustomerHomeMiddle = () => {
    const Stack = createNativeStackNavigator();

  return (
    <NavigationContainer independent={true}>
    <Stack.Navigator initialRouteName="CustomerHome">
      <Stack.Screen
        name="CustomerHome"
        component={CustomerHome}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Buy_Plan"
        component={Buy_Plan}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  </NavigationContainer>
  )
}

export default CustomerHomeMiddle


