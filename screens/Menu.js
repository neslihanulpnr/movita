import { View, Text } from "react-native";
import { AntDesign } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';

export const Menu = () => {
    return (
        <View>


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
                    <Ionicons name="person-circle-outline" size={35} color="#00ADEE" />
                    <Text style={{
                        color: "#00ADEE",
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
                    <FontAwesome5 name="clipboard-list" size={30} color="#00ADEE" />
                    <Text style={{
                        color: "#00ADEE",
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
                    <AntDesign name="car" size={30} color="#00ADEE" />
                    <Text style={{
                        color: "#00ADEE",
                        fontWeight:"bold",
                        fontSize:20
                        }}>Aracım</Text>
                </View>

            </View>
        </View>
    )
}