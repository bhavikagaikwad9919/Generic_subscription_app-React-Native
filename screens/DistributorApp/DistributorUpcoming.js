import AsyncStorage from '@react-native-async-storage/async-storage'
import moment from 'moment'
import React, { useEffect, useState } from 'react'
import { Alert, Image, Modal, Pressable, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { ScrollView, TextInput } from 'react-native-gesture-handler'
import CustomerImage1 from "../../assets/avatarimage.jpg"
import AntDesign from 'react-native-vector-icons/AntDesign';
import { baseUrl } from './api_Constants'

const DistributorUpcoming = () => {

    const [IsLoading, setIsLoading] = useState(false);
    const [Upcoming, setUpcoming] = useState([]);
    const [searchcustomer, setSearchCustomer] = useState([])
    const [lname, setLname] = useState("");
    const [modalVisible, setModalVisible] = useState(false);

    const changeModelVisible = (bool) => {
        setIsModelVisible(bool);
    }

    // const fetchSearchData = async () => {
    //     let value = await AsyncStorage.getItem("Token")
    //     // console.log("value", value)
    //     console.log("searchtext_data", lname)
    //     var bearerToken = value.replace(/"([^"]+(?="))"/g, '$1');
    //     await fetch(`${baseUrl}mobile/getcustomerpayment/?search=${lname}`,
    //         {
    //             method: 'GET',
    //             headers: {
    //                 Accept: 'application/json',
    //                 'content-Type': 'application/json',
    //                 Authorization: `Bearer ${bearerToken}`,
    //             },
    //         }).then(response => {
    //             return response.json()
    //         })
    //         .then(data => {
    //             console.log("SearchPersonName", data.data)
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
        // setIsLoading(true)
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
                console.log("UpcomingPayment", data.data)
                setUpcoming(data.data)
                setIsLoading(false)
            })
    }

    useEffect(() => {
        fetchData();
    }, [])
    return (
        <ScrollView>
        <SafeAreaView style={styles.mainroot}>

                <View style={styles.searchmain}>
                    <View>

                        <TextInput style={styles.input}
                            placeholder="Search By Name..."
                            defaultValue={lname}
                            onChangeText={lnewuser => {
                                setLname(lnewuser);
                            }}
                        //  onChange={(e)=> setQuery(e.target.value)}   
                        />

                    </View>
                    <View>
                        <AntDesign onPress={() => {
                            setModalVisible(!modalVisible)
                            fetchData()
                        }}
                            name="search1" size={27} color={"black"}
                            style={styles.searchimage} />
                    </View>
                </View>
                <View style={styles.centeredView}>
                    <Modal
                        animationType="slide"
                        transparent={true}
                        visible={modalVisible}
                        onRequestClose={() => {
                            Alert.alert("Modal has been closed.");
                            setModalVisible(!modalVisible);
                        }}
                    >
                        {searchcustomer.map((item) =>
                            <View style={styles.centeredView} Key={item.id}>
                                <View style={styles.modalView}>
                                    <View>
                                        <View style={styles.daysdetails}>
                                            <Text style={styles.cardTitleSearch}>Name : {item.customer_name}</Text>
                                            <Pressable style={styles.activeButtom}>
                                                <Text style={styles.activeButtomText}>Active</Text>
                                            </Pressable>
                                        </View>
                                        <Text style={styles.cardNumberSearch}>Mobile number : {item.description}</Text>

                                        <View style={styles.daysdetails}>
                                            {/* <Image source={CustomerImage1} style={styles.CustomerImage1}>Image:{item.profile_picture_url}</Image> */}

                                            <Text style={styles.cardNumberSearch}>Address : {item.profile_picture_url}</Text>
                                        </View>
                                    </View>
                                    <View style={styles.dialogebox}>
                                        <Pressable
                                            style={[styles.buttonPopupCancle, styles.buttonClose]}
                                            onPress={() => setModalVisible(!modalVisible)}>
                                            <Text style={styles.textStyle}>Cancel</Text>
                                        </Pressable>
                                        <Pressable
                                            style={[styles.buttonPopupAdd, styles.buttonAdd]}
                                            onPress={() => setModalVisible(!modalVisible)}>
                                            <Text style={styles.textStyleOne}>Add</Text>
                                        </Pressable>
                                    </View>
                                </View>
                            </View>)}
                    </Modal>
                </View>
                {Upcoming.map((item) =>
                    <View key={item.id}>
                        <TouchableOpacity
                            style={styles.button}>
                            <View style={styles.viewmaindiv}>
                                <Image source={CustomerImage1} style={styles.CustomerImage1}></Image>
                                {/* <View>
                                <Text style={styles.textday}>WED</Text>
                                <Text style={styles.textdate}>16</Text>
                            </View> */}
                                <View>
                                    <Text style={styles.cardTitle}>{item.customer_name}</Text>
                                    <Text style={styles.cardTitleMonth}>{(moment(item.payment_date).format('YYYY-MM-DD hh:mm'))}</Text>

                                    {/* <Text style={styles.cardDiscribtion}>Description : {item.description}</Text> */}

                                </View>

                                <View>
                                    <Text style={styles.cardnameplan}>Rs.{item.amount}</Text>
                                </View>

                            </View>

                        </TouchableOpacity>
                    </View>)}
       
                     </SafeAreaView>
                     </ScrollView>
    )
}
const styles = StyleSheet.create({
    mainroot: {
        flex: 1,
        padding: 16
    },
    button: {
        backgroundColor: 'white',
        marginTop: 16,
        marginBottom: 10,
        // width: 100
    },
    viewmaindiv: {
        flexDirection: 'row',
        padding: 10
    },
    CustomerImage1: {
        width: 70,
        height: 70,
        borderRadius: 95,
    },
    cardTitle: {
        width: 180,
        paddingTop: 10,
        fontSize: 20,
        paddingLeft: 25,
        color:"#583877",
    },
    cardTitleMonth: {
        paddingTop: 10,
        paddingLeft: 20,
        fontSize: 13,
        color: "#2E8B57",
        fontFamily: "sans-serif",

    },
    cardDiscribtion: {
        paddingTop: 10,
        width: 180,
        fontSize: 17,
        paddingLeft: 20,
        fontSize: 15,
        fontFamily: "sans-serif",
    },
    cardnameplan: {
        paddingLeft: 25,
        paddingTop: 12,
        fontSize: 15,
        fontFamily: "sans-serif",
        color: "black",
        fontWeight: "500"
    },

    mainDiv: {
        flexDirection: 'row'
    },
    root: {
        flex: 1,
        padding: 16,
        overflowX: "scroll"
    },
    // cardDiscribtion: {
    //     paddingTop: 10,
    //     width: 350,
    //     // fontSize: 17,
    //     paddingLeft: 10,
    //     fontSize: 15,
    //     fontFamily: "sans-serif",
    // },
    daysdetails: {
        flexDirection: "row"
    },
    daysdetailsrs: {
        paddingLeft: 65
    },
    button: {
        backgroundColor: 'white',
        padding: 10,
        marginTop: 16,
    },
    // cardTitle: {
    //     paddingTop: 10,
    //     fontSize: 18,
    //     paddingLeft: 25,
    //     paddingBottom: 12
    // },
    cardname: {
        paddingLeft: 25,
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
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22,
    },
    daysdetails: {
        flexDirection: "row",
    },
    cardTitleSearch: {
        width: 220,
        paddingTop: 10,
        fontSize: 18,
        paddingLeft: 10,
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
    input:{
        backgroundColor: "#fff",
        padding: 10,
        borderRadius: 80,
        color: "#888",
        borderwidth: 1,
        borderColor: "black",
        width:300
    },
    searchmain: {
        // margin: 10,
        flexDirection: "row",
        marginLeft: 20,
        marginTop: 20,
        // width:120
    },
    searchimage:{
        paddingTop:10
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
})
export default DistributorUpcoming