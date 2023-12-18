import React from "react";
import { View, TouchableOpacity, StyleSheet, Button } from "react-native";
import { AntDesign } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

export const Menu = () => {
    const navigation = useNavigation(); // useNavigation hook'unu burada kullan

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
                    <Button color={"orange"} style={styles.buttonText} title="Bilgi" onPress={() => navigation.navigate("bilgi")}/>
                </TouchableOpacity>

                <TouchableOpacity
                    style={[styles.button, { backgroundColor: "orange" }]}
                    onPress={() => {
                        console.log("Rapor öğesine tıklandı");
                        navigation.navigate("rapor");
                    }}
                >
                    <FontAwesome5 name="clipboard-list" size={30} color="white" />
                    <Button color={"orange"} style={styles.buttonText} title="Rapor" onPress={() => navigation.navigate("rapor")}/>
                </TouchableOpacity>

                <TouchableOpacity
                    style={[styles.button, { backgroundColor: "orange" }]}
                    onPress={() => {
                        console.log("Aracım öğesine tıklandı");
                        navigation.navigate("car");
                    }}
                >
                    <AntDesign name="car" size={30} color="white" />
                    <Button color={"orange"} style={styles.buttonText} title="Aracım" onPress={() => navigation.navigate("car")}/>
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
    },
    buttonText: {
        color: "white",
        fontWeight: "bold",
        fontSize: 20
    },
});