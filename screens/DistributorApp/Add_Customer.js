import React, { useState, useEffect } from 'react'
import { Button, StyleSheet, Text, TextInput, View, ViewBase, Modal, Alert} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { baseUrl } from './api_Constants';
import { ScrollView, TouchableOpacity} from 'react-native-gesture-handler';
import { ActivityIndicator } from 'react-native-paper';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import AntDesign from 'react-native-vector-icons/AntDesign';
import moment from "moment";
import { Pressable } from 'react-native';


// import DatePicker from 'react-native-date-picker';

const Add_Customer = ({ navigation }) => {
    const [fname, setFname] = useState("");
    const [lname, setLname] = useState("");
    const [email, setEmail] = useState("");
    const [pno, setPno] = useState("");
    const [pass, setPass] = useState("");
    const [cpass, setCpass] = useState("");
    const [camount, setCamount] = useState("");
    const [cstartdate, setStartdate] = useState("");
    const [cenddate, setEnddate] = useState("");
    const [Address, setAddress] = useState("");
    const [isloading, setIsLoading] = useState(false)
    const [emailerr, setEmailerr] = useState("");
    const [fnameerr, setfnameerr] = useState("");
    const [lnameerr, setlnameerr] = useState("");
    const [phonenoerr, setPhoneno] = useState("");
    const [Pass1err, setPass1err] = useState("");
    const [Pass2err, setPass2err] = useState("");
    const [Amounterr, setAmounterr] = useState("");
    const [Startdateerr, setStartdateerr] = useState("");
    const [Enddateerr, setEnddateerr] = useState("");
    const [Addresserr, setAddresserr] = useState("");
    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
    const [isDatePickerVisiblee, setDatePickerVisibilityy] = useState(false);
    const [date, setDate] = useState('');
    const [datee, setDatee] = useState('');
    const [modalVisible, setModalVisible] = useState(false);
    const [lnames, setLnames] = useState("");
    const [searchcustomer,setSearchCustomer]=useState([])

    // const [date, setDate] = useState(new Date());
    // const [open, setOpen] = useState(false);


    const showDatePicker = () => {
        setDatePickerVisibility(true);
    };

    const hideDatePicker = () => {
        setDatePickerVisibility(false);
    };

    const handleConfirm = (date) => {
        setDate(date);
        setStartdate(date);
        hideDatePicker();
    };


    const getDate = () => {
        let tempdate = moment(date).format('YYYY-MM-DD');
        return tempdate
        // if( cstartdate ){
        
        //     return  moment(cstartdate).format('YYYY-MM-DD')
        // }
        // else{
        //     return cstartdate = " ";
        // }
    };


    const showDatePickerr = () => {
        setDatePickerVisibilityy(true);
    };

    const hideDatePickerr = () => {
        setDatePickerVisibilityy(false);
    };

    const handleConfirmm = (datee) => {
        setDatee(datee);
        setEnddate(datee);
        hideDatePickerr();
    };
    const getDatee = () => {
        let tempdate = moment(datee).format('YYYY-MM-DD');
            return tempdate
    };


     const fetchSearchData = async () => {
        let value = await AsyncStorage.getItem("Token")
        // console.log("value", value)
        console.log("searchtext_data", lnames)
        var bearerToken = value.replace(/"([^"]+(?="))"/g, '$1');
        await fetch(`${baseUrl}mobile/getexistingcustomers/?search=${lnames}`,
            {
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
                console.log("SearchPersonName", data.data)
                setSearchCustomer(data.data)
            })
    }
   
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

    const AddExistingCustomer = async (customer_id) => {
        console.log("customer_id",customer_id)
        
        const data = {
            customer_id: customer_id, 
        }

        let value = await AsyncStorage.getItem("Token")
        var bearerToken = value.replace(/"([^"]+(?="))"/g, '$1');
        await fetch(`${baseUrl}account/addoldcustomers/`, {
            method: 'POST',
            headers: {
                "Accept": 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${bearerToken}`,
            },
            body: JSON.stringify(data),
        })
            .then((response) => response.json())
            .then((responseJson) => {
                console.log("exsisting customer", responseJson)
                if (responseJson.status_code === 200) {
                    navigation.navigate("DistributorCustomerInfo")
                    fetchData()
                    alert(responseJson.message)
                } else{
                    alert(responseJson.message)
                }
            })

        // <DatePicker
        //     modal
        //     open={open}
        //     date={date}
        //     onConfirm={(date) => {
        //         setOpen(false)
        //         setDate(date)
        //     }}
        //     onCancel={() => {
        //         setOpen(false)
        //     }}
        // />
    }

    const AddCustomer = async () => {
        const data = {
            email: email,
            role_id: 3,
            phone_number: pno,
            profile: {
                first_name: fname,
                last_name: lname,
                address: Address,
            },
           
        }

        let value = await AsyncStorage.getItem("Token")
        var bearerToken = value.replace(/"([^"]+(?="))"/g, '$1');
        setIsLoading(true)
        await fetch(`${baseUrl}account/addcustomers/`, {
            method: 'POST',
            headers: {
                "Accept": 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${bearerToken}`,
            },
            body: JSON.stringify(data),
        })
            .then((response) => response.json())
            .then((responseJson) => {
                console.log('response object:', responseJson)
                if (responseJson.status_code === 200) {
                    setIsLoading(true)
                    navigation.navigate("DistributorCustomerInfo")
                    alert(responseJson.message)
                } else if (responseJson.status_code === 400) {
                    alert(responseJson.message)
                    if (!fname) {
                        setfnameerr("First Name Required")
                    } if (!lname) {
                        setlnameerr("Last Name Required")
                    } if (!email) {
                        setEmailerr("Email Required")
                    } if (!pno) {
                        setPhoneno("Phone No. Required")
                    } if (!pass) {
                        setPass1err("Password Required")
                    } if (!cpass) {
                        setPass2err("Confirm Password Required")
                    } if (!camount) {
                        setAmounterr("Amount Required")
                    } if (!cstartdate) {
                        setStartdateerr("Confirm Startdate Required")
                    } if (!cenddate) {
                        setEnddateerr("Confirm EndDate Required")
                    } if (!Address) {
                        setAddresserr("Confirm Description Required")
                    }

                }

            })
            .catch((error) => {
                console.error(error);
            });

        // <DatePicker
        //     modal
        //     open={open}
        //     date={date}
        //     onConfirm={(date) => {
        //         setOpen(false)
        //         setDate(date)
        //     }}
        //     onCancel={() => {
        //         setOpen(false)
        //     }}
        // />
    }
    return (
        <ScrollView style={styles.root}>
         <View style={styles.searchmain}>
                    <View>

                        <TextInput style={styles.inputsearch}
                            placeholder="Search By Name..."
                            defaultValue={lnames}
                            onChangeText={lnewusers => {
                                setLnames(lnewusers);
                            }}
                        //  onChange={(e)=> setQuery(e.target.value)}   
                        />

                    </View>
                    <View>
                        <AntDesign onPress={() => {
                            setModalVisible(!modalVisible) 
                            fetchSearchData();
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
                            <View style={styles.centeredView}>
                                <View style={styles.modalView}>
                                    <View>
                                        <View style={styles.daysdetails}>
                                            <Text style={styles.cardTitleSearch}>Name : {item.name}</Text>
                                            <Pressable style={styles.activeButtom}>
                                                <Text style={styles.activeButtomText}>Active</Text>
                                            </Pressable>
                                        </View>
                                        <Text style={styles.cardNumberSearch}>Mobile number : {item.phone_number} </Text>

                                        <View style={styles.daysdetails}>
                                            {/* <Image source={CustomerImage1} style={styles.CustomerImage1}>Image:{item.profile_picture_url}</Image> */}

                                            <Text style={styles.cardNumberSearch}>Address : {item.address} </Text>
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
                                            onPress={() =>{setModalVisible(!modalVisible)
                                             AddExistingCustomer(item.customer_id)}
                                            }
                                            >
                                            <Text style={styles.textStyleOne}>Add</Text>
                                        </Pressable>
                                    </View>
                                </View>
                            </View>)}
                    </Modal>
                </View>


            <View style={styles.maindiv}>
                <Text style={styles.name}>Registration</Text>
                <View style={styles.container}>
                    <TextInput style={styles.input}
                        placeholder="Enter First Name"
                        defaultValue={fname}
                        onChangeText={fnewuser => {
                            setFname(fnewuser);
                            setfnameerr()
                        }}
                    />
                </View>
                <Text style={styles.ferr}>{fnameerr}</Text>

                <View style={styles.container}>
                    <TextInput style={styles.input}
                        placeholder="Enter Last Name"
                        defaultValue={lname}
                        onChangeText={lnewuser => {
                            setLname(lnewuser);
                            setlnameerr()
                        }} />
                </View>
                <Text style={styles.ferr}>{lnameerr}</Text>

                <View style={styles.container}>
                    <TextInput style={styles.input}
                        placeholder="Enter Email ID"
                        defaultValue={email}
                        onChangeText={Emailnewuser => {
                            setEmail(Emailnewuser);
                            setEmailerr()
                        }} />
                </View>
                <Text style={styles.ferr}>{emailerr}</Text>

                <View style={styles.container}>
                    <TextInput style={styles.input}
                        placeholder="Enter Mobile Number"
                        defaultValue={pno}
                        onChangeText={Phonenewuser => {
                            setPno(Phonenewuser);
                            setPhoneno()
                        }} />
                </View>
                <Text style={styles.ferr}>{phonenoerr}</Text>

                {/* <View style={styles.container}>
                    <TextInput style={styles.input}
                        placeholder="Enter Password"
                        defaultValue={pass}
                        onChangeText={Passwordnewuser => {
                            setPass(Passwordnewuser)
                            setPass1err()
                        }} />
                </View> */}
                {/* <Text style={styles.ferr}>{Pass1err}</Text> */}

                {/* <View style={styles.container}>
                    <TextInput style={styles.input}
                        placeholder="Enter Confirm Password"
                        defaultValue={cpass}
                        onChangeText={Confirmpassnewuser => {
                            setCpass(Confirmpassnewuser);
                            setPass2err()
                        }} />
                </View>
                <Text style={styles.ferr}>{Pass2err}</Text> */}

                {/* <View style={styles.container}>
                    <TextInput style={styles.input}
                        placeholder="Enter Amount"
                        defaultValue={camount}
                        onChangeText={Amountnew => {
                            setCamount(Amountnew);
                            setAmounterr()
                        }} />
                </View>
                <Text style={styles.ferr}>{Amounterr}</Text> */}

                {/* <View style={styles.maindate}>


                    <View style={styles.containerDatePicker}>
                        <TextInput
                            style={styles.input}
                            value={getDate()}
                            placeholder="Enter Start Date"
                            onChangeText={startDatenew => {
                                setStartdate(startDatenew);
                                setStartdateerr()
                            }} />

                    </View>
                    <View style={styles.MainView}>
                        <AntDesign name="calendar" size={30}
                            onPress={showDatePicker} />
                        <DateTimePickerModal
                            isVisible={isDatePickerVisible}
                            mode="date"
                            onConfirm={handleConfirm}
                            onCancel={hideDatePicker}
                        />
                    </View>
                </View> */}

                
                {/* <Text style={styles.ferr}>{Startdateerr}</Text> */}


                {/* <View style={styles.maindate}>

                    <View style={styles.containerDatePicker}>
                        <TextInput style={styles.input}
                            placeholder="Enetr End Date"
                            value={getDatee()}
                            // defaultValue={cenddate}
                            onChangeText={endDatenew => {
                                setEnddate(endDatenew);
                                setEnddateerr()
                            }} />

                    </View>
                    <View style={styles.MainView}>
                        <AntDesign name="calendar" size={30}
                            onPress={showDatePickerr} />
                        <DateTimePickerModal
                            isVisible={isDatePickerVisiblee}
                            mode="date"
                            onConfirm={handleConfirmm}
                            onCancel={hideDatePickerr}
                        />
                    </View>
                </View> */}

               
                {/* <Text style={styles.ferr}>{Enddateerr}</Text> */}

                <View style={styles.container}>
                    <TextInput style={styles.input}
                        placeholder="Enter Address"
                        defaultValue={Address}
                        onChangeText={disnew => {
                            setAddress(disnew);
                            setAddresserr()
                        }} />
                </View>
                <Text style={styles.ferr}>{Addresserr}</Text>

                {/* <View style={styles.button}>
                <Button
                    onPress={AddCustomer}
                    title="Submit"
                />
            </View> */}

                <Pressable
                    onPress={AddCustomer}
                    style={styles.containerButton}>
                    <Text style={styles.textButton}>Submit</Text>
                </Pressable>
            </View>
        </ScrollView>
    );
}
const styles = StyleSheet.create({
    maindiv: {
        alignItems: 'center',
        backgroundColor: "white",
    },
    searchmain: {
        // margin: 10,
        flexDirection: "row",
        marginLeft: 30,
        marginTop: 20,
        // width:120
    },
    inputsearch:{
        backgroundColor: "#fff",
        padding: 10,
        borderRadius: 80,
        color: "#888",
        borderwidth: 1,
        borderColor: "black",
        width:300
    },
    containerButton: {
        backgroundColor: "#583877",
        padding: 15,
        width: '50%',
        height: 54,
        borderRadius: 5,
        alignItems: "center",
        marginVertical: 10,
        fontSize: 20
    },
    textButton: {
        color: "white",
        fontWeight: "bold",
        fontSize: 18,
    },
    title: {
        textAlign: 'left',
        fontSize: 20,
        fontWeight: 'bold',
    },
    maindate: {
        flexDirection: 'row',
        // padding: 20
        paddingLeft: 3
    },
    datePickerStyle: {
        width: 230,
    },
    text: {
        textAlign: 'left',
        width: 230,
        fontSize: 16,
        color: "#000"
    },
    MainView: {
        // flex: 1,
        // paddingLeft: 309,
        // paddingTop: 5,
        // alignItems: "center",
        // justifyContent: "center",
        // // alignItems: "flex-end",
        // paddingLeft: 45,
        paddingTop: 10,
    },
    ferr: {
        paddingLeft: 30,
        color: "red",
    },
    root: {
        overflow: "scroll"
    },
    main: {
        alignItems: 'center',
        backgroundColor: "white",
        height: 780
    },
    name: {
        alignSelf: "center",
        fontSize: 25,
        color: "black",
        marginVertical: 20,
    },
    // button: {
    //     flexDirection: 'row',
    //     marginTop: 5,
    //     borderRadius: 8,
    //     alignSelf: "center",
    //     padding: 20,
    // },
    buttonstyle: {
        backgroundColor: "#583877",
        padding: 15,
        width: '50%',
        height: 54,
        borderRadius: 5,
        alignItems: "center",
        marginVertical: 10,
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
        width: 350,
        height: 55,
        borderColor: '#E8E8E8',
        borderWidth: 2,
        borderRadius: 8,
        alignSelf: 'center'
    },
    containerDatePicker: {
        backgroundColor: 'white',
        width: 320,
        height: 55,
        borderColor: '#E8E8E8',
        borderWidth: 2,
        borderRadius: 8,
        alignSelf: 'center',
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
    textButton: {
        color: "white",
        fontWeight: "bold",
        fontSize: 18,
    },
    input: {
        height: 45,
        borderRadius: 5,
        color: "black",
        padding: 5,
    }, loginImage: {
        width: 350,
        height: 200,
        marginTop: 40
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

export default Add_Customer