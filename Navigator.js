import { createStackNavigator } from "@react-navigation/stack";
import { Login } from "./screens/Login";
import { Menu } from "./screens/Menu";
import { Homepage } from "./screens/Home";
import { Settings } from "./screens/Settings";
import { Information } from "./screens/Information";
import { Map } from "./screens/Map"

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

            <Stack.Screen name="Settings"
            component={Settings}
            options={{
            title: "",
            headerStyle: {
                height: 1,
                backgroundColor: "orange"
                }
            }}/>

            <Stack.Screen name="map"
            component={Map}
            options={{
            title: "",
            headerShown: false,
            headerStyle: {
                backgroundColor: "#edebeb"
                }
            }}
            />

            <Stack.Screen name="Information"
            component={Information}
            options={{
            title: "",
            headerStyle: {
                backgroundColor: "#edebeb"
                }
            }}
            />

        </Stack.Navigator>
    )
}