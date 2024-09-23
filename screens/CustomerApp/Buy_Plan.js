import React, { useState } from 'react'
import { Text, View, StyleSheet, TouchableOpacity, Image, Button } from 'react-native'
import Credit from "../../assets/credit.png"
import CustomerImage1 from "../../assets/Cartoon_Profile_Picture07.jpg"
import Paytm from "../../assets/paytm.png"
import { RadioButton } from 'react-native-paper';
import { ScrollView } from 'react-native-gesture-handler'
import serviceimage from "../../assets/plan1.jpg"


const Buy_Plan = () => {
    const [checked, setChecked] = useState("");

    return (
        <ScrollView style={styles.root}>

            <View style={{ paddingBottom: 20 }}>
                <TouchableOpacity
                    style={styles.buttonMain}>
                    <View style={styles.rootnewPkg}>
                        <Image source={serviceimage} style={styles.CustomerNewPkg}></Image>
                        <View>
                            <Text style={styles.cardTitle}>1 month internet plan</Text>
                            <Text style={styles.cardnameDiscription}>100 sms and 1.5 GB data</Text>
                            <Text style={styles.cardnameamount}>$ 200</Text>
                            <Text style={styles.cardname1}>package validity :30 Days/</Text>
                            <View style={styles.buynowButton}>
                            </View>
                        </View>
                    </View>
                </TouchableOpacity>
            </View>

            <TouchableOpacity
                style={styles.button}>
                <View style={styles.root1}>
                    <View>
                        <Image source={Credit} style={styles.Credit}></Image>
                        <Text style={styles.textdate}>Pay Using</Text>

                    </View>
                </View>

                <TouchableOpacity
                    style={styles.Card}>
                    <View style={styles.root2}>
                        <View>
                            <RadioButton
                                value="first"
                                color='white'
                                status={checked === "first" ? 'checked' : 'unchecked'}
                                onPress={() => setChecked("first")}
                            />
                        </View>

                        <View>
                            <Text style={styles.mainText}>UPI Payment</Text>
                        </View>

                        <View>
                            <Image source={Paytm} style={styles.Paytm}></Image>
                        </View>
                    </View>
                </TouchableOpacity>


                <TouchableOpacity
                    style={styles.Card}>
                    <View style={styles.root2}>
                        <View>
                            <RadioButton
                                value="second"
                                color='white'
                                status={checked === "second" ? 'checked' : 'unchecked'}
                                onPress={() => setChecked("second")}
                            />
                        </View>

                        <View>
                            <Text style={styles.mainText}>UPI Payment</Text>
                        </View>

                    </View>
                </TouchableOpacity>
                <View style={styles.payButton}>
                    <Button
                        color="green"
                        title="Pay $ 200"
                        disabled={!checked}
                    />
                </View>
            </TouchableOpacity>

        </ScrollView>
    )
}
const styles = StyleSheet.create({
    cardname1: {
        color: "#2E8B57",
        paddingLeft: 15,
        paddingTop: 20,
        fontSize: 17,
        fontWeight: "400"
    },
    cardnameamount: {
        paddingLeft: 15,
        fontSize: 17,
        fontWeight: "500",
        color: "#006400"
    },
    cardnameDiscription: {
        paddingLeft: 15,
        paddingBottom: 9,
        fontSize: 17
    },
    cardTitle: {
        fontSize: 23,
        paddingLeft: 15,
        paddingBottom: 12,
        color: "#585858"
    },
    CustomerNewPkg: {
        width: 110,
        height: 130,
        alignSelf: "center",
    },
    rootnewPkg: {
        flexDirection: "row"
    },
    buttonMain: {
        backgroundColor: 'white',
        padding: 13,
        // marginTop:10,
    },
    root: {
        padding: 10
    },
    main: {
        flexDirection: 'row',
        padding: 20,
        background: "White",
        marginBottom: 40,
        marginTop: 20
    },
    root1: {
        flexDirection: 'row'
    },
    root2: {
        flexDirection: 'row',
        padding: 10
    },
    radioButtonMain: {
        flexDirection: 'row',
        padding: 10
    },
    mainText: {
        fontSize: 20,
        color: "white",
        fontWeight: "700",
        padding: 2,
        alignSelf: 'center',
    },
    mainTextCard: {
        fontSize: 20,
        color: "white",
        fontWeight: "700",
        padding: 2,

    },
    mainText1: {
        fontSize: 20,
        alignSelf: 'center',
        paddingTop: 40
    },
    mainText2: {
        fontSize: 20,
        fontWeight: "600",
        padding: 10,
        alignSelf: 'center',
        paddingTop: 40
    },
    button: {
        backgroundColor: 'white',
        padding: 20,
    },
    Card: {
        backgroundColor: '#C0C0C0',
        marginTop: 25,
    },
    textdate: {
        fontWeight: "500",
        color: "#2E8B57",
        alignItems: "center",
        fontSize: 20,
    },
    Credit: {
        width: 50,
        height: 50,
        marginBottom: 10,
    },

    Paytm: {
        width: 40,
        height: 40,

    },

    CustomerImage1: {
        width: 50,
        height: 50,
        padding: 40,
        marginTop: 20,
    },
    payButton: {
        padding: 27,
        width: 163,
        alignSelf: "center",
        marginTop: 10,
    }
});

export default Buy_Plan