import { createStackNavigator } from "@react-navigation/stack";
import { Login } from "./screens/Login";
import { Menu } from "./screens/Menu";
import { Homepage } from "./screens/Home";

const Stack = createStackNavigator();

export const Navigator = () => {
    return( 
        <Stack.Navigator>
            <Stack.Screen 
            name="homepage" 
            component={Homepage} 
            options={{title: "",
            headerStyle:{
            height:1
            }
            }}/>

     

            <Stack.Screen name="login"
             component={Login}
             
             />

            <Stack.Screen name="menu"
            component={Menu}
            options={{title:"",
            headerStyle:{
            height:1
            }
            }}/>
        </Stack.Navigator>
    )
}
