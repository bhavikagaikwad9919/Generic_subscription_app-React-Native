import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import DistributorHome from './DistributorHome';
import 'react-native-gesture-handler';
import DistributorProfile from './DistributorProfile';
import DistributorTransaction from './DistributorTransaction';
import DistributorTransactionMiddle from './DistributorTransactionMiddle';
import DistributorCustomerInfo from './DistributorCustomerInfo';
import DistributorDuePayment from './DistributorDuePayment';
import DistributorUpcoming from './DistributorUpcoming';
import DistributorCustomer from './DistributorCustomer';
import AntDesign from 'react-native-vector-icons/AntDesign';
import CustomerTransaction from '../CustomerApp/CustomerTransaction';
import CustomerProfile from '../CustomerApp/CustomerProfile';
import Customer_Detail from './Customer_Detail';
import Transaction_Detail from './Transaction_Detail';
import DistributorProfileMiddle from './DistributorProfileMiddle';
import DistributorCustomerMiddle from './DistributorCustomerMiddle';
import DistributorHomeMiddle from './DistributorHomeMiddle';

const DistributorHomeMiddlePage = "Home";
const DistributorProfileMiddlePage = "Profile";
const DistributorTransactionPage = "Transaction";
const Transaction_DetailPage = "Transaction Detail"
const DistributorTransactionMiddlePage = "Transaction"
const DistributorCustomerInfoPage = "Customer_Info"
const DistributorDuePaymentPage = "DistributorDue"
const DistributorUpcomingPage = "UpcomingPages"
const DistributorCustomerPage = "Customer"
const CustomerTransactionPage = "CustomerTran"
const DistributorCustomerMiddlePage = "Customer Page"


const DistributorBottomtab = () => {

    const Tab = createBottomTabNavigator();
    return (

        <NavigationContainer independent={true}>
            <Tab.Navigator
                screenOptions={{
                    headerStyle: { backgroundColor: '#583877' },
                    headerTintColor: '#fff',
                    headerTitleStyle: { fontWeight: 'bold' },
                }}>
                <Tab.Screen name={DistributorHomeMiddlePage} component={DistributorHomeMiddle}
                    options={{
                        tabBarLabel: 'Home',
                        tabBarIcon: ({color}) => (
                            <AntDesign
                                name="home"
                                color={color}
                                 size={30}
                            />
                        ),
                    }}
                />

             <Tab.Screen name={DistributorCustomerMiddlePage} component={DistributorCustomerMiddle}
                     options={{
                        tabBarLabel: 'Customer',
                        tabBarIcon: ({color}) => (
                            <AntDesign
                                name="solution1"
                                color={color}
                                size={30}
                            />
                        ),
                    }}  />
                    
                <Tab.Screen name={DistributorCustomerPage} component={DistributorCustomer}
                     options={{
                        tabBarLabel: 'Transaction',
                        tabBarIcon: ({color}) => (
                            <AntDesign
                                name="retweet"
                                color={color}
                                size={30}
                            />
                        ),
                    }} />

               

                <Tab.Screen name={DistributorProfileMiddlePage} component={DistributorProfileMiddle}
                    options={{
                        tabBarLabel: 'Profile',
                        tabBarIcon: ({color}) => (
                            <AntDesign
                                name="user"
                                color={color}
                                size={30}
                            />
                        ),
                    }} />

            </Tab.Navigator>
        </NavigationContainer>

    )
}

export default DistributorBottomtab