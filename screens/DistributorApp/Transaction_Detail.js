import React, { useEffect, useState } from 'react'
import { StyleSheet, View, Text, Image } from 'react-native'
import CustomerImage1 from "../../assets/Cartoon_Profile_Picture07.jpg"
import TransactionImage from "../../assets/11.webp"
import AsyncStorage from '@react-native-async-storage/async-storage'
import { baseUrl } from './api_Constants'
import moment from 'moment';


const Transaction_Detail = ({ route }) => {



    const [transactionDetails, setTransactionDetails] = useState({})
    // const[customerPaymentid,setCustomerPaymentID] = useState({})

    const { customerid } = route.params

    const fetchcustomerData = async (customerid) => {
        let value = await AsyncStorage.getItem("Token")
        console.log("value", value)
        var bearerToken = value.replace(/"([^"]+(?="))"/g, '$1');
        await fetch(`${baseUrl}mobile/getcustomerpaymentbyid/${customerid}/`, {
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
                console.log("transaction Details", data.data)
                setTransactionDetails(data.data)
            })
    }

    useEffect(() => {
        fetchcustomerData(customerid);
        console.log("paymentid",customerid)
    }, [])

    return (
        <>
<View>
      <View style={styles.maindiv} key={transactionDetails.id}>
            <View>
                <Image source={CustomerImage1} style={styles.TransactionImage}></Image>
            </View>

            <View>
                <View style={styles.Transactiondetails}>
                    <View style={styles.root}>
                        {/* <Image source={CustomerImage1} style={styles.CustomerImage1}></Image> */}
                        <View>
                                    <Text style={styles.mainText1}>Customer Name -:</Text>
                                    <Text style={styles.mainText1}>Package Amount -:</Text>
                                    <Text style={styles.mainText1}>Transaction -:</Text>
                                    <Text style={styles.mainText1}>Transaction time -:</Text>
                                </View>

                        <View>

                            <Text style={styles.mainTextname}>{transactionDetails.customer_name}</Text>
                            <Text style={styles.mainTextrs}>Rs.{transactionDetails.amount}</Text>
                            <Text style={styles.mainTextcompleted}>Completed</Text>
                            {/* <MaterialCommunityIcons name="check" size={20} color={"#2E8B57"} /> */}
                            <Text style={styles.mainText}>{(moment(transactionDetails.payment_date).format('YYYY-MM-DD hh:mm'))}</Text>
                        </View>

                        {/* <View>
                            <Text style={styles.mainTextrs}>Rs.{transactionDetails.amount}</Text>
                            <MaterialCommunityIcons name="check" size={20} color={"#2E8B57"} />
                        </View> */}

                    </View>
                </View>

                {/* <View style={styles.Customerdetailsmain}>
                    <View style={styles.root}>
                        <View>
                            <Text style={styles.mainText1}>Transaction ID</Text>
                            <Text style={styles.mainText1}>To</Text>
                            <Text style={styles.mainText1}>From</Text>
                        </View>
                        <View>
                            <Text style={styles.mainText1}>: 6677854566</Text>
                            <Text style={styles.mainText1}>: SpeedNet Pvt Ltd</Text>
                            <Text style={styles.mainText1}>: Anamika</Text>
                        </View>


                    </View>
                </View> */}

            </View>
        </View>
        </View>
        </>

    )
}
const styles = StyleSheet.create({
    root: {
        flexDirection: 'row',
        padding: 10
    },
    maindiv: {
        padding: 10
    },
    Transactiondetails: {
        backgroundColor: "white",
        borderRadius: 20,
        paddingTop: 10,
        marginBottom: 25,
    },
    TransactionImage: {
        width: 100,
        height:100,
        borderRadius: 95,
        marginTop: 10,
        marginBottom: 10,
        alignSelf:"center"
    },
    CustomerImage1: {
        width: 61,
        height: 60,
        borderRadius: 95,
        marginTop: 20,
        marginLeft: 15
    },
    mainText: {
        fontSize: 18,
        padding: 8,
        color: "black",
        paddingLeft: 30
    },
    mainTextname:{
        fontSize: 18,
        // padding: 8,
        color: "black",
        paddingLeft: 30,
        // width:180
    },
    mainTextcompleted: {
        fontSize: 18,
        padding: 8,
        color: "#2E8B57",
        paddingLeft: 30
    },
    mainTextrs: {
        fontSize: 18,
        padding: 8,
        color: "black",
        paddingLeft: 30

    },
    Customerdetailsmain: {
        backgroundColor: "white",
        padding: 10,
        borderRadius: 9,
        height: 150,
        marginBottom: 15,
        paddingTop: 17
    },
    mainText1: {
        fontSize: 18,
        paddingLeft: 15,
        paddingBottom: 12,
        color: "black",
    },
})
export default Transaction_Detail