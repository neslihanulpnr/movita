import { createStackNavigator } from "@react-navigation/stack";
import { Login } from "./screens/Login";
import { Menu } from "./screens/Menu";
import { Homepage } from "./screens/Home";
import { Bilgi } from "./screens/Bilgi";
import { Map } from "./screens/Map";
import { Ayarlar } from "./screens/Ayarlar";

const Stack = createStackNavigator();

export const Navigator = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen
            name="homepage"
            component={Homepage}
            options={{
            title: "",
            headerStyle: {
            height: 1
            }
            }}/>

            <Stack.Screen name="login"
            component={Login}
            />

            <Stack.Screen name="menu"
            component={Menu}
            options={{
            title: "",
            headerStyle: {
                height: 1,
                backgroundColor: "orange"
                }
            }}/>

            <Stack.Screen name="ayarlar"
            component={Ayarlar}
            options={{
            title: ""
            }}/>

            <Stack.Screen name="map"
            component={Map}
            options={{
            title: ""
            }}/>

            <Stack.Screen name="bilgi"
            component={Bilgi}
            options={{
            title: "Sürücü Bilgileri"
            }}
            />

        </Stack.Navigator>


    )
}
