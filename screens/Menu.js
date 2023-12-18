import React from "react";
import { View, TouchableOpacity, StyleSheet, Text } from "react-native";
import { AntDesign, FontAwesome5, FontAwesome } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

export const Menu = () => {
    const navigation = useNavigation();

    return (
        <View style={{ flex: 1 }}>
            <View style={{ flex: 1 }}>
            </View>

            <View style={{
                backgroundColor: "orange",
                width: 395, 
                height: 70, 
                flexDirection: "row",
            }}>
                
                <TouchableOpacity
                    style={[styles.button, { backgroundColor: "orange" }]}
                    onPress={() => {
                        console.log("Bilgi öğesine tıklandı");
                        navigation.navigate("bilgi");
                    }}
                >
                    <FontAwesome name="user-o" size={24} color="white" />
                    <Text style={styles.buttonText}>Bilgi</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={[styles.button, { backgroundColor: "orange" }]}
                    onPress={() => {
                        console.log("Rapor öğesine tıklandı");
                        navigation.navigate("rapor");
                    }}
                >
                    <FontAwesome5 name="clipboard-list" size={24} color="white" />
                    <Text style={styles.buttonText}>Rapor</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={[styles.button, { backgroundColor: "orange" }]}
                    onPress={() => {
                        console.log("Aracım öğesine tıklandı");
                        navigation.navigate("car");
                    }}
                >
                    <AntDesign name="car" size={24} color="white" />
                    <Text style={styles.buttonText}>Aracım</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    button: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        margin: 5,
        borderRadius: 8,
        flexDirection: 'row',
    },
    buttonText: {
        color: "white",
        fontWeight: "bold",
        fontSize: 20,
        marginLeft: 8, 
    },
});
