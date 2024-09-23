import React, { useEffect, useState } from 'react'
import {
    TouchableOpacity,
    StyleSheet,
    View,
    Text,
    SafeAreaView,
    Image,
} from 'react-native'
import CustomerImage1 from "../../assets/avatarimage.jpg"
import AsyncStorage from '@react-native-async-storage/async-storage';
import { baseUrl } from '../DistributorApp/api_Constants';
import moment from 'moment';

const CustomerTransaction = ({ navigation }) => {

    
const [paymentHistory, setPaymentHistory] = useState([]);
    const fetchPayemtHistory = async () => {
        let value = await AsyncStorage.getItem("Token")
        // console.log("value", value)
        var bearerToken = value.replace(/"([^"]+(?="))"/g, '$1');
        await fetch(`${baseUrl}mobile/paymentgivenhistory/`, {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'content-Type': 'application/json',
                Authorization: `Bearer ${bearerToken}`,
            },
        }).then(response => {
            return response.json()
        })
            .then(data => {
                console.log("PayemtHistory", data.data)
                setPaymentHistory(data.data)
            })
    }

    useEffect(() => {
        fetchPayemtHistory();
    }, [])

    const TransactionDetails = (id) => {
        console.log("trensaction id", id)
        navigation.navigate("Transaction_Details",{ customerid: id })
    }

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <View style={styles.viewscroll}>
                <View style={styles.viewdiv}>
                    <View>
                        <Text style={styles.mainText}>Recevied From</Text>
                    </View>
                    {/* <View>
                        <Icon style={styles.mainTexticon} name="expand" />
                    </View> */}
                </View>
               {paymentHistory.map((item)=>
               <View key={item.id}>
                <TouchableOpacity onPress={() => TransactionDetails(item.id)}
                    style={styles.button}>
                    <View style={styles.viewmaindiv}>
                        <Image source={CustomerImage1} style={styles.CustomerImage1}></Image>
                        {/* <View>
                                <Text style={styles.textday}>WED</Text>
                                <Text style={styles.textdate}>16</Text>
                            </View> */}
                            <View>
                                        <Text style={styles.cardTitle}>{item.customer_name}</Text>
                                        <Text style={styles.cardTitleMonth}>{(moment(item.payment_date).format('YYYY-MM-DD hh:mm'))}</Text>

                                        {/* <Text style={styles.cardDiscribtion}>Package : {item.description}</Text> */}

                                    </View>

                                    <View>
                                        <Text style={styles.cardnameplan}>Rs.{item.amount}</Text>
                                    </View>
                    </View>
                </TouchableOpacity>
                </View>)}
            </View>
        </SafeAreaView>
    )
}
const styles = StyleSheet.create({
    cardDiscribtion: {
        paddingTop: 10,
        width: 150,
        fontSize: 17,
        paddingLeft: 20,
        fontSize: 15,
        fontFamily: "sans-serif",
    },
    button: {
        backgroundColor: 'white',
        padding: 10,
        marginTop: 16,
    },
    CustomerImage1: {
        width: 70,
        height: 68,
        borderRadius: 95,
    },
    cardTitle: {
        paddingTop: 10,
        width: 180,
        fontSize: 20,
        paddingLeft: 20,
        color:"#583877",
    },
    cardTitleMonth: {
        paddingTop: 10,
        paddingLeft: 20,
        fontSize: 13,
        color: "#2E8B57",
        fontFamily: "sans-serif",

    },
    cardnameplan: {
        paddingTop: 10,
        fontSize: 15,
        color: "black",
    },
    textday: {
        opacity: 0.8,
        alignItems: "center",
        color: "#2E8B57",
    },
    textdate: {
        color: "#2E8B57",
        alignItems: "center",
        fontSize: 20,
    },
    mainText: {
        fontSize: 26,
        paddingTop: 20,
        fontFamily:"Roboto",
        color:"#583877",
    },
    mainTexticon: {
        paddingTop: 20,
        paddingLeft: 17,
        fontSize: 27
    },
    homeicon: {
        fontSize: 32,
        padding: 25,
        color: "#583877"
    },
    customericon: {
        fontSize: 30,
        padding: 25,
        color: "#583877"
    },
    transactionicon: {
        fontSize: 30,
        padding: 25,
        color: "#583877"
    },
    profileicon: {
        fontSize: 32,
        padding: 25,
        color: "#583877"
    },
    iconSize: {
        display: "block",
        backgroundColor: "white",
        padding: 20,
        innerHeight: 70
    },
    viewscroll: {
        flex: 1,
        padding: 16,
        overflowX: "scroll"
    },
    viewdiv: {
        flexDirection: 'row',
    },
    viewmaindiv: {
        flexDirection: 'row',
        padding: 20
    }
});
export default CustomerTransaction
