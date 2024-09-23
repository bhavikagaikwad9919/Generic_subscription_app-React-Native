import React, { useEffect, useState } from 'react'
import ProfileImage from "../../assets/profileimage.jpg"
import { Button, Image, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native'
import { baseUrl } from './api_Constants'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { Pressable } from 'react-native'


const Distributor_Edit = ({ navigation, route }) => {

    const [cusProfileEditdata, setCusProfileEditData] = useState({})
    const [cusProfiledata, setCusProfileData] = useState("")
    const [first_name, setFirst_name] = useState("")
    const [last_name, setLast_Name] = useState("")
    const [phone_number, setPhone_number] = useState("")
    const [address, setAddress] = useState("")
    const [email, setEmail] = useState("")
    const [profile_picture_url, setProfile_picture_url] = useState("")
    const [firstname, setFirstname] = useState("")


    const { EditFnameget, EditLnameget, EditpNumber, Editaddress } = route.params


    const profileData = async () => {

        let value = await AsyncStorage.getItem("Token")
        var bearerToken = value.replace(/"([^"]+(?="))"/g, '$1');
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
                if (data.status_code === 200) {
                    alert(data.message)
                    setFirst_name(EditFnameget)
                    setLast_Name(EditLnameget)
                    setPhone_number(EditpNumber)
                    setAddress(Editaddress)
                } else {
                    alert(data.message)
                }
            })
    }

    useEffect(() => {
        profileData(EditFnameget, EditLnameget, EditpNumber, Editaddress);
    }, [])

    const profileEditData = async () => {
        const edit = {
            first_name: first_name,
            last_name: last_name,
            email: email,
            phone_number: phone_number,
            role_id: "3",
            profile_picture_url: profile_picture_url,
            address: address
        }

        console.log("editDataimp", JSON.stringify(edit))
        let value = await AsyncStorage.getItem("Token")
        var bearerToken = value.replace(/"([^"]+(?="))"/g, '$1');
        await fetch(`${baseUrl}mobile/updateprofile/`, {
            method: 'PUT',
            headers: {
                Accept: 'application/json',
                'content-Type': 'application/json',
                Authorization: `Bearer ${bearerToken}`,
            },
            body: JSON.stringify(edit)

        }).then((response) => response.json())
            .then(data => {
                console.log("DataEdit", data.data)
                setFirst_name(data.data.first_name)
                setLast_Name(data.data.last_name)
                setPhone_number(data.data.phone_number)
                setAddress(data.data.address)
                profileData();
                if (data.status_code === 200) {
                    navigation.navigate("DistributorProfile")
                    alert(data.message)
                } else {
                    alert(data.message)
                }
            })
    }

    return (
            <ScrollView>
                <View style={styles.root}>
                    <Text style={styles.name}>Profile</Text>
                    <View>
                        <Image source={ProfileImage} style={styles.ProfileImage}></Image>
                    </View>

                    {/* <Text style={styles.lable}>First Name</Text> */}
                    <View style={styles.container}>
                        <TextInput
                            style={styles.input}
                            placeholder="First Name"
                            value={first_name}
                            onChangeText={fName => setFirst_name(fName)}
                        />
                    </View>

                    {/* <Text style={styles.lable}>Last Name</Text> */}
                    <View style={styles.container}>
                        <TextInput style={styles.input}
                            placeholder="Last Name"
                            value={last_name}
                            onChangeText={lName => setLast_Name(lName)}
                        />
                    </View>

                    {/* <Text style={styles.lable}>Phone Number</Text> */}
                    <View style={styles.container}>
                        <TextInput style={styles.input}
                            placeholder="Mobile Number"
                            value={phone_number}
                            onChangeText={PhoneNo => setPhone_number(PhoneNo)}
                        />
                    </View>

                    {/* <Text style={styles.lable}>Address</Text> */}
                    <View style={styles.container}>
                        <TextInput style={styles.input}
                            placeholder="Address"
                            value={address}
                            onChangeText={address => setAddress(address)}
                        />
                    </View>

                    {/* <View style={styles.button}>
                        <Button style={styles.buttonstyle}
                            onPress={profileEditData}
                            title="Update"
                        />
                    </View> */}

                    <Pressable
                     onPress={profileEditData}
                    style={styles.containerButton}>
                    <Text style={styles.textButton}>Submit</Text>
                </Pressable>
                </View>
            </ScrollView>
    )
}
const styles = StyleSheet.create({
    containerButton: {
        backgroundColor: "#583877",
        padding: 15,
        width: '50%',
        height: 54,
        borderRadius: 5,
        alignItems: "center",
        marginVertical: 10,
        fontSize:20
    },
    textButton: {
        color: "white",
        fontWeight: "bold",
        fontSize: 18,
    },
    lable: {
        marginLeft: 48,
        color:"black",
        fontSize:15
    },
    root: {
        alignItems: 'center',
        // backgroundColor: "red",
    },
    main: {
        alignItems: 'center',
        backgroundColor: "white",
        height: 780
    },
    ProfileImage: {
        width: 165,
        height: 160,
        borderRadius: 95,
        alignSelf: "center",
        borderWidth: 6,
        borderColor: "white"
    },
    name: {
        alignSelf: "center",
        fontSize: 25,
        color: "black",
        marginVertical: 20,
    },
    button: {
        flexDirection: 'row',
        marginTop: 5,
        borderRadius: 8,
        alignSelf: "center",
        padding: 20,

    },
    buttonstyle: {
        // width: 190,
        color: "#583877",
    },
    text: {
        fontWeight: "bold",
        fontSize: 25,
        color: "#505050",
        marginVertical: 7,
        width: 100,
        textAlign: "center",
        marginTop: 40,
        marginBottom: 20
    },
    container: {
        backgroundColor: 'white',
        width: '80%',
        height: 50,
        borderColor: '#E8E8E8',
        borderWidth: 2,
        borderRadius: 8,
        marginVertical: 10,
        alignSelf: 'center'
    },
    // containerButton: {
    //     backgroundColor: "#6E93F0",
    //     padding: 15,
    //     width: '80%',
    //     height: 54,
    //     borderRadius: 5,
    //     alignItems: "center",
    //     marginVertical: 10
    // },
    // textButton: {
    //     color: "white",
    //     fontWeight: "bold",
    //     fontSize: 18,
    // },
    input: {
        height: 45,
        borderRadius: 5,
        color: "black",
    }, 
    loginImage: {
        width: 350,
        height: 200,
        marginTop: 40
    }
})


export default Distributor_Edit
