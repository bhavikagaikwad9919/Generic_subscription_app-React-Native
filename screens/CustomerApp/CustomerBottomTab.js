import React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import 'react-native-gesture-handler';
import AntDesign from 'react-native-vector-icons/AntDesign';
import CustomerProfile from './CustomerProfile';
import CustomerHome from './CustomerHome';
import CustomerDistributorDetails from './CustomerDistributorDetails';
import CustomerTansactionMiddle from './CustomerTansactionMiddle';
import CustomerHomeMiddle from './CustomerHomeMiddle';
import CustomerProfileMiddle from './CustomerProfileMiddle';

const CustomerBottomTab = () => {
    const Tab = createBottomTabNavigator();

    const CustomerTansactionMiddlepage = "Tansaction History";
    const CustomerProfilepage = "Profile";
    const CustomerHomeMiddlePage = "Home";
    const CustomerDistributorDetailspage = "Distributor Details"
    const CustomerProfileMiddlePage = "Customer Profile"

    return (
        <NavigationContainer independent={true}>
            <Tab.Navigator
                screenOptions={{
                    headerStyle: {  backgroundColor: '#583877' },
                    headerTintColor: '#fff',
                    headerTitleStyle: { fontWeight: 'bold' },
                }}>
                <Tab.Screen name={CustomerHomeMiddlePage} component={CustomerHomeMiddle}
                    options={{
                        tabBarLabel: 'Home',
                        tabBarIcon: ({ color }) => (
                            <AntDesign
                                name="home"
                                color={color}
                                size={30}
                            />
                        ),
                    }} />

                <Tab.Screen name={CustomerDistributorDetailspage} component={CustomerDistributorDetails}
                    options={{
                        tabBarLabel: 'Distributor Details',
                        tabBarIcon: ({ color }) => (
                            <AntDesign
                                name="idcard"
                                color={color}
                                size={30}
                            />
                        ),
                    }} />

                <Tab.Screen name={CustomerTansactionMiddlepage} component={CustomerTansactionMiddle}
                    options={{
                        tabBarLabel: 'Transaction',
                        tabBarIcon: ({ color }) => (
                            <AntDesign
                                name="retweet"
                                color={color}
                                size={30}
                            />
                        ),
                    }}
                />

                <Tab.Screen name={CustomerProfileMiddlePage} component={CustomerProfileMiddle}
                    options={{
                        tabBarLabel: 'Profile',
                        tabBarIcon: ({ color }) => (
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

export default CustomerBottomTab
