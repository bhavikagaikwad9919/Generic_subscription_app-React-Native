import React from 'react'
import ProfileImage from "../../assets/profileimage.jpg"
import { Button, Image, StyleSheet, Text, TextInput, View } from 'react-native'

const DistributorCustomerEdit = () => {
  return (
    <View>
        <View style={styles.root}>
            <Text style={styles.name}>Customer Edit Page</Text>

            <View>
                <Image source={ProfileImage} style={styles.ProfileImage}></Image>
            </View>

            <View style={styles.container}>
                <TextInput style={styles.input}
                    placeholder="First Name"
                     />
            </View>
            <View style={styles.container}>
                <TextInput style={styles.input}
                    placeholder="Last Name"
                    />
            </View>
            <View style={styles.container}>
                <TextInput style={styles.input}
                    placeholder="Mobile Number"
                    />
            </View>
            <View style={styles.container}>
                <TextInput style={styles.input}
                    placeholder="Address"
                     />
            </View>
            <View style={styles.button}>
                <Button
                    style={styles.buttonstyle}
                    title="Update"
                />
            </View>
        </View>
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
        width: 180,
        height: 175,
        borderRadius: 95,
        alignSelf: "center",
        // borderWidth: "thick",
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
export default DistributorCustomerEdit