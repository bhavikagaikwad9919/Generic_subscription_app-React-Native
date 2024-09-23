import React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import DistributorHome from './DistributorHome';
import DistributorUpcoming from './DistributorUpcoming';

const DistributorHomeMiddle = () => {
    const Stack = createNativeStackNavigator();

  return (
    <NavigationContainer independent={true}>
            <Stack.Navigator initialRouteName="DistributorHome">
                <Stack.Screen
                    name="DistributorHome"
                    component={DistributorHome}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name="DistributorUpcoming"
                    component={DistributorUpcoming}
                    options={{ headerShown: true }}
                />
              
            </Stack.Navigator>
        </NavigationContainer>
  )
}

export default DistributorHomeMiddle