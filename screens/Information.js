import React from "react";
import { View, Text } from "react-native";

export const Information = () => {

    return (
        <View style={{alignItems: "center", justifycontent: "center"}}>
            <Text style={{fontSize: 20, fontWeight: "bold"}}>mesai saati</Text>
            <Text style={{fontSize: 20, fontWeight: "bold"}}>başlangıç</Text>
            <Text style={{fontSize: 20, fontWeight: "bold"}}>bitiş</Text>
        </View>
    );
};
