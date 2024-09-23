import React, { useEffect, useState } from 'react'
import {
    TouchableOpacity,
    StyleSheet,
    View,
    Text,
    SafeAreaView,
    Image,
    ActivityIndicator,
    ScrollView,

} from 'react-native';
import Serviceimage from "../../assets/plan1.jpg"
import AsyncStorage from '@react-native-async-storage/async-storage';
import { baseUrl } from './api_Constants';
import CustomerImage1 from "../../assets/avatarimage.jpg"
import moment from 'moment'
import DistributorUpcoming from './DistributorUpcoming';



const DistributorHome = ({navigation}) => {

    const [homedata, setHomeData] = useState([])
    const [isloading, setIsLoading] = useState(false)
    const [countCustomer, setCountCustomer] = useState({})
    const [Upcoming, setUpcoming] = useState([]);


    const homeData = async () => {
        let value = await AsyncStorage.getItem("Token")
        var bearerToken = value.replace(/"([^"]+(?="))"/g, '$1');
        setIsLoading(true)
        await fetch(`${baseUrl}global/getpackages/`, {
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
                setHomeData(data.data)
                setIsLoading(false)
            })
    }

    useEffect(() => {
        homeData();
    }, [])

    const CustomerCount = async () => {
        let value = await AsyncStorage.getItem("Token")
        var bearerToken = value.replace(/"([^"]+(?="))"/g, '$1');
        setIsLoading(true)
        await fetch(`${baseUrl}mobile/getdashboard/`, {
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
                setCountCustomer(data.data)
            })
    }

    useEffect(() => {
        CustomerCount();
    }, [])

    const fetchData = async () => {
        let value = await AsyncStorage.getItem("Token")
        // console.log("value", value)
        var bearerToken = value.replace(/"([^"]+(?="))"/g, '$1');
        // setIsLoading(true)
        await fetch(`${baseUrl}mobile/upcomingcustomerpaymenthomescreen/`, {
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
                var count = Object.keys(data.data).length
                console.log("count",count)
    
                console.log("UpcomingPayment", data.data)
                setUpcoming(data.data)
                setIsLoading(false)
            })
    }

    useEffect(() => {
        fetchData();
    }, [])

    const upcomingSeeMore=()=>{
        console.log("clicked")
        navigation.navigate("DistributorUpcoming")

    }

    return (
        <ScrollView>
            {isloading && <ActivityIndicator style={styles.loader} size={60} color={"gray"} />}

            <SafeAreaView style={{ flex: 1 }}>
                <View style={styles.mainhead}>
                    <View style={styles.mainroot}>
                        <View style={styles.headingmain}>
                            <Text style={styles.headingText}>Hello</Text>
                            <Text style={styles.subheadingText}>Generic</Text>
                        </View>
                        <View style={styles.wrap}>
                            <View style={styles.viewbutton}>
                                <View style={styles.viewsubbutton}>
                                    <TouchableOpacity
                                        style={styles.button}>
                                        <Text style={styles.textdesg}>All Customers</Text>
                                        <Text style={styles.textdesg}>{countCustomer.customer_count}</Text>
                                    </TouchableOpacity>
                                </View>

                                <View style={styles.viewnext}>
                                    <TouchableOpacity
                                        style={styles.button}>
                                        <Text style={styles.textdesg}>Total Paid</Text>
                                        <Text style={styles.textdesg}> Rs.0</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>

                            <View style={styles.viewexpected}>
                                <View style={styles.viewnextexpect}>
                                    <TouchableOpacity
                                        style={styles.button}>
                                        <Text style={styles.textdesg}>Total Expected</Text>
                                        <Text style={styles.textdesg}>Rs.0</Text>
                                    </TouchableOpacity>
                                </View>

                                <View style={styles.viewnextsub}>
                                    <TouchableOpacity
                                        style={styles.button}>
                                        <Text style={styles.textdesg}>Total Due</Text>
                                        <Text style={styles.textdesg}>Rs.0</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>
                    </View>
                    <View>
                        <View style={styles.viewservices}>
                        <View style={styles.seemore}>
                            <Text style={styles.service}>Upcoming Payments</Text>  
                            <View style={styles.seemoremain}>
                          
                             <Text style={styles.seemoremain} onPress={upcomingSeeMore}>see more</Text>
                            </View>
                            </View>
                            <ScrollView>
                            {Upcoming.map((item) =>
                                <View key={item.id}>
                                    <TouchableOpacity
                                        style={styles.buttonone}>
                                        <View style={styles.viewmaindiv}>
                                            <Image source={CustomerImage1} style={styles.CustomerImage1}></Image>
                                            
                                            <View>
                                                <Text style={styles.cardTitleUpcoming}>{item.customer_name}</Text>
                                                <Text style={styles.cardTitleMonth}>{(moment(item.payment_date).format('YYYY-MM-DD hh:mm'))}</Text>

                                                {/* <Text style={styles.cardDiscribtion}>Description : {item.description}</Text> */}

                                            </View>

                                            <View>
                                                <Text style={styles.cardnameplan}>Rs.{item.amount}</Text>
                                            </View>

                                        </View>

                                    </TouchableOpacity>
                                </View>)}
                                </ScrollView>
                            {/* <Text style={styles.seeMore}>See More</Text> */}
                        </View>
                    </View>

                    {homedata.map((item) =>
                        <TouchableOpacity
                            style={styles.servicebutton} key={item.id}>
                            <View style={styles.viewlast}>
                                <View style={styles.servicesBoxText}>
                                    <Text style={styles.servicepay}><Text style={styles.servicepayRs}>Rs.</Text> {item.amount}</Text>
                                    <Text style={styles.cardname}>{item.package_title}</Text>
                                    <Text style={styles.cardTitle}>Data: {item.package_description}</Text>
                                </View>
                                <Image source={Serviceimage} style={styles.Serviceimage}></Image>
                            </View>
                        </TouchableOpacity>)}
                </View>
            </SafeAreaView>
        </ScrollView>
    )
}
const styles = StyleSheet.create({
    seemore:{
        flexDirection:"row",
    },
    seemoremain:{
    marginLeft:40,
    fontSize:18,
    fontWeight: "900",
    color: "#583877",
    },
    wrap: {
        width: 350,
        height: 190,
        borderRadius: 20,
        marginLeft: 20
    },
    loader: {
        justifyContent: "center",
        alignItems: "center",
        paddingTop: 210
    },
    headingmain: {
        padding: 15
    },
    headingText: {
        fontSize: 40,
        color: "white",
        fontFamily: "Roboto",
        fontWeight: "bold"

    },
    addCustomer: {
        padding: 10,
        width: 155,
        alignSelf: "end",
    },
    subheadingText: {
        fontSize: 36,
        color: "white",
        fontFamily: "Roboto",
        fontWeight: "bold"
    },
    textdesg: {
        fontFamily: "sans-serif",
        fontWeight: "bold"
    },
    button: {
        alignItems: 'center',
        backgroundColor: '#C9A0DC',
        padding: 20,
        width: 150,
        height: 70,
        fontSize: 40,
        backgroundColor: "white",


    },
    root: {
        display: "flex",
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
    mainroot: {
        shadowRadius: 20,
        shadowColor: "blue",
        backgroundColor: "#9074ac",
        height: 350,
        borderBottomRightRadius: 50,
    },
    seeMore: {
        marginLeft: 180,
        fontSize: 15,
        fontWeight: "900",
        fontFamily: "Roboto",

    },
    service: {
        fontSize: 20,
        fontWeight: "900",
        fontFamily: "Roboto",
        marginLeft: 20,
        color: "#583877",

    },
    servicebutton: {
        alignItems: 'center',
        backgroundColor: '#C9A0DC',
        borderRadius: 18,
        height: 150,
        fontSize: 30,
        borderColor: "black",
        backgroundColor: "white",
        marginBottom: 10,
        marginLeft: 10,
        marginRight: 10
    },
    cardname: {
        fontFamily: "sans-serif",
        fontSize: 23,
        fontWeight: "500",
        paddingTop: 15
    },
    cardTitle: {
        paddingTop: 10,
        fontSize: 13,
        fontFamily: "sans-serif",
        color: "#585858",
        paddingLeft: 4
    },
    cardTitleUpcoming:{
        paddingTop: 10,
        fontSize: 20,
        fontFamily: "sans-serif",
        color: "#583877",
        paddingLeft: 20,
        width:180
    },
    Serviceimage: {
        width: 85,
        height: 70,
        borderRadius: 95,
        margin: 12,
        marginTop: 30,
        marginLeft: 0
    },
    servicesBox: {
        padding: 15
    },
    servicesBoxText: {
        padding: 15
    },
    servicepay: {
        fontSize: 20,
        fontFamily: "sans-serif",
        color: "green",
        fontWeight: "bold",
    },
    servicepayRs: {
        fontSize: 15,
        fontFamily: "sans-serif",
        color: "green",
        fontWeight: "bold",
    },
    mainhead: {
        flex: 1,
        borderRadius: 8,
    },
    viewbutton: {
        flexDirection: "row",
        paddingTop: 13,
    },
    viewsubbutton: {
        padding: 5,
        marginLeft: 15
    },
    viewnext: {
        padding: 5
    },
    viewnextsub: {
        padding: 5
    },
    viewservices: {
        // flexDirection: "row",
        marginTop: 50,
        marginBottom: 20,
    },
    viewlast: {
        flexDirection: "row"
    },
    viewexpected: {
        flexDirection: "row"
    },
    viewnextexpect: {
        padding: 5,
        marginLeft: 15
    },
    buttonone: {
        backgroundColor: 'white',
        // padding: 10,
        marginTop: 16,
        marginBottom: 10,

    },
    viewmaindiv: {
        flexDirection: 'row',
        padding: 20
    }, 
    CustomerImage1: {
        width: 70,
        height: 70,
        borderRadius: 95,
    },
    cardTitle: {
        paddingTop: 10,
        width: 100,
        fontSize: 17,
        paddingLeft: 20,
        fontSize: 15,
        fontFamily: "sans-serif",
        // color: "green",
        fontSize: 16,
        fontWeight: "500"
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
        paddingLeft:20,
        paddingTop: 10,
        fontSize: 15,
        fontFamily: "sans-serif",
        color: "black",
        fontSize: 16,
        fontWeight: "500"
    },
});
export default DistributorHome