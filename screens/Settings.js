import { View, Text, TouchableOpacity } from "react-native";

export const Settings = () => {
    const handleForgotPassword = () => {}


    return (
        <View>
            <TouchableOpacity onPress={handleForgotPassword} 
            style={{justifyContent: "flex-start", alignItems: "flex-start", margin: 10, flexDirection: "row"}}>
                <Text style={{ color: "black", fontSize: 25 }}>Sefere Katılmayacağım</Text>
            </TouchableOpacity>




        </View>
    )
}