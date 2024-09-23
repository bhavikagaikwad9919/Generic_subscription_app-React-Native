import React, { useState } from 'react'
import { Text, View, StyleSheet, TextInput, Pressable, Image, ScrollView } from 'react-native'
import LoginImage from "../assets/social_network_people.jpg"
import { baseUrl } from './DistributorApp/api_Constants';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Login = ({ navigation }) => {
    const [phone_number, Setphone_number] = useState("");
    const [password, setPassword] = useState("");

    const loginButton = async () => {
        let item = { phone_number, password }

        const fetched = await fetch(`${baseUrl}account/login/`, {
            method: "POST",
            mode: "cors",
            headers: {
                "Content-Type": "application/json",
                // "Accept": "application/json"
                'Access-Control-Allow-Origin': '*',
            },
            body: JSON.stringify(item)
        })
        const response = await fetched.json()
        console.log("response.data", response)
        if (response.status_code === 200) {
            AsyncStorage.setItem("Token", JSON.stringify(response.token.access));
            AsyncStorage.setItem("roilid", JSON.stringify(response.user_id));
            console.log("roleid",response.role_id)
            if(response.role_id===3){
                navigation.navigate("CustomerBottomTab") 
            }else if(response.role_id===2){
                    navigation.navigate("DistributorBottomtab")
                }
            else{
                navigation.navigate("DistributorProfile")
            }
        }else {
            alert(response.message)
        }
    }

    return (
        <ScrollView>
        <View style={styles.main}>
            <Image source={LoginImage} style={styles.loginImage}></Image>
            <Text style={styles.text}>Login</Text>
            <View style={styles.container}>
                <TextInput style={styles.input}
                    placeholder="phone_number"
                    defaultValue={phone_number}
                    onChangeText={newuser => Setphone_number(newuser)} />
            </View>
            <View style={styles.container}>
                <TextInput style={styles.input}
                    placeholder="Password"
                    onChangeText={newPassword => setPassword(newPassword)}
                    defaultValue={password}
                    secureTextEntry={true} />
            </View>
            <Pressable
                onPress={loginButton}
                style={styles.containerButton}>
                <Text style={styles.textButton}>Login</Text>
            </Pressable>
        </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    main: {
        alignItems: 'center',
        backgroundColor: "white",
        height: 780
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
        marginVertical: 10
    },
    containerButton: {
        backgroundColor: "#583877",
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
    },
     loginImage: {
        width: 350,
        height: 200,
        marginTop: 40
    }
})
export default Login