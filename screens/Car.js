import { Text, View } from "react-native";
import { useNavigation } from '@react-navigation/native';

export const Car = () => {
    const navigation = useNavigation();

    return(
        <View>
            <Text>car</Text>
        </View>
    )
}