import React, { useEffect, useState } from 'react'
import { Image, StyleSheet, Text, View } from 'react-native'
import ProfileImage from "../../assets/profileimage.jpg"
import AntDesign from 'react-native-vector-icons/AntDesign';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { TouchableOpacity } from 'react-native';
import CustomerImage1 from "../../assets/Cartoon_Profile_Picture07.jpg"
import AsyncStorage from '@react-native-async-storage/async-storage';
import { baseUrl } from '../DistributorApp/api_Constants';

const CustomerDistributorDetails = () => {

    const [customerDist, setCustomerDist] = useState([]);



    const fetchCustomerDistributor = async () => {
        let value = await AsyncStorage.getItem("Token")
        // console.log("value", value)
        var bearerToken = value.replace(/"([^"]+(?="))"/g, '$1');
        await fetch(`${baseUrl}mobile/customersdistributor/`, {
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
                console.log("CustomersDistributor", data.data)
                setCustomerDist(data.data)
            })
    }

    useEffect(() => {
        fetchCustomerDistributor();
    }, [])

    return (
        <>
            { customerDist.map((item) =>
            <View style={styles.root} key={item.id}>
                <View>
                    {/* <Text style={styles.mainText}>{item.name}</Text> */}
                </View>
                <View>
                    <Image source={ProfileImage} style={styles.ProfileImage}></Image>
                </View>

              <View style={{ padding: 20 }}>
                    <TouchableOpacity style={styles.button}>
                        <View style={styles.viewmaindiv}>
                            <View>
                              <Text style={styles.cardTitle}>Name :- {item.name}</Text>
                                <Text style={styles.cardTitle}>Email Id :- {item.email}</Text>
                                <Text style={styles.cardTitle}>Phone_Number :- {item.phone_number}</Text>
                                <Text style={styles.cardTitle}>Addresss :- {item.address}</Text>
                            </View>
                        </View>
                    </TouchableOpacity>
                </View>
                
            </View>)}
        </>
    )
}
const styles = StyleSheet.create({
    root: {
    },
    Backgroundimage: {
        height: 180,
        color: "blue",
    },
    ProfileImage: {
        width: 100,
        height: 100,
        borderRadius: 95,
        alignSelf: "center",
        borderWidth: 4,
        marginTop: 30,
        borderColor: "white"
    },
    button: {
        backgroundColor: 'white',
        padding: 1,
        borderRadius: 20,
        marginTop: 20,
        paddingBottom: 10,
        borderColor:"#583877",
        borderWidth:2
    },
    cardTitle: {
        paddingTop: 10,
        fontSize: 17,
        paddingLeft: 10,
        fontSize: 19,
        color:"black",
        opacity:5
    },
    cardTitle1: {
        paddingLeft: 13,
        paddingTop: 10,
        fontSize: 19,
        color: "#583877",
    },
    viewmaindiv: {
        flexDirection: 'row',
        // padding: 15,
    },
    divmain: {
        flexDirection: 'row',
        padding: 10
    },
    CustomerImage1: {
        width: 61,
        height: 60,
        borderRadius: 95,
    },
    titlename: {
        fontSize: 25,
        fontWeight: "800",
        alignSelf: "center",
        paddingTop: 40,
        color: "black",
        opacity: 0.7
    },
    textContainer: {
        alignSelf: "center",
        paddingTop: 35
    },
    textdata: {
        padding: 10,
        fontSize: 18
    },
    textEdit: {
        alignSelf: "center",
        color: "blue",
        padding: 10,
        fontSize: 18,
        paddingLeft: 350
    },
    profileDetails: {
        flexDirection: "row"
    },
    mainText: {
        fontSize: 25,
        paddingTop: 20,
        alignSelf: "center",
        marginTop:40,
        fontFamily:"Roboto",
        color:"black",

    },
})
export default CustomerDistributorDetails
