import { createStackNavigator } from "@react-navigation/stack";
import { Menu } from "./screens/Menu";
import { Login } from "./screens/Login";
import { Settings } from "./screens/Settings";
import { Seferler } from "./screens/Seferler";
import { Map } from "./screens/Map";
import SoforMap from "./screens/SoforMap";
import { Adres } from "./Component/Adres";
import { Password } from "./Component/Password";


const Stack = createStackNavigator();

export const Navigator = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name="Login"
                component={Login}
                options={{
                    title: "",
                    headerStyle: {
                        height: 1
                    }
                }} />

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

            <Stack.Screen name="Adres"
                component={Adres} />

            <Stack.Screen name="Password"
                component={Password} />

        </Stack.Navigator>
    )
}