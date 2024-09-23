import React, { useEffect, useState } from 'react'
import { ActivityIndicator, Alert, Image, Modal, SafeAreaView, StatusBar, StyleSheet, Switch, Text, TouchableOpacity, View } from 'react-native'
import CustomerImage1 from "../../assets/avatarimage.jpg"
import AntDesign from 'react-native-vector-icons/AntDesign';
import { baseUrl } from './api_Constants';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ScrollView } from 'react-native';
import moment from 'moment';
import { Button } from 'react-native';
import { Pressable } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';

const DistributorCustomerInfo = ({ route, navigation }) => {

    const [customedata, setCustomeData] = useState([])
    const [lname, setLname] = useState("");
    const [isloading, setIsLoading] = useState(false)
    const [searchcustomer, setSearchCustomer] = useState([])
    const [isModelVisible, setIsModelVisible] = useState(false)
    const [modalVisible, setModalVisible] = useState(false);
    const [isEnabled, setIsEnabled] = useState();
    const [togglebar, setTogglebar] = useState({});

    // const { id } = route.params


    const handleToogleDetails = () => {
        console.log("ToogleButton")
        setIsEnabled(previousState => !previousState)
    }


    const changeModelVisible = (bool) => {
        setIsModelVisible(bool);
    }

    const toggle = () => {
        setIsEnabled(previousState => !previousState)
    }
    const handleCustomerDetails = (id) => {
        console.log("hello", id)
        navigation.navigate("Customer_Detail", { customerid: id })
    }
    const handleAddCustomer = () => {
        console.log("hello")
        navigation.navigate("Add_Customer")

    }

    // const fetchSearchData = async () => {
    //     let value = await AsyncStorage.getItem("Token")
    //     // console.log("value", value)
    //     console.log("searchtext_data", lname)
    //     var bearerToken = value.replace(/"([^"]+(?="))"/g, '$1');
    //     await fetch(`${baseUrl}mobile/getcustomersbydistributor/`, {
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
    //             console.log("SearchCustomer",data.data)
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
        setIsLoading(true)
        await fetch(`${baseUrl}mobile/getcustomersbydistributor/?search=${lname}`, {
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
                console.log("dataCustomer", data)
                setCustomeData(data.data)
                setIsLoading(false)
            })
    }

    useEffect(() => {
        fetchData();
    }, [])


    const profileEditData = async (valueid, id) => {
        console.log("customeridToggle", id)

        const edit = {
            status: valueid ? 1 : 0
        }
        let value = await AsyncStorage.getItem("Token")
        var bearerToken = value.replace(/"([^"]+(?="))"/g, '$1');
        await fetch(`${baseUrl}account/deactivatecustomers/${id}`, {
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
                    console.log("Toogle", data)
                    setTogglebar(data)
                    fetchData()
                    setIsEnabled(previousState => !previousState);
                } else {
                    alert(data.message)
                }
            })
    }
    // useEffect(() => {
    //     profileEditData();
    // }, [])


    return (
        <><ScrollView style={styles.mainroot}>
            <View style={styles.searchmain}>
                <View>
                    {/* <TextInput style={styles.serchholder}
                            placeholder="Search By Number"
                            defaultValue={searchtext}
                            onchangetext={text =>{(console.log("searchtext",searchtext))
                            setSearchtext(text)}}
                            >
                        </TextInput> */}

                    <TextInput style={styles.input}
                        placeholder="Search By Mobile Number..."
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

            {customedata.map((item) =>

                <View style={styles.root} key={item.id}>

                    <TouchableOpacity onPress={() => handleCustomerDetails(item.id)}
                        style={styles.button}>
                        <View style={styles.mainDiv}>
                            <Image source={CustomerImage1} style={styles.CustomerImage1}></Image>
                            <View>
                                <View style={styles.daysdetails}>
                                    <Text style={styles.cardTitle}>{item.customer_name}</Text>
                                    <View style={styles.container}>
                                        <Switch
                                            // onPress={()=>profileEditData()}
                                            trackColor={{ false: '#767577', true: 'green' }}
                                            thumbColor={item.status ? 'green' : 'gray'}
                                            onValueChange={(valueid) => profileEditData(valueid, item.id)}
                                            value={item.status}
                                        />
                                        <StatusBar style="auto" />
                                    </View>
                                    {/* <Pressable style={styles.activeButtom}>
                                        <Text style={styles.activeButtomText}>Active</Text>
                                    </Pressable> */}
                                </View>
                                <Text style={styles.cardNumber}>{item.phone_number}</Text>

                                <View style={styles.daysdetails}>

                                    {/* <Text style={styles.cardname}>Email: {item.email}</Text> */}
                                    {/* <Text style={styles.cardname}>Expiry Date :{(moment(item.plan_end_date).format('YYYY-MM-DD'))}</Text> */}
                                    {/* <Text style={styles.daysdetailsrs}>Rs.{item.amount}</Text> */}
                                </View>
                            </View>
                        </View>
                    </TouchableOpacity>

                </View>)}

        </ScrollView>
            <TouchableOpacity onPress={handleAddCustomer}
                style={styles.pluscircle} >
                <AntDesign name="pluscircle" size={50} color={"#583877"} />
            </TouchableOpacity>
        </>
    )
}
const styles = StyleSheet.create({
    input: {
        backgroundColor: "#fff",
        padding: 10,
        borderRadius: 80,
        color: "#888",
        borderwidth: 1,
        borderColor: "black",
        width: 300
    },
    loader: {
        justifyContent: "center",
        alignItems: "center",
        paddingTop: 210
    },
    searchmain: {
        // margin: 10,
        flexDirection: "row",
        marginLeft: 40,
        marginTop: 20,
        // width:120
    },
    dialogebox: {
        flexDirection: "row",
        margin: 10,
        paddingRight: 100,
    },
    searchimage: {
        paddingTop: 10
    },
    serchholder: {
        width: 300,
        backgroundColor: "#fff",
        padding: 10,
        borderRadius: 80,
        color: "#888",
        borderwidth: 1,
        borderColor: "black"
    },
    mainroot: {
        flex: 1,
    },
    mainDiv: {
        flexDirection: 'row',
    },
    root: {
        flex: 1,
        padding: 16,
    },
    daysdetails: {
        flexDirection: "row",
    },
    daysdetailsrs: {
        paddingLeft: 30,
        color: "green",
        fontSize: 16,
        fontWeight: "500"
    },
    button: {
        backgroundColor: 'white',
        padding: 10,
        // height: 110,
        marginBottom: -20
    },
    CustomerImage1: {
        width: 70,
        height: 70,
        borderRadius: 95,
        marginTop: 10
    },
    cardTitle: {
        width: 220,
        paddingTop: 10,
        fontSize: 20,
        paddingLeft: 25,
        color: "#583877",
    },
    // cardTitleSearch: {
    //     width: 220,
    //     paddingTop: 10,
    //     fontSize: 18,
    //     paddingLeft: 10,
    //     color: "red",
    // },
    cardNumber: {
        paddingTop: 10,
        fontSize: 18,
        paddingLeft: 25,
        paddingBottom: 10
    },
    cardNumberSearch: {
        paddingTop: 10,
        fontSize: 18,
        paddingLeft: 10,
        paddingBottom: 10
    },
    cardname: {
        paddingLeft: 25,
        // color: "#880808"
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
        // fontWeight: "600",

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
        borderColor: "#2196F3",
        borderWidth: 2,
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

    buttonPopupCancle: {
        padding: 9,
        // elevation: 2,
        // marginHorizontal: 30,
    },
    buttonPopupAdd: {
        padding: 9,
    },
    buttonOpen: {
        backgroundColor: "#F194FF",
    },
    buttonAdd: {
        backgroundColor: "#2196F3",
        position: "absolute",
        marginLeft: 120
    },
    buttonClose: {
        backgroundColor: "white",
        borderColor: "#2196F3",
        borderWidth: 2,
    },
    textStyle: {
        color: "Black",
        fontWeight: "bold",
        textAlign: "center",
        width: 70,
        padding: 3
    },
    textStyleOne: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center",
        width: 70,
        padding: 5,
        fontSize: 16
    },
    modalText: {
        marginBottom: 15,
        textAlign: "center"
    }
})
export default DistributorCustomerInfo