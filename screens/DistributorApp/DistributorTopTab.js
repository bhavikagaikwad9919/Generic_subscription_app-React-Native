import React from 'react'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { NavigationContainer } from '@react-navigation/native';
import DistributorUpcoming from './DistributorUpcoming';
import DistributorDuePayment from './DistributorDuePayment';
import DistributorCustomerMiddle from './DistributorCustomerMiddle';
import DistributorTransactionMiddle from './DistributorTransactionMiddle';
import DistributorDuePaymentMiddle from './DistributorDuePaymentMiddle';

const DistributorUpcomingPage = "Upcoming Payments"
const DistributorDuePaymentPage ="Due Payment"
const DistributorCustomerDetailPage = "Customers"
const DistributorTransactionMiddlePage = "Transaction Page"
const DistributorDuePaymentMiddlePage = "Due Payment Page"


const DistributorTopTab = () => {
    const Tab = createMaterialTopTabNavigator();
  return (
    <NavigationContainer independent={true}>
      <Tab.Navigator initialLayout={DistributorTransactionMiddlePage}
      >
        <Tab.Screen
          name={DistributorTransactionMiddlePage}
          component={DistributorTransactionMiddle}
        />
        <Tab.Screen
          name={DistributorUpcomingPage}
          component={DistributorUpcoming}
        />
        <Tab.Screen
          name={DistributorDuePaymentMiddlePage}
          component={DistributorDuePaymentMiddle}
        />
      </Tab.Navigator>
    </NavigationContainer>
  )
}

export default DistributorTopTab