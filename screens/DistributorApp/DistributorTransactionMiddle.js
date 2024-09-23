import React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import DistributorTransaction from './DistributorTransaction';
import Transaction_Detail from './Transaction_Detail';
import Add_Customer_Payment from './Add_Customer_Payment';
import Add_Due_Payment from './Add_Due_Payment';


const DistributorTransactionMiddle = () => {
    const Stack = createNativeStackNavigator();
  return (
    <NavigationContainer independent={true}>
    <Stack.Navigator initialRouteName="DistributorTransaction">
      <Stack.Screen
        name="Transaction_Detail"
        component={Transaction_Detail}
        options={{ headerShown: true }}
      />
      <Stack.Screen
        name="DistributorTransaction"
        component={DistributorTransaction}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Add_Customer_Payment"
        component={Add_Customer_Payment}
        options={{ headerShown: true }}
      />
    
    </Stack.Navigator>
  </NavigationContainer>
  )
}

export default DistributorTransactionMiddle