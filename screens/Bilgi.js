import { Text, View } from "react-native";
import { useNavigation } from '@react-navigation/native';

export const Bilgi = () => {
    const navigation = useNavigation();

    return(
        <View>
            <Text>bilgi</Text>
        </View>
    )
}