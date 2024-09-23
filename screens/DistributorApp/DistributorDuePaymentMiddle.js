import React from 'react'
import DistributorDuePayment from './DistributorDuePayment';
import Add_Due_Payment from './Add_Due_Payment';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import DistributorDueDetails from './DistributorDueDetails';
import DistributorDueEdit from './DistributorDueEdit';

const DistributorDuePaymentMiddle = () => {
    // const DistributorDuePaymentPage="Due Payment"
    // const Add_Due_PaymentPage= "Add_Due_Payment Page"

    const Stack = createNativeStackNavigator();


  return (
    <NavigationContainer independent={true}>
    <Stack.Navigator initialRouteName="DistributorDuePayment">
      <Stack.Screen
        name="DistributorDuePayment"
        component={DistributorDuePayment}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Add_Due_Payment"
        component={Add_Due_Payment}
        options={{ headerShown: true }}
      />
       <Stack.Screen
        name="DistributorDueDetails"
        component={DistributorDueDetails}
        options={{ headerShown: false }}
      />
       <Stack.Screen
        name="DistributorDueEdit"
        component={DistributorDueEdit}
        options={{ headerShown: true }}
      />
    </Stack.Navigator>
  </NavigationContainer>
  )
}

export default DistributorDuePaymentMiddle