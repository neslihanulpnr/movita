import { createStackNavigator } from "@react-navigation/stack";
import { Menu } from "./screens/Menu";
import { Login } from "./screens/Login";
import { Settings } from "./screens/Settings";
import { Seferler } from "./screens/Seferler";
import { Map } from "./screens/Map";
import SoforMap from "./screens/SoforMap";
import { Address } from "./Component/Address";
import { Password } from "./Component/Password";
import { Number } from "./Component/Number";
import { Email } from "./Component/Email";


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

            <Stack.Screen name="Address"
                component={Address} />

            <Stack.Screen name="Password"
                component={Password} />

            <Stack.Screen name="Number"
                component={Number} />

<Stack.Screen name="Email"
                component={Email} />
        </Stack.Navigator>
    )
}