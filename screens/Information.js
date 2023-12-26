import React from "react";
import { View, Text } from "react-native";

export const Information = ({ route }) => {
    const { selectedData } = route.params;

    return (
        <View style={{alignItems: "center", justifycontent: "center"}}>
            <Text style={{fontSize: 20, fontWeight: "bold"}}>neslihan</Text>
        </View>
    );
};
