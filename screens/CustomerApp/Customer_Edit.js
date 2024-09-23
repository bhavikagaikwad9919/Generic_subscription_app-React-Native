import React, { useEffect, useState } from 'react'
import ProfileImage from "../../assets/profileimage.jpg"
import { Button, Image, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { baseUrl } from '../DistributorApp/api_Constants'

const CustomerEdit = ({navigation,route }) => {

    const [cusProfileEditdata, setCusProfileEditData] = useState({})
    const [cusProfiledata, setCusProfileData] = useState("")
    const [first_name, setFirst_name] = useState("")
    const [last_name, setLast_Name] = useState("")
    const [phone_number, setPhone_number] = useState("")
    const [address, setAddress] = useState("")
    const [email, setEmail] = useState("")
    const [profile_picture_url, setProfile_picture_url] = useState("")

    const { EditFnameget,EditLnameget,EditpNumber,Editaddress} = route.params


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
                    {EditFnameget}
                } else {
                    alert(data.message)
                }
            })
    }

    useEffect(() => {
        profileData(EditFnameget,EditLnameget,EditpNumber,Editaddress);
        console.log("EditFnameget",EditFnameget,EditLnameget,EditpNumber,Editaddress)
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
                    navigation.navigate("CustomerProfile")
                    alert(data.message)
                } else {
                    alert(data.message)
                }
            })
    }

    // useEffect(() => {
    //     profileData(EditFnameget,EditLnameget,EditpNumber,Editaddress);
    // }, [])

    return (

        <View>
            <ScrollView>
                <View style={styles.root}>
                    <Text style={styles.name}>Profile</Text>
                    <View>
                        <Image source={ProfileImage} style={styles.ProfileImage}></Image>
                    </View>

                    <View style={styles.container}>
                        <TextInput
                            style={styles.input}
                            placeholder="First Name"
                            value={first_name}
                            onChangeText={fName => {
                                setFirst_name(fName)
                            }}
                        />
                    </View>

                    <View style={styles.container}>
                        <TextInput style={styles.input}
                            placeholder="Last Name"
                            value={last_name}
                            onChangeText={lName => setLast_Name(lName)}
                        />
                    </View>
                    <View style={styles.container}>
                        <TextInput style={styles.input}
                            placeholder="Mobile Number"
                            value={phone_number}
                            onChangeText={PhoneNo => setPhone_number(PhoneNo)}
                        />
                    </View>

                    <View style={styles.container}>
                        <TextInput style={styles.input}
                            placeholder="Address"
                            value={address}
                            onChangeText={address => setAddress(address)}
                        />
                    </View>

                    <View style={styles.button}>
                        <Button onPress={profileEditData}
                            style={styles.buttonstyle}
                            title="Update"
                        />
                    </View>
                </View>
            </ScrollView>
        </View>
    )
}
const styles = StyleSheet.create({
    root: {
        overflow: "scroll"
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
        padding: 20
    },
    buttonstyle: {
        width: 190,
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
    containerButton: {
        backgroundColor: "#6E93F0",
        padding: 15,
        width: '80%',
        height: 54,
        borderRadius: 5,
        alignItems: "center",
        marginVertical: 10
    },
    textButton: {
        color: "white",
        fontWeight: "bold",
        fontSize: 18,
    },
    input: {
        height: 45,
        borderRadius: 5,
        color: "black",
        padding: 5
    }, loginImage: {
        width: 350,
        height: 200,
        marginTop: 40
    }
})
export default CustomerEdit