import React, { useEffect } from "react";
import { View, TouchableOpacity, StyleSheet, Text, Image } from "react-native";
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';

export const Menu = () => {
    const navigation = useNavigation();

    useEffect(() => {
        navigation.setOptions({
            title: '',
            headerLeft: () => null,
        });
    }, [navigation]);

    const handleLogout = () => {
        console.log("çıkış yap butonuna tıklandı");
        navigation.navigate("homepage");
    }

    return (
        <View style={{ flex: 1 }}>

            <View style={{ height: 90, width: "100%", backgroundColor: "#edebeb" }}>

                <View style={{
                    justifyContent: "flex-start",
                    alignItems: "flex-start",
                    top: 25,
                }}>
                    <Image source={require("../assets/movita.jpeg")}
                        style={{
                            width: 140,
                            height: 60
                        }} />
                </View>

                <View style={{
                    justifyContent: "flex-end",
                    alignItems: "flex-end",
                    right: 15,
                    bottom: 20
                }}>
                    <TouchableOpacity style={{ justifyContent: "center", alignItems: "center", flexDirection: "row" }}
                        onPress={handleLogout}>
                        <Ionicons name="exit-outline" size={40} color="orange" />
                    </TouchableOpacity>
                </View>
            </View>

            <View style={{ flex: 1 }}>
            </View>

            <View style={{
                backgroundColor: "#edebeb",
                width: 395,
                height: 70,
                flexDirection: "row",
            }}>

                <TouchableOpacity
                    style={[styles.button, { backgroundColor: "#edebeb", flexDirection: "column" }]}
                    onPress={() => {
                        console.log("Bilgi öğesine tıklandı");
                        navigation.navigate("Information");
                    }}
                >
                    <Ionicons name="information-circle" size={30} color="#00ADEE" />
                    <Text style={styles.buttonText}>Bilgi</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={[styles.button, { backgroundColor: "#edebeb", flexDirection: "column" }]}
                    onPress={() => {
                        console.log("harita öğesine tıklandı");
                        navigation.navigate("map");
                    }}
                >
                    <MaterialCommunityIcons name="google-maps" size={30} color="#00ADEE" />
                    <Text style={styles.buttonText}>Harita</Text>
                </TouchableOpacity>


                <TouchableOpacity
                    style={[styles.button, { backgroundColor: "#edebeb", flexDirection: "column" }]}
                    onPress={() => {
                        console.log("Ayarlar öğesine tıklandı");
                        navigation.navigate("Settings");
                    }}
                >
                    <Ionicons name="settings" size={30} color="#00ADEE" />
                    <Text style={styles.buttonText}>Ayarlar</Text>
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
        color: "#00ADEE",
        fontWeight: "bold",
        fontSize: 14,
        marginLeft: 8,
        justifyContent: "center",
        alignItems: "center",
    },
});