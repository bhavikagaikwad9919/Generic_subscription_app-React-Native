import React, { useEffect, useState } from 'react'
import { Button, Image, StyleSheet, Text, View } from 'react-native'
import ProfileImage from "../../assets/profileimage.jpg"
import AntDesign from 'react-native-vector-icons/AntDesign';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { baseUrl } from './api_Constants';
import { ActivityIndicator } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';


const DistributorProfile = ({ navigation }) => {
    const [disProfiledata, setDisProfileData] = useState("")
    const [isloading, setIsLoading] = useState(false)

    const EditProfile=(first_name,last_name,phone_number,address)=>{
        console.log("editemailget", first_name,last_name,phone_number,address)
        navigation.navigate("Distributor_Edit",{ EditFnameget: first_name, EditLnameget:last_name,
            EditpNumber:phone_number,Editaddress:address})
    }

    const profileData = async () => {
        let value = await AsyncStorage.getItem("Token")
        // console.log("value", value)
        var bearerToken = value.replace(/"([^"]+(?="))"/g, '$1');
        setIsLoading(true)
        await fetch(`${baseUrl}mobile/getprofilebyuser/`, {
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
                setDisProfileData(data.data)
                setIsLoading(false)
            })
    }

    const clearAsyncStorage = async () => {
        AsyncStorage.clear();
        console.log("clearedToken", AsyncStorage.clear())
        navigation.navigate("Login")
    }

    useEffect(() => {
        profileData();
    }, [])
    return (
        <ScrollView>
            <View style={styles.root}>
                {isloading && <ActivityIndicator style={styles.loader} size={60} color={"gray"} />}
                <View>
                    <Text style={styles.textEdit} onPress={() => EditProfile(disProfiledata.first_name,disProfiledata.last_name,
                    disProfiledata.phone_number,disProfiledata.address)}>Edit</Text>
                    <Image source={ProfileImage} style={styles.ProfileImage}></Image>
                </View>
                <View>
                    <Text style={styles.titlename}>{disProfiledata.first_name} {disProfiledata.last_name}</Text>
                </View>
                <View style={styles.textContainer}>
                    <View style={styles.profileDetails}>
                        <AntDesign name="mail" color="#583877" size={30} />
                        <Text style={styles.textdata}>{disProfiledata.email}</Text>
                    </View>
                    <View style={styles.profileDetails}>
                        <AntDesign name="phone" color="#583877" size={30} />
                        <Text style={styles.textdata}>{disProfiledata.phone_number}</Text>
                    </View>
                    <View style={styles.profileDetails}>
                        <Ionicons name="location-outline" color="#583877" size={30} />
                        <Text style={styles.textdata}>{disProfiledata.address}</Text>
                    </View>
                </View>
                <View style={styles.textcontainer1}>
                <MaterialIcons onPress={clearAsyncStorage}
                name="logout" size={40}  color={'#583877'}/>
                </View>

                
            </View>
        </ScrollView>
    )
}
const styles = StyleSheet.create({
    textcontainer1: {
        alignSelf: "center",
        paddingTop: 90,
        paddingLeft: 310,
    },
    loader: {
        justifyContent: "center",
        alignItems: "center",
        paddingTop: 210,
        paddingBottom:400
    },
    root: {
    },
    Backgroundimage: {
        height: 180,
        color: "blue",
    },
    ProfileImage: {
        width: 180,
        height: 175,
        borderRadius: 95,
        alignSelf: "center",
        borderWidth: 6,
        borderColor: "white"
    },
    titlename: {
        fontSize: 25,
        fontWeight: "800",
        alignSelf: "center",
        paddingTop: 40,
        color: "black",
        opacity: 0.7,
        fontFamily: "Roboto",
        fontWeight: "bold",

    },
    textContainer: {
        alignSelf: "center",
        paddingTop: 35
    },
    textdata: {
        padding: 10,
        fontSize: 18,
        fontFamily: "sans-serif",

    },
    textEdit: {
        alignSelf: "center",
        color: "#583877",
        padding: 10,
        fontSize: 18,
        paddingLeft: 350,
        fontFamily: "sans-serif",
    },
    textLogout:{
        alignSelf: "center",
        color: "red",
        padding: 10,
        fontSize: 20,
        paddingLeft: 300,
        fontFamily: "sans-serif",
        fontWeight:"500",
    },
    profileDetails: {
        flexDirection: "row"
    },
})
export default DistributorProfile