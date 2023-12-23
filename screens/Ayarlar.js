import { Text, View } from "react-native";
import { useNavigation } from '@react-navigation/native';

export const Ayarlar = () => {
    const navigation = useNavigation();

    return(
        <View style={{justifyContent: "center", alignItems: "center"}}>
            <Text style={{fontSize: 20, fontWeight: "bold"}}>car</Text>
        </View>
    )
}