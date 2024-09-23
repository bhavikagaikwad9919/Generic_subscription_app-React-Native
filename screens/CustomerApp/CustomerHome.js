import React, { useEffect, useState } from 'react'
import {
    Text, View, StyleSheet, TouchableOpacity, Image, ActivityIndicator,
    SafeAreaView,
    Button,
    Dimensions,
    FlatList,
    Switch,
    StatusBar
} from 'react-native'
import CustomerImage1 from "../../assets/planImageCustomer.webp"
import AsyncStorage from '@react-native-async-storage/async-storage';
import { baseUrl } from '../DistributorApp/api_Constants';
import { ScrollView } from 'react-native';
import moment from 'moment';
import CustomerImage from "../../assets/topImage.jpg"
import serviceimage from "../../assets/plan1.jpg"
import ToggleSwitch from 'toggle-switch-react-native'

const CustomerHome = ({ navigation }) => {
    const [customerpkg, setCustomerPkg] = useState([])
    const [customerNewpkg, setCustomerNewPkg] = useState([])
    const [isloading, setIsLoading] = useState(false)
    const [imgActive, setimgActive] = useState(0)
    const { height, width } = Dimensions.get('window')
    const [isEnabled, setIsEnabled] = useState(true);
    // const [text, setText] = useState(false);

    const toggle = () => {
        setIsEnabled(previousState => !previousState)
    }


    // const newSliderImages = [
    //     'https://cdn.pixabay.com/photo/2016/03/26/13/09/workspace-1280538__340.jpg',
    //     'https://media.istockphoto.com/id/974512548/photo/digital-marketing-new-startup-project-millennials-business-team-hands-at-work-with-financial.jpg?s=612x612&w=0&k=20&c=wQtH07ZMU6UwDKQd_Y6apNl41I6nYKSgQ-IyW8tAdF4=',
    //     'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQecEE9MIcMYzeNrVy09d_QJ2xaDdh4ZWkeDEHislddXnSiTOiHeJ4T9FZY-AKsWQyrGfo&usqp=CAU'
    // ]

    const BuyNow = () => {
        navigation.navigate("Buy_Plan")

    }

    onchange = (nativeEvent) => {
        if (nativeEvent) {
            const slide = Math.ceil(nativeEvent.contentOffset.x / nativeEvent.layoutMeasurement.width)
            if (slide != imgActive) {
                setimgActive(slide);
            }
        }
    }

    // const fetchData = async () => {
    //     let value = await AsyncStorage.getItem("Token")
    //     // console.log("value", value)
    //     var bearerToken = value.replace(/"([^"]+(?="))"/g, '$1');
    //     setIsLoading(true)
    //     await fetch(`${baseUrl}mobile/getplantakenbycustomers/`, {
    //         method: 'GET',
    //         headers: {
    //             Accept: 'application/json',
    //             'content-Type': 'application/json',
    //             Authorization: `Bearer ${bearerToken}`,
    //             // Authorization:"Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjc1MTU1NDMyLCJpYXQiOjE2Njk5NzE0MzIsImp0aSI6ImM2NjNmNzI0YTFiMDQyM2ZiZTkyY2JjYmJlZTlhYzdhIiwidXNlcl9pZCI6OCwicm9sZV9pZCI6MX0.-XCGPFe-gDHNRgZTTw5sUZKsdqfPur2_OaL3er05VNw"
    //         },
    //     }).then(response => {
    //         return response.json()
    //     })
    //         .then(data => {
    //             console.log("CustomerPackage", data.data)
    //             setCustomerPkg(data.data)
    //             setIsLoading(false)
    //         })
    // }
    // useEffect(() => {
    //     fetchData();
    // }, [])


    // const fetchDataNewPlan = async () => {
    //     let value = await AsyncStorage.getItem("Token")
    //     // console.log("value", value)
    //     var bearerToken = value.replace(/"([^"]+(?="))"/g, '$1');
    //     await fetch(`${baseUrl}global/getpackages/`, {
    //         method: 'GET',
    //         headers: {
    //             Accept: 'application/json',
    //             'content-Type': 'application/json',
    //             Authorization: `Bearer ${bearerToken}`,
    //             // Authorization:"Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjc1MTU1NDMyLCJpYXQiOjE2Njk5NzE0MzIsImp0aSI6ImM2NjNmNzI0YTFiMDQyM2ZiZTkyY2JjYmJlZTlhYzdhIiwidXNlcl9pZCI6OCwicm9sZV9pZCI6MX0.-XCGPFe-gDHNRgZTTw5sUZKsdqfPur2_OaL3er05VNw"
    //         },
    //     }).then(response => {
    //         return response.json()
    //     })
    //         .then(data => {
    //             console.log("CustomerPackagenew", data.data)
    //             setCustomerNewPkg(data.data)
    //         })
    // }
    // useEffect(() => {
    //     fetchDataNewPlan();
    // }, [])


    const fetchDataNew = async () => {
        let value = await AsyncStorage.getItem("Token")
        // console.log("value", value)
        var bearerToken = value.replace(/"([^"]+(?="))"/g, '$1');
        await fetch(`${baseUrl}mobile/customerspaymnetremaining/`, {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'content-Type': 'application/json',
                Authorization: `Bearer ${bearerToken}`,
                // Authorization:"Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjc1MTU1NDMyLCJpYXQiOjE2Njk5NzE0MzIsImp0aSI6ImM2NjNmNzI0YTFiMDQyM2ZiZTkyY2JjYmJlZTlhYzdhIiwidXNlcl9pZCI6OCwicm9sZV9pZCI6MX0.-XCGPFe-gDHNRgZTTw5sUZKsdqfPur2_OaL3er05VNw"
            },
        }).then(response => {
            return response.json()
        })
            .then(data => {
                console.log("CustomerPackagenewone", data.data)
                setCustomerNewPkg(data.data)
            })
    }
    useEffect(() => {
        fetchDataNew();
    }, [])

    return (
        <>
            <ScrollView>
                <View>
                    <View style={styles.mainhead}>
                        <View style={styles.wrapcustomer}>
                            <Text style={styles.mainTitle}>My Active </Text>
                            <Text style={styles.mainTitlesub}>Subscription</Text>



                            <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                                <View style={{ height: height }}>
                                    {/* <FlatList
                                        data={[1, 1, 1, 1, 1]}
                                        showsHorizontalScrollIndicator={true}
                                        pagingEnabled
                                        horizontal
                                        renderItem={({ item, index }) => {
                                            return (
                                                <View
                                                    style={{
                                                        width: width,
                                                        height: height,
                                                        justifyContent: 'flex-start',
                                                        alignItems: 'center',
                                                        flexDirection: "row"
                                                    }}>
                                                   
                                                </View>
                                            );
                                        }}
                                    /> */}
                                </View>
                            </View>
                            {isloading && <ActivityIndicator style={styles.loader} size={40} color={"gray"} />}
                            {customerpkg.map((item) =>
                                <View style={{ padding: 15 }} key={item.id}>
                                    <TouchableOpacity
                                        style={styles.card}>
                                        <View style={styles.root}>
                                            <Image source={CustomerImage1} style={styles.CustomerImage1}></Image>
                                            <View>
                                                <Text style={styles.cardTitle}>{item.plan_title}</Text>
                                                <Text style={styles.cardnameDiscription}>{item.plan_description}</Text>
                                                <Text style={styles.cardname}><Text style={styles.amountMonth}>$</Text> {item.plan_amount} <Text style={styles.amountMonth}>/mo</Text></Text>
                                                <Text style={styles.cardnameExpity}>Expire in {(moment(item.plan_expiry_date).format("DD/MM/YYYY"))}</Text>
                                            </View>

                                        </View>
                                    </TouchableOpacity>
                                </View>)}
                        </View>

                    </View>



                    <View style={styles.root}>
                        <Text style={styles.mainTextt}>Upcoming Payments</Text>
                    </View>

                    <View style={styles.wrapdatamain}>

                        {isloading && <ActivityIndicator style={styles.loaderSecond} size={40} color={"gray"} />}
                        {customerNewpkg.map((itemnew) =>

                            <View style={{ padding: 10 }}>
                                <TouchableOpacity
                                    style={styles.button} key={itemnew.id}>
                                    <View style={styles.rootnewPkg}>
                                        <Image source={serviceimage} style={styles.CustomerNewPkg}></Image>
                                        <View>
                                            <Text style={styles.cardTitleUpcoming}>{itemnew.distributor_name}</Text>
                                            {/* <Text style={styles.cardnameDiscription}>{itemnew.description}</Text> */}
                                            <Text style={styles.cardnameDiscription}>Date : {itemnew.last_pay_date}</Text>
                                            <Text style={styles.cardnameamount}>Rs. {itemnew.last_pay_amount}</Text>
                                            {/* <Text style={styles.cardname1}>Message :{itemnew.message}</Text> */}
                                            {/* <View style={styles.buynowButton}>
                                            <Button onPress={BuyNow} 
                                            title="Buy Now"
                                               />
                                               </View> */}
                                        </View>
                                    </View>
                                </TouchableOpacity>
                            </View>
                        )}
                        <View>
                            {/* <SafeAreaView style={styles.sliderContainer}>
                            <View style={styles.wrap}>
                                <ScrollView
                                    onScroll={({ nativeEvent }) => onchange(nativeEvent)}
                                    showsHorizontalScrollIndicator={false}
                                    pagingEnabled
                                    horizontal
                                    style={styles.wrap}
                                >

                                    {
                                        newSliderImages.map((e, index) =>
                                            <Image
                                                key={e}
                                                resizeMode="stretch"
                                                style={styles.wrap}
                                                source={{ uri: e }}
                                            />
                                        )
                                    }

                                </ScrollView>
                                <View style={styles.wrapDot}>
                                    {
                                        newSliderImages.map((e, index) =>
                                            <Text
                                                key={e}
                                                style={imgActive === index ? styles.dotActive : styles.dot}
                                            >
                                                ●
                                            </Text>
                                        )
                                    }
                                </View>

                            </View>
                        </SafeAreaView> */}
                        </View>
                    </View>
                </View>

            </ScrollView>


        </>
    )
}
const styles = StyleSheet.create({
    buynowButton: {
        width: 120,
        marginTop: 20,
        paddingLeft: 15,
        alignSelf: "flex-end"
    },
    amountMonth: {
        fontSize: 15,
        opacity: 0.5
    },
    wrapcustomer: {
        height: 330,
        backgroundColor: "#DDA0DD",
        borderBottomEndRadius: 50
    },
    mainTitlesub: {
        fontSize: 30,
        paddingLeft: 20,
        color: "Black",
        fontWeight: "600",
    },
    mainTitle: {
        fontSize: 30,
        paddingLeft: 20,
        paddingTop: 20,
        color: "Black",
        fontWeight: "600"
    },
    dotActive: {
        margin: 3,
        color: 'black'
    },
    dot: {
        margin: 3,
        color: 'white'
    },
    wrapDot: {
        position: 'absolute',
        bottom: 0,
        flexDirection: 'row',
        alignSelf: 'center'
    },
    wrap: {
        height: 200,
        width: 330,
        alignSelf: "center",
        marginTop: 10
    },
    sliderContainer: {
        flex: 1
    },
    loader: {
        justifyContent: "center",
        alignItems: "center",
        paddingTop: 50
    },
    loaderSecond: {
        justifyContent: "center",
        alignItems: "center",
        paddingTop: 20
    },
    mainText: {
        fontSize: 26,
        padding: 8,
        fontFamily: "Roboto",
        color: "white",

    },
    mainTextt: {
        fontSize: 27,
        padding: 8,
        fontFamily: "Roboto",
        paddingTop: 50,
        fontWeight: "500",
        color: "#583877",
    },
    root: {
        flexDirection: "row"
    },
    rootnewPkg: {
        flexDirection: "row"
    },
    card: {
        backgroundColor: 'white',
        marginBottom: -20,
        paddingTop: 20,
        borderRadius: 20
    },
    button: {
        backgroundColor: 'white',
        padding: 13,
        // marginTop:10,
    },
    slide: {
        height: 10,
        width: 10,
    },
    cardname: {
        paddingLeft: 15,
        paddingBottom: 9,
        color: "black",
        fontSize: 23,
    },
    cardActive: {
        fontSize: 22,
        color: "#2E8B57",
        fontWeight: "800",
        paddingLeft: 150
    },
    cardnameExpity: {
        paddingLeft: 15,
        paddingBottom: 10,
        color: "#800000",
        fontSize: 18
    },
    cardnameDiscription: {
        paddingLeft: 15,
        paddingBottom: 9,
        fontSize: 17
    },
    cardnameamount: {
        paddingLeft: 15,
        fontSize: 17,
        // fontWeight: "500",
        color: "black"
    },
    cardname1: {
        color: "#2E8B57",
        paddingLeft: 15,
        paddingTop: 20,
        fontSize: 17,
        fontWeight: "400"
    },
    cardTitle: {
        fontSize: 23,
        paddingLeft: 15,
        paddingBottom: 12,
        color: "#585858"
    },
    cardTitleUpcoming: {
        fontSize: 20,
        paddingLeft: 15,
        paddingBottom: 12,
        color: "#583877",
        width: 180
    },
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    CustomerImage1: {
        width: 100,
        height: 150,
        borderRadius: 20
    },
    CustomerNewPkg: {
        width: 80,
        height: 80,
        alignSelf: "center",
    },
    PageImage: {
        width: 390,
        height: 180,
        alignSelf: "center",
    },
    mainroot: {
        shadowRadius: 20,
        shadowColor: "blue",
        backgroundColor: "cornflowerblue",
        height: 180,
        borderBottomEndRadius: 20
    },
    headingmain: {
        padding: 15
    },
    mainhead: {
        flex: 1,
        borderRadius: 8,
    },
})
export default CustomerHome