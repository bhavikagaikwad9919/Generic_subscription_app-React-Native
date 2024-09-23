import React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import DistributorCustomerInfo from './DistributorCustomerInfo';
import Customer_Detail from './Customer_Detail';
import Add_Customer from './Add_Customer';

const DistributorCustomerMiddle = () => {
    const Stack = createNativeStackNavigator();
    return (
        <NavigationContainer independent={true}>
            <Stack.Navigator initialRouteName="DistributorCustomerInfo">
                <Stack.Screen
                    name="DistributorCustomerInfo"
                    component={DistributorCustomerInfo}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name="Customer_Detail"
                    component={Customer_Detail}
                    options={{ headerShown: true }}
                />
                 <Stack.Screen
                    name="Add_Customer"
                    component={Add_Customer}
                    options={{ headerShown: false }}
                />
            </Stack.Navigator>
        </NavigationContainer>
        )
}

export default DistributorCustomerMiddle