import React, { useEffect, useState } from 'react'
import ProfileImage from "../../assets/profileimage.jpg"
import { Button, Image, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native'
import { baseUrl } from './api_Constants'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { Pressable } from 'react-native'

const DistributorDueEdit = ({route,navigation }) => {
    const [status, setStatus] = useState("")
    const [amount, setAmount] = useState("")
    const [discription, setDiscription] = useState("")
    const [editDue,setEditDue]=useState("")


    const {customerid,Editamountget, Editstatusget, Editdescriptionsget} = route.params

    // console.log("editpayment",customerid,Editamountget, Editstatusget.Editdescriptionsget)

    const fetchData = async () => {
        let value = await AsyncStorage.getItem("Token")
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
                // console.log("DistributorDueDetails", data.data)
                setEditDue(data.data)
                if (data.status_code === 200) {
                    // alert(data.message)
                    setAmount(Editamountget)
                    setStatus(Editstatusget)
                    setDiscription(Editdescriptionsget)
                } else {
                    alert(data.message)
                }
            })
    }

    useEffect(() => {
        fetchData(customerid,Editamountget, Editstatusget, Editdescriptionsget);
    }, [])

    const profileEditData = async (customerid) => {
        console.log("edit",customerid)

        const edit = {
            amount: amount,
            status: status,
            description: discription,
          }
        let value = await AsyncStorage.getItem("Token")
        var bearerToken = value.replace(/"([^"]+(?="))"/g, '$1');
        await fetch(`${baseUrl}mobile/updatebyidduecustomers/${customerid}`, {
            method: 'PATCH',
            headers: {
                Accept: 'application/json',
                'content-Type': 'application/json',
                Authorization: `Bearer ${bearerToken}`,
            },
            body: JSON.stringify(edit)

        }).then((response) => response.json())
            .then(data => {
                if (data.status_code === 200) {
                    alert(data.message)
                    navigation.navigate("DistributorDuePayment")
                } else {
                    alert(data.message)
                }
            })
    }

  return (
    <ScrollView>
    <View style={styles.root}>
        <Text style={styles.name}>Update Due Amount</Text>

        {/* <Text style={styles.lable}>First Name</Text> */}
        <View style={styles.container}>
            <TextInput
                style={styles.input}
                placeholder="Amount"
                value={amount}
                onChangeText={fName => setAmount(fName)}
            />
        </View>

        {/* <Text style={styles.lable}>Last Name</Text> */}
        <View style={styles.container}>
            <TextInput style={styles.input}
                placeholder="Status"
                value={status}
                onChangeText={lName => setStatus(lName)}
            />
        </View>

        {/* <Text style={styles.lable}>Phone Number</Text> */}
        <View style={styles.container}>
            <TextInput style={styles.input}
                placeholder="Description"
                value={discription}
                onChangeText={PhoneNo => setDiscription(PhoneNo)}
            />
        </View>

        <Pressable
        onPress={()=>profileEditData(customerid)}
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
export default DistributorDueEdit