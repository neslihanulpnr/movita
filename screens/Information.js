import React from "react";
import { View, Text } from "react-native";

export const Information = () => {

    return (
        <View style={{left: 30, top: 10}}>
            <Text style={{fontSize: 25, fontWeight: "bold"}}>Mesai Saati</Text>
            <Text style={{fontSize: 20, fontWeight: "bold"}}>Başlangıç :</Text>
            <Text style={{fontSize: 20, fontWeight: "bold"}}>Bitiş :</Text>
            <Text></Text>
        </View>
    );
};
