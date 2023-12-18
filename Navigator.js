import { createStackNavigator } from "@react-navigation/stack";
import { Login } from "./screens/Login";
import { Menu } from "./screens/Menu";
import { Homepage } from "./screens/Home";
import { Car } from "./screens/Car";
import { Bilgi } from "./screens/Bilgi";
import { Rapor } from "./screens/Rapor";

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

            <Stack.Screen name="car"
        component={Car}
        options={{title:""
        }}
        /> 

<Stack.Screen name="rapor"
        component={Rapor}
        options={{title:""
        }}
        /> 

<Stack.Screen name="bilgi"
        component={Bilgi}
        options={{title:""
        }}
        /> 
        
        </Stack.Navigator>

        
    )
}
