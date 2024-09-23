import React, { useEffect, useState } from 'react'
import CustomerImage1 from "../../assets/profileCustomer.jpg"
import { SafeAreaView, View, TouchableOpacity, StyleSheet, Image, Text } from 'react-native'
import SplashImage from "../../assets/customerDetails.webp"
import AsyncStorage from '@react-native-async-storage/async-storage'
import { baseUrl } from './api_Constants'
import { ScrollView } from 'react-native'
import moment from 'moment'
import { ActivityIndicator } from 'react-native'


const Customer_Detail = ({ route }) => {

    const [customerDetails, setCustomerDetails] = useState([])
    const [isloading, setIsLoading] = useState(false)

    const { customerid } = route.params

    const fetchcustomerData = async (customerid) => {
        let value = await AsyncStorage.getItem("Token")
        // console.log("value", value)
        var bearerToken = value.replace(/"([^"]+(?="))"/g, '$1');
        setIsLoading(true)
        await fetch(`${baseUrl}mobile/getcustomersbyid/${customerid}/`, {
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
                console.log("dataCustomer", data.data)
                setCustomerDetails(data.data)
                setIsLoading(false)
            })
    }

    useEffect(() => {
        fetchcustomerData(customerid);
        console.log(customerid, "customeid")
    }, [])

    return (
        <ScrollView>
            {isloading && <ActivityIndicator style={styles.loader} size={60} color={"gray"} />}

            {customerDetails.map((item) =>
                <View>
                    <View style={styles.mainroot} key={item.id}>
                        <Image source={CustomerImage1} style={styles.SplashImage}></Image>
                    
                        <View style={styles.Customerdetailsmain}>
                            <View style={styles.root}>
                                <View>
                                    <Text style={styles.mainText1}>Customer Name -:</Text>
                                    <Text style={styles.mainText1}>Package Amount -:</Text>
                                    <Text style={styles.mainText1}>Mobile No -:</Text>
                                    <Text style={styles.mainText1}>Expiray Date -:</Text>
                                    <Text style={styles.mainText1}>Email Address -:</Text>
                                </View>
                                <View>
                                    <Text style={styles.mainTextname}>{item.customer_name}</Text>
                                    <Text style={styles.mainTextname}>{item.amount}</Text>
                                    <Text style={styles.mainTextname}>{item.phone_number}</Text>
                                    <Text style={styles.mainTextname}>{(moment(item.plan_expiry_date).format("DD/MM/YYYY"))}</Text>
                                    <Text style={styles.mainTextname}>{item.email}</Text>
                                </View>
                            </View>
                        </View>
                    </View>

                </View>)}
        </ScrollView>

    )
}
const styles = StyleSheet.create({
    loader:{
        justifyContent:"center",
        alignItems:"center",
        paddingTop:210
    },
    mainroot: {
        padding: 10,
        
    },
    root: {
        flexDirection: "row",
        padding: 10
    },
    pkgdata: {
        flexDirection: 'column'
    },
    button: {
        backgroundColor: 'white',
        padding: 10,
        width: 300,
        height: 150,
        marginTop: 16,
        borderRadius: 9,
    },
    button1: {
        backgroundColor: 'white',
        

    },
    cardname1: {
        paddingLeft: 25,
        color: "#2E8B57",
    },
    cardTitl: {
        paddingLeft: 20,
        color: "#2E8B57",
        fontSize: 20,
    },
    cardTitle1: {
        paddingTop: 13,
        fontSize: 18,
        paddingLeft: 25,
        paddingBottom: 6,
        color: "#2E8B57",
        fontFamily: "sans-serif"

    },
    CustomerImage1: {
        width: 70,
        height: 68,
        borderRadius: 95,
        marginTop: 15
    },
    SplashImage: {
        width: 160,
        height:155,
        borderRadius: 95,
        marginTop: 15,
        alignSelf:"center"
    },
    mainText: {
        fontSize: 18,
        color: "black",
        padding: 15,
        fontFamily: "sans-serif"
    },
    mainTextDis: {
        fontSize: 15,
        color: "black",
        fontFamily: "sans-serif",
        paddingLeft:15,
        color:"red"
    },
    mainText1: {
        fontSize: 18,
        // paddingLeft: 5,
        paddingBottom: 30,
        color: "black",
        fontFamily: "sans-serif",
    },
    mainTextname1:{
        fontSize: 18,
        paddingBottom: 30,
        color: "black",
        fontFamily: "sans-serif",
        paddingTop:20
    },
    mainTextpno:{
        fontSize: 18,
        paddingBottom: 12,
        color: "black",
        fontFamily: "sans-serif"
    },
    mainTextname:{
        fontSize: 18,
        // paddingLeft: 5,
        paddingBottom: 30,
        color: "black",
        fontFamily: "sans-serif",
        width: 180,  
    },
    mainTextnameText:{
        fontSize: 18,
        paddingLeft: 12,
        paddingBottom: 10,
        color: "black",
        fontFamily: "sans-serif",
        width: 200,  
    },
    maindiv: {
        flexDirection: "row",
        padding: 10,
        backgroundColor: "white",
        borderRadius: 9,
        height: 120,
        marginBottom: 19,
        marginTop: 30,
    },
    Customerdetailsmain: {
        backgroundColor: "white",
        whiteSpace: "inital",
        padding: 10,
        borderRadius: 9,
        marginTop:40
    },
    maincustomerinfo: {
        borderRadius: 9,
        marginBottom: 15
    },
    mainTextrs: {
        fontSize: 18,
        color: "green",
        padding: 12,
        fontFamily: "sans-serif"

    },
    mainTextpkg: {
        fontSize: 15,
        color: "black",
        fontFamily: "sans-serif",
        paddingLeft:15
    }
})
export default Customer_Detail