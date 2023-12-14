import { View, Text, Touchable } from "react-native";
import { AntDesign } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import { TouchableOpacity } from "react-native-gesture-handler";

export const Menu = () => {
    return (
        <TouchableOpacity>
        <View style={{ flex: 1 }}>
            <View style={{ flex: 1 }}>
            </View>

            <View style={{
                backgroundColor: "grey",
                width: 395, 
                height: 70, 
                flexDirection: "row",
            }}>
                <View style={{
                    flex: 1,
                    backgroundColor: "orange",
                    justifyContent: "center",
                    alignItems: "center"
                }}>

                    <FontAwesome name="user-o" size={24} color="white" />
                    <Text style={{
                        color: "white",
                        fontWeight: "bold",
                        fontSize : 20
                        }}>Bilgi</Text>
                </View>

                <View style={{
                    flex: 1,
                    justifyContent: "center",
                    alignItems: "center",
                    backgroundColor: "orange"
                }}>
                    <FontAwesome5 name="clipboard-list" size={30} color="white" />
                    <Text style={{
                        color: "white",
                        fontWeight: "bold",
                        fontSize : 20
                        }}>Rapor</Text>
                </View>

                <View style={{
                    flex: 1,
                    justifyContent: "center",
                    alignItems: "center",
                    backgroundColor: "orange"
                }}>
                    <AntDesign name="car" size={30} color="white" />
                    <Text style={{
                        color: "white",
                        fontWeight:"bold",
                        fontSize:20
                        }}>Aracım</Text>
                </View>
            </View>
        </View>
        </TouchableOpacity>
    )
}