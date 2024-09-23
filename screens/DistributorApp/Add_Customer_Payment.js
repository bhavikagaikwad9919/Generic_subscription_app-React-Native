import React, { useEffect, useState } from 'react'
import { Text, View, StyleSheet, TextInput, Pressable, Image, ScrollView, Button } from 'react-native'
import DateTimePickerModal from "react-native-modal-datetime-picker";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { baseUrl } from './api_Constants';
import AntDesign from 'react-native-vector-icons/AntDesign';
import moment from "moment";
import { TouchableOpacity } from 'react-native-gesture-handler';


// let date = moment(new Date()).format('YYYY-MM-DD') 


const Add_Customer_Payment = ({ navigation }) => {
    const [distributor, Setdistributor] = useState("");
    // const [customer, Setcustomer] = useState("");
    const [amount, Setamount] = useState("");
    const [isloading, setIsLoading] = useState(false)
    const [payment_date, Setpayment_date] = useState("");
    const [description, Setdescription] = useState("");
    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
    const [date, setDate] = useState('');
    const [customererr, setCustomererr] = useState("");
    const [amounterr, setAmounterr] = useState("");
    const [payment_dateerr, setPayment_dateerr] = useState("");
    const [descriptionerr, setDescriptionerr] = useState("");
    const [dropdown, setDropDown] = useState([]);
    const [isDatePickerVisiblee, setDatePickerVisibilityy] = useState(false);
    const [datee, setDatee] = useState('');
    const [cenddate, setEnddate] = useState("");
    const [Enddateerr, setEnddateerr] = useState("");
    const [selectedItem, setSelectedItem] = useState();
    const [showOption, setShowOption] = useState(false);

    // let date = moment(new Date()).format('DD/MM/YYYY') 

    const onSelect = (item) => {
        setSelectedItem(item)
    }


    const showDatePicker = () => {
        setDatePickerVisibility(true);
    };

    const hideDatePicker = () => {
        setDatePickerVisibility(false);
    };

    const handleConfirm = (date) => {
        Setpayment_date(date);
        setDate(date);
        hideDatePicker();
    };
    const getDate = () => {

        let tempdate = moment(date).format('YYYY-MM-DD');
        return tempdate
    }

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
        // let tempdate = datee ? dateemoment(datee).format('YYYY-MM-DD') : 'Enter Date';
        let tempdate = moment(datee).format('YYYY-MM-DD');

        return tempdate
    };

    const PaymentButton = async () => {
        let id = await AsyncStorage.getItem("roilid")

        // console.log("selected", selectedItem)
        const data = {
            distributor: id,
            customer: selectedItem.customer_id,
            amount: amount,
            payment_date: payment_date,
            end_date: cenddate,
            description: description
        }


        // console.log("datadropdown", data)


        let value = await AsyncStorage.getItem("Token")
        // let id = await AsyncStorage.getItem("roilid")

        // console.log("Token",value)
        var bearerToken = value.replace(/"([^"]+(?="))"/g, '$1');
        setIsLoading(true)
        await fetch(`${baseUrl}mobile/addcustomerpayment/`, {
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
                console.log('Customer Payment', responseJson)
                if (responseJson.status_code === 200) {
                    setIsLoading(true)
                    navigation.navigate("DistributorTransaction")
                    alert(responseJson.message)
                } else if (responseJson.status_code === 400) {
                    alert(responseJson.message)
                    if (!customer) {
                        setCustomererr("Customer Name Required")
                    } if (!amount) {
                        setAmounterr("Amount Required")
                    } if (!payment_date) {
                        setPayment_dateerr("Date Required")
                    } if (!cenddate) {
                        setEnddateerr("Confirm EndDate Required")
                    } if (!description) {
                        setDescriptionerr("Discription Required")
                    }

                }
            })
    }

    const fetchDropDown = async () => {
        let value = await AsyncStorage.getItem("Token")
        console.log("value", value)
        var bearerToken = value.replace(/"([^"]+(?="))"/g, '$1');
        await fetch(`${baseUrl}global/getcustomersfordist/`, {
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
                console.log("dropdown", data)
                setDropDown(data.data)
            })
    }

    useEffect(() => {
        fetchDropDown();
    }, [])

    const onSelectedItem = (item) => {
        console.log("clicked on", item)
        setShowOption(false)
        onSelect(item)
    }
    return (
        <ScrollView>
            <View style={styles.main}>
                <Text style={styles.text}>Add Payment</Text>
                <TouchableOpacity style={styles.dropdownstyle}
                    activeOpacity={0.8}

                >
                    <View style={styles.dropDoenArrow}>
                        <Text onPress={() =>
                            setShowOption(!showOption)}>
                            {!!selectedItem ? selectedItem.customer_name : 'Select Customer'}</Text>
                    </View>
                    <AntDesign style={{
                        marginLeft: 160,
                        transform: [{ rotate: showOption ? '180deg' : '0deg' }]
                    }} name="caretdown" size={20}></AntDesign>

                </TouchableOpacity>


                {showOption && (
                    <View style={{
                        width: 310,
                    }}>
                        {dropdown.map((item) =>
                            <Text style={styles.dropDownmain} key={item.id}
                                // style={{ backgroundColor: selectedItem.customer_profile == item.customer_profile ? "#E0E0E0" : "white" }}
                                onPress={() => {
                                    console.log("itemDropdown", item)
                                    onSelectedItem(item)
                                }}

                            >
                                <View>
                                    <Text style={styles.dropDownName}>{item.customer_name}</Text>
                                </View>

                            </Text>
                        )}
                    </View>)}
                <Text style={styles.err}>{customererr}</Text>

                <View style={styles.container}>
                    <TextInput style={styles.input}
                        defaultValue={amount}
                        placeholder="Enter Amount"
                        onChangeText={newamount => {
                            Setamount(newamount)
                            setAmounterr()
                        }}
                    />
                </View>
                <Text style={styles.err}>{amounterr}</Text>

                <View style={styles.maindate}>

                    <View style={styles.containerDatePicker}>
                        <TextInput style={styles.input}
                            placeholder="Enter Payment Date"
                            // defaultValue={payment_date}
                            value={getDate()}
                            onChangeText={newPayment => {
                                Setpayment_date(newPayment)
                                setPayment_dateerr()
                            }}
                        />

                    </View>
                    <View style={styles.MainView}>
                        <AntDesign name="calendar" size={30}
                            onPress={showDatePicker}
                        />
                        <DateTimePickerModal
                            isVisible={isDatePickerVisible}
                            mode="date"
                            onConfirm={handleConfirm}
                            onCancel={hideDatePicker}
                        />
                    </View>
                    <Text style={styles.err}>{payment_dateerr}</Text>

                </View>
                <View style={styles.maindate}>

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
                    <Text style={styles.err}>{Enddateerr}</Text>
                </View>

                <View style={styles.container}>
                    <TextInput style={styles.input}
                        placeholder="Enter Description"
                        defaultValue={description}
                        onChangeText={newdescription => {
                            Setdescription(newdescription)
                            setDescriptionerr()
                        }}
                    />
                </View>
                <Text style={styles.err}>{descriptionerr}</Text>


                <Pressable
                    onPress={PaymentButton}
                    style={styles.containerButton}>
                    <Text style={styles.textButton}>Save</Text>
                </Pressable>
            </View>
        </ScrollView>
    )
}
const styles = StyleSheet.create({
    dropDownmain: {
        borderColor: "#E0E0E0",
        borderWidth: 1,
        padding: 5
    },
    MainView: {
        paddingTop: 10,
    },
    dropdownstyle: {
        marginTop: 20,
        backgroundColor: 'white',
        padding: 12,
        flexDirection: 'row',
        width: '80%',
        height: 50,
        borderColor: '#E8E8E8',
        borderWidth: 2,
        borderRadius: 8,
    },
    dropDownName: {
        padding: 6,
        alignItems: 'center',
    },
    // dropdownicons: {
    //     transform: [{ rotate: showOption ? '180deg' : '0deg' }]
    // },
    err: {
        paddingLeft: 30,
        color: "red",
    },
    maindate: {
        flexDirection: 'row',
        paddingBottom: 15,
        paddingLeft: 27
    },
    containerDatePicker: {
        backgroundColor: 'white',
        width: '77%',
        height: 55,
        borderColor: '#E8E8E8',
        borderWidth: 2,
        borderRadius: 8,
        alignSelf: 'center',
    },
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
        // width: 100,
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

export default Add_Customer_Payment