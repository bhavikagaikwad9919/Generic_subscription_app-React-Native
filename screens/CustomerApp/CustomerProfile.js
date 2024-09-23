import React, { useEffect, useState } from 'react'
import { Button, Image, StyleSheet, Text, View } from 'react-native'
import ProfileImage from "../../assets/profileCustomer.jpg"
import AntDesign from 'react-native-vector-icons/AntDesign';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { baseUrl } from "../DistributorApp/api_Constants"
import { ActivityIndicator } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';


function CustomerProfile({ navigation }) {
    const [cusProfiledata, setCusProfileData] = useState("")
    const [isloading, setIsLoading] = useState(false)

    const EditPage = (first_name,last_name,phone_number,address) => {
        console.log("editemailget", first_name,last_name,phone_number,address)
        navigation.navigate("Customer_Edit", { EditFnameget: first_name, EditLnameget:last_name,
            EditpNumber:phone_number,Editaddress:address})
    }

    const profileData = async () => {
        let value = await AsyncStorage.getItem("Token")
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
                setCusProfileData(data.data)
                setIsLoading(false)
            })
    }
    useEffect(() => {
        profileData();
    }, [])

    const clearAsyncStorage = async () => {
        AsyncStorage.clear();
        console.log("clearedToken", AsyncStorage.clear())
        navigation.navigate("Login")
    }

    return (
        <ScrollView>
            <View style={styles.root}>
                {isloading && <ActivityIndicator style={styles.loader} size={60} color={"gray"} />}
                <View>
                    <Text onPress={() => EditPage(cusProfiledata.first_name,cusProfiledata.last_name,
                    cusProfiledata.phone_number,cusProfiledata.address)}
                        style={styles.textEdit}>Edit</Text>
                    <Image source={ProfileImage} style={styles.ProfileImage}></Image>
                </View>
                <View>
                    <Text style={styles.titlename}>{cusProfiledata.first_name} {cusProfiledata.last_name}</Text>
                </View>
                <View style={styles.textContainer}>
                    <View style={styles.profileDetails}>
                        <AntDesign name="mail" size={30} color={'#583877'} />
                        <Text style={styles.textdata}>{cusProfiledata.email}</Text>
                    </View>
                    <View style={styles.profileDetails}>
                        <AntDesign name="phone" size={30} color={'#583877'}/>
                        <Text style={styles.textdata}>{cusProfiledata.phone_number}</Text>
                    </View>
                    <View style={styles.profileDetails}>
                        <Ionicons name="location-outline" size={30} color={'#583877'} />
                        <Text style={styles.textdata}>{cusProfiledata.address}</Text>
                    </View>
                </View>
                <View style={styles.textcontainer1}>
                <MaterialIcons onPress={clearAsyncStorage}
                name="logout" size={40}  color={'#583877'}/>

                    {/* <Button onPress={clearAsyncStorage}
                        title="Log Out"
                        color={'#583877'}
                    /> */}
                </View>
            </View>
        </ScrollView>
    )
}
const styles = StyleSheet.create({
    loader: {
        justifyContent: "center",
        alignItems: "center",
        paddingTop: 310,
        paddingBottom: 400
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
        opacity: 0.7
    },
    textContainer: {
        alignSelf: "center",
        paddingTop: 35
    },
    textcontainer1: {
        alignSelf: "center",
        paddingTop: 120,
        paddingLeft: 290,
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
})
export default CustomerProfile