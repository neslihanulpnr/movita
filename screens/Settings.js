import React, { useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";

export const Settings = () => {
    const [textColor, setTextColor] = useState("black");

    const handleForgotPassword = () => {
        setTextColor("#00ADEE")
        console.log("sefere katılmayacağım")
    };
 

    return (
        <View>
        <View 
        style={{
            justifyContent: "center", 
            alignItems: "center", 
            backgroundColor: "orange"}}>
            <TouchableOpacity 
            onPress={handleForgotPassword} 
            style={{
                justifyContent: "flex-start", 
                alignItems: "flex-start", 
                margin: 10, 
                flexDirection: "row"}}>
                <Text 
                style={{ 
                    color: textColor, 
                    fontSize: 25 
                    }}>Sefere Katılmayacağım</Text>
            </TouchableOpacity>
        </View>

        <View>
        <Text > Kişi Bilgileri</Text>
        </View>
        </View>
    )
}