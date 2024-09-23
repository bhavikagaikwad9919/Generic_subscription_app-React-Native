import React, { useEffect, useState } from 'react'
import {
    TouchableOpacity,
    StyleSheet,
    View,
    Text,
    SafeAreaView,
    Image,
    Button,
    ScrollView,
    TextInput,
} from 'react-native'
import CustomerImage1 from "../../assets/avatarimage.jpg"
import AntDesign from 'react-native-vector-icons/AntDesign';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { baseUrl } from './api_Constants';
import moment from 'moment';
import { Modal } from 'react-native';
import { Pressable } from 'react-native';
import { Alert } from 'react-native';



const DistributorTransaction = ({ navigation }) => {

    const [transaction, setTransaction] = useState([])
    const [searchtext, setSearchtext] = useState("")
    const [searchcustomer, setSearchCustomer] =useState([])
    const [lname, setLname] = useState("");
    const [modalVisible, setModalVisible] = useState(false);

    const changeModelVisible = (bool) => {
        setIsModelVisible(bool);
    }


    const transactionDetails = () => {
        navigation.navigate("Transaction_Detail")
    }
    const handleAddPayment = () => {
        console.log("hello")
        navigation.navigate("Add_Customer_Payment")

    }
    const handleCustomerPaymentDetails = (id) => {
        console.log("hello", id)
        navigation.navigate("Transaction_Detail", { customerid: id })
    }

    // const fetchSearchData = async () => {
    //     let value = await AsyncStorage.getItem("Token")
    //     // console.log("value", value)
    //     console.log("searchtext_data", lname)

    //     var bearerToken = value.replace(/"([^"]+(?="))"/g, '$1');
    //     await fetch(`${baseUrl}mobile/getcustomerpayment/?search=${lname}`, {
    //         method: 'GET',
    //         headers: {
    //             Accept: 'application/json',
    //             'content-Type': 'application/json',
    //             Authorization: `Bearer ${bearerToken}`,
    //         },
    //     }).then(response => {
    //         return response.json()
    //     })
    //         .then(data => {
    //             console.log("SearchCustomerDistributor", data.data)
    //             setSearchCustomer(data.data)
    //         })
    // }
    // useEffect(() => {
    //     fetchSearchData();
    // }, [])

    const fetchData = async () => {
        let value = await AsyncStorage.getItem("Token")
        // console.log("value", value)
        var bearerToken = value.replace(/"([^"]+(?="))"/g, '$1');
        await fetch(`${baseUrl}mobile/getcustomerpayment/?search=${lname}`, {
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
                console.log("transaction", data.data)
                setTransaction(data.data)
            })
    }

    useEffect(() => {
        fetchData();
    }, [])
    return (
        <SafeAreaView style={{ flex: 1 }}>
            <ScrollView>
                <View style={styles.viewscroll}>
                
                <View style={styles.searchmain}>
                <View>
                
                <TextInput style={styles.input}
                        placeholder="Search By Mobile Number..."
                        defaultValue={lname}
                        onChangeText={lnewuser => {
                            setLname(lnewuser);
                        }}
                    />

                </View>
                <View>
                    <AntDesign onPress={() => {setModalVisible(!modalVisible) 
                     fetchData()}}
                        name="search1" size={27} color={"black"}
                        style={styles.searchimage} />
                </View>
            </View>
            
                    <View style={styles.viewdiv}>
                        <View>
                            <Text style={styles.mainText}>Recevied From</Text>
                        </View>
                    </View>
                    {transaction.map((item) =>
                        <View key={item.id}>
                            <TouchableOpacity onPress={() => handleCustomerPaymentDetails(item.id)}
                                style={styles.button}>
                                <View style={styles.viewmaindiv}>
                                    <Image source={CustomerImage1} style={styles.CustomerImage1}></Image>
                                    <View>
                                        <Text style={styles.cardTitle}>{item.customer_name}</Text>
                                        <Text style={styles.cardTitleMonth}>{(moment(item.payment_date).format('YYYY-MM-DD hh:mm'))}</Text>
                                        {/* <Text style={styles.cardDiscribtion}>Package : {item.description}</Text> */}

                                    </View>

                                    <View>
                                        <Text style={styles.cardnameplan}>Rs.{item.amount}</Text>
                                    </View>

                                </View>

                            </TouchableOpacity>
                        </View>)}

                </View>
            </ScrollView>
            <TouchableOpacity onPress={handleAddPayment}
                style={styles.pluscircle} >
                <AntDesign name="pluscircle" size={50} color={"#583877"} />
            </TouchableOpacity>
        </SafeAreaView>

    );
}
const styles = StyleSheet.create({
    searchimage:{
        paddingTop:10
    },
    button: {
        backgroundColor: 'white',
        marginTop: 16,
        // marginBottom: 10,
        // backgroundColor: 'white',
        // padding: 10,
        height: 110,
    },
    daysdetails: {
        flexDirection: "row",
    },
    cardTitleSearch: {
        width: 220,
        paddingTop: 10,
        fontSize: 18,
        paddingLeft: 10,
        color: "red",
    },
    cardNumberSearch: {
        paddingTop: 10,
        fontSize: 18,
        paddingLeft: 10,
        paddingBottom: 10
    },
    dialogebox: {
        flexDirection: "row",
        margin: 10,
        paddingRight: 100,
    },
    activeButtom: {
        backgroundColor: "#2E8B57",
        width: 50,
        height: 20,
        alignItems: "center",
        // paddingBottom: 29,
        bottom: 2,
 
    },
    activeButtomText: {
        color: "white",
        fontWeight: "600",

    },
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22,
    },
    modalView: {
        margin: 20,
        backgroundColor: "white",
        borderRadius: 20,
        borderColor:"#2196F3",
        borderWidth:2,
        padding: 35,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
    },
   
    buttonPopupCancle:{
        padding: 9,
        // elevation: 2,
        // marginHorizontal: 30,
  },
    buttonPopupAdd:{
        padding: 9,
    },
    buttonOpen: {
        backgroundColor: "#F194FF",
    },
    buttonAdd: {
        backgroundColor: "#2196F3",
        position:"absolute",
        marginLeft:120
        },
    buttonClose: {
        backgroundColor: "white",
        borderColor:"#2196F3",
        borderWidth:2,
    },
    textStyle: {
        color: "Black",
        fontWeight: "bold",
        textAlign: "center",
        width:70,
        padding:3
    },
    textStyleOne: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center",
        width:70,
        padding:5,
        fontSize:16
    },
    modalText: {
        marginBottom: 15,
        textAlign: "center"
    },
    searchmain: {
        flexDirection: "row",
        marginLeft: 20,
    },
    searchimage: {
        paddingTop: 10
    },
    input:{
        backgroundColor: "#fff",
        padding: 10,
        borderRadius: 80,
        color: "#888",
        borderwidth: 1,
        borderColor: "black",
        width:300
    },
    serchholder: {
        backgroundColor: "#fff",
        padding: 10,
        borderRadius: 80,
        color: "#888",
        borderwidth: 1,
        borderColor: "black",
        width:300
    },
    buttonAdd: {
        backgroundColor: "#2196F3",
        position:"absolute",
        marginLeft:120
        },
    pluscircle: {

        position: "absolute",
        width: 50,
        height: 50,
        bottom: 30,
        right: 20,
        justifyContent: "center",
        alignItems: "center"
    },
    CustomerImage1: {
        width: 70,
        height: 70,
        borderRadius: 95,
    },
    cardTitle: {
        paddingLeft: 20,
        paddingTop: 10,
        fontSize: 20,
        fontFamily: "sans-serif",
        color: "#583877",
        fontSize: 18,
        fontWeight: "650",
        width: 150,
    },
    cardDiscribtion: {
        paddingTop: 10,
        width: 150,
        fontSize: 17,
        paddingLeft: 20,
        fontSize: 15,
        fontFamily: "sans-serif",
    },
    cardTitleMonth: {
        paddingTop: 10,
        paddingLeft: 20,
        fontSize: 13,
        color: "#2E8B57",
        fontFamily: "sans-serif",

    },
    cardnameplan: {
        paddingLeft: 45,
        paddingTop: 10,
        fontSize: 15,
        fontFamily: "sans-serif",
        color: "black",
        fontSize: 16,
        fontWeight: "500"
    },
    textday: {
        opacity: 0.8,
        alignItems: "center",
        color: "#2E8B57",
    },
    textdate: {
        color: "#2E8B57",
        alignItems: "center",
        fontSize: 20,
    },
    mainText: {
        fontSize: 22,
        paddingTop: 20,
        fontFamily: "Roboto",
        fontWeight: "bold",
        // color: "#583877",
    },
    mainTexticon: {
        paddingTop: 20,
        paddingLeft: 17,
        fontSize: 27
    },
    homeicon: {
        fontSize: 32,
        padding: 25,
        color: "#583877"
    },
    customericon: {
        fontSize: 30,
        padding: 25,
        color: "#583877"
    },
    transactionicon: {
        fontSize: 30,
        padding: 25,
        color: "#583877"
    },
    profileicon: {
        fontSize: 32,
        padding: 25,
        color: "#583877"
    },
    iconSize: {
        display: "block",
        backgroundColor: "white",
        padding: 20,
        innerHeight: 70
    },
    viewscroll: {
        flex: 1,
        padding: 16,
        overflowX: "scroll"
    },
    viewdiv: {
        flexDirection: 'row',
    },
    viewmaindiv: {
        flexDirection: 'row',
        padding: 20
    }
});
export default DistributorTransaction

