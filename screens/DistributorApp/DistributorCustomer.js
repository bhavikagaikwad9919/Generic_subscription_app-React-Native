import React from 'react'
import { Image, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import DistributorTopTab from './DistributorTopTab';
import Customer_Detail from './Customer_Detail';
import Add_Customer from './Add_Customer';

const DistributorCustomer = () => {
    const Stack = createNativeStackNavigator();
  return (
    <NavigationContainer independent={true}>
            <Stack.Navigator initialRouteName="DistributorTopTab">
                <Stack.Screen
                    name="DistributorTopTab"
                    component={DistributorTopTab}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                   name="Customer_Detail"
                   component={Customer_Detail}
                />
                 <Stack.Screen
                   name="Add_Customer"
                   component={Add_Customer}
                />
            </Stack.Navigator>
        </NavigationContainer>
  )
}

export default DistributorCustomer