import React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import DistributorProfile from './DistributorProfile';
import Distributor_Edit from './Distributor_Edit';
import Login from '../Login';

const DistributorProfileMiddle = () => {
    const Stack = createNativeStackNavigator();

    return (
        <NavigationContainer independent={true}>
        <Stack.Navigator initialRouteName="DistributorProfile">
          <Stack.Screen
            name="DistributorProfile"
            component={DistributorProfile}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Distributor_Edit"
            component={Distributor_Edit}
            options={{ headerShown: true }}
          />
          <Stack.Screen
            name="Login"
            component={Login}
            options={{ headerShown: true }}
          />
        </Stack.Navigator>
      </NavigationContainer>
      )
}

export default DistributorProfileMiddle
