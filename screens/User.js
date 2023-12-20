import { View } from "react-native"

export const User = () => {
    return(
        <View style={{
        width: "90%", 
        height: 80, 
        padding: 5, 
        margin: 3,
        flexDirection: "row", 
         }}>
            <View style={{flex: 2 }}></View>
            <View style={{flex: 5 }}></View>
            <View style={{flex: 1 }}></View>
        </View>
    )
}