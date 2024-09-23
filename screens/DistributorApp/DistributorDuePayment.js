import React, { useEffect, useState } from 'react'
import { Image, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import CustomerImage1 from "../../assets/avatarimage.jpg"
import AntDesign from 'react-native-vector-icons/AntDesign';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { baseUrl } from './api_Constants';

const DistributorDuePayment = ({ navigation }) => {

    const [transaction, setTransaction] = useState([])


    const handleAddDuePayment = () => {
        console.log("hello")
        navigation.navigate("Add_Due_Payment")
    }

    const handleCustomerPaymentDetails = (id,amount,status,description) => {
        console.log("hello", id,amount,status,description)
        navigation.navigate("DistributorDueDetails", { customerid: id,Editamountget: amount, Editstatusget:status,Editdescriptionsget:description})
    }
    const fetchData = async () => {
        let value = await AsyncStorage.getItem("Token")
        // console.log("value", value)
        var bearerToken = value.replace(/"([^"]+(?="))"/g, '$1');
        await fetch(`${baseUrl}mobile/getduecustomers/`, {
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
                console.log("DistributorDueDetails", data.data)
                setTransaction(data.data)
            })
    }

    useEffect(() => {
        fetchData();
    }, [])
    return (
        <><SafeAreaView style={styles.mainroot}>
            <View style={styles.root}>
                 {transaction.map((item) =>
                    <TouchableOpacity onPress={() => handleCustomerPaymentDetails(item.id, item.amount, item.status,item.description)}
                    style={styles.button}>
                    <View style={styles.mainDiv}>
                        <Image source={CustomerImage1} style={styles.CustomerImage1}></Image>
                        <View>
                            <Text style={styles.cardTitle}>{item.customer_name}</Text>
                            <Text style={styles.cardTitlered}>{item.status}</Text>
                            </View>

                            <View>
                            <Text style={styles.daysdetailsrs}>Rs: {item.amount}</Text>
                                {/* <Text style={styles.daysdetailsrsone}>{item.description}</Text> */}
                            </View>
                        </View>
                    
                </TouchableOpacity>)}
               
            </View>
            <TouchableOpacity 
            onPress={handleAddDuePayment}
                style={styles.pluscircle} >
                <AntDesign name="pluscircle" size={50} color={"#583877"} />
            </TouchableOpacity>
        </SafeAreaView></>
    )
}
const styles = StyleSheet.create({
    mainroot: {
        flex: 1
    },
    mainDiv: {
        flexDirection: 'row',
        padding: 20
    },
    root: {
        flex: 1,
        padding: 16,
        overflowX: "scroll"
    },
    daysdetails: {
        flexDirection: "row"
    },
    daysdetailsrs: {
        paddingTop: 12,
        paddingLeft: 24,
        fontSize: 13,
        color: "#2E8B57",
        fontFamily: "sans-serif",
    },
    daysdetailsrsone: {
        paddingTop: 30,
        paddingLeft: 1,
        fontSize: 13,
        color: "#2E8B57",
        width: 120,
        fontFamily: "sans-serif",
    },
    button: {
        backgroundColor: 'white',
        marginTop: 16,
        // marginBottom: 10,
        // backgroundColor: 'white',
        // padding: 10,
        height: 130,
    },
    CustomerImage1: {
        width: 70,
        height: 70,
        borderRadius: 95,
    },
    cardTitle: {
        paddingLeft: 20,
        paddingTop: 10,
        fontSize: 20,
        fontFamily: "sans-serif",
        color: "#583877",
        fontSize: 18,
        fontWeight: "650",
        width: 150,
    },
    cardTitlered: {
        paddingLeft: 20,
        paddingTop: 10,
        fontSize: 20,
        fontFamily: "sans-serif",
        color: "red",
        fontSize: 16,
        fontWeight: "650",
        width: 150,
    },
    cardname: {
        paddingLeft: 45,
        paddingTop: 10,
        fontSize: 15,
        fontFamily: "sans-serif",
        color: "black",
        fontSize: 16,
        fontWeight: "500"
    },
    pluscircle: {

        position: "absolute",
        width: 50,
        height: 50,
        bottom: 30,
        right: 20,
        justifyContent: "center",
        alignItems: "center"
    },
})
export default DistributorDuePayment