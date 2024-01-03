import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Feather } from '@expo/vector-icons';

export const Information = () => {
    const [showDetails, setShowDetails] = useState(false);

    const toggleDetails = () => {
        setShowDetails(!showDetails);
    };

    return (
        <View style={{ left: 30, top: 10 }}>
            <View style={styles.buttonContainer}>
                <Text style={{ fontSize: 23 }}>Sefer Saati</Text>
                <TouchableOpacity style={styles.button} onPress={toggleDetails}>
                    <Feather name={showDetails ? "chevron-down" : "chevron-up"} size={15} color="black" />
                </TouchableOpacity>
            </View>

            {showDetails && (
                <View>
                    <Text style={{ fontSize: 17 }}>İlk Sefer Saati :</Text>
                    <Text style={{ fontSize: 17 }}>Son Sefer Saati :</Text>
                </View>
            )}

            <View style={{ margin: 15 }}></View>

            <Text style={{ fontSize: 20 }}>Aracın Gelmesine Kalan Dakika :</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    buttonContainer: {
        flexDirection: "row",
        alignItems: "center",
    },
    button: {
        backgroundColor: "#edebeb",
        padding: 10,
        marginLeft: 10,
        borderRadius: 5,
        height: 30,
        width: 35,
        alignItems: "center",
        justifyContent: "center"

    },
    buttonText: {
        color: "white",
        fontSize: 10,
    },
});
