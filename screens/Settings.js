import { View, Text, TouchableOpacity } from "react-native"
import { AntDesign } from '@expo/vector-icons';

export const Settings = () => {
    const handleForgotPassword = () => {}


    return (
        <View>
            <TouchableOpacity onPress={handleForgotPassword} 
            style={{justifyContent: "flex-start", alignItems: "flex-start", margin: 10, flexDirection: "row"}}>
                <Text style={{ color: "black", fontSize: 25 }}>Şifreyi değiştir</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={handleForgotPassword} 
            style={{justifyContent: "flex-start", alignItems: "flex-start", margin: 10, flexDirection: "row"}}>
                <Text style={{ color: "black", fontSize: 25 }}>Şifremi unuttum </Text>
            </TouchableOpacity>


        </View>
    )
}