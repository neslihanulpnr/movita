import { createStackNavigator } from "@react-navigation/stack";
import { Login } from "./screens/Login";
import { Menu } from "./screens/Menu";
import { Homepage } from "./screens/Home";
import { Settings } from "./screens/Settings";
import { Seferler } from "./screens/Seferler";
import { Map } from "./screens/Map";
import SoforMap from "./screens/SoforMap";


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
                }} />

            <Stack.Screen name="login"
                component={Login} />

            <Stack.Screen name="menu"
                component={Menu}
                options={{
                    title: "",
                    headerStyle: {
                        height: 1,
                        backgroundColor: "orange"
                    }
                }} />

            <Stack.Screen name="Settings"
                component={Settings}
                options={{
                    title: "",
                    headerStyle: {
                        height: 1,
                        backgroundColor: "orange"
                    }
                }} />

            <Stack.Screen name="Map"
                component={Map}
                options={{
                    title: "",
                    headerShown: false,
                    headerStyle: {
                        backgroundColor: "#edebeb"
                    }
                }} />

            <Stack.Screen name="SoforMap"
                component={SoforMap}
                options={{
                    title: "",
                    headerShown: false,
                    headerStyle: {
                        backgroundColor: "#edebeb"
                    }
                }} />

            <Stack.Screen name="Seferler"
                component={Seferler}
                options={{
                    title: "",
                    headerStyle: {
                        backgroundColor: "#edebeb"
                    }
                }} />



        </Stack.Navigator>
    )
}