import { Image, Text, View } from "react-native";
import { useNavigation } from '@react-navigation/native';

export const Bilgi = () => {
    const navigation = useNavigation();

    return(
        <View>
            <Image source={require("../assets/profile.jpeg")} style={{
                width: 200,
                height: 200,
                borderWidth: 3,
                borderColor: "black",
                borderRadius: 70,
                marginLeft: 20,
                marginTop: 20
                }}/>
        </View>
    )
}