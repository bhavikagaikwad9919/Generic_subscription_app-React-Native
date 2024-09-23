
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from './screens/Login';
import DistributorBottomtab from './screens/DistributorApp/DistributorBottomtab';
import CustomerBottomTab from './screens/CustomerApp/CustomerBottomTab';
import DistributorProfile from './screens/DistributorApp/DistributorProfile';
// import DistributorTopTab from './screens/DistributorApp/DistributorTopTab';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Stack = createNativeStackNavigator();

const App = () => {
  // let value = await AsyncStorage.getItem("roilid")
  // if(value)
  // console.log("valueroiledataapp", value)

  return (
    <>
      <NavigationContainer independent={true}>
        <Stack.Navigator initialRouteName="Login">
          <Stack.Screen
            name="Login"
            component={Login}
          />
          <Stack.Screen
            name="DistributorBottomtab"
            component={DistributorBottomtab}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="CustomerBottomTab"
            component={CustomerBottomTab}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="DistributorProfile"
            component={DistributorProfile}
            options={{ headerShown: false }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
};


export default App;
