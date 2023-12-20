const { createDrawerNavigator } = require("@react-navigation/drawer")
import { Home2 } from "./screen/home2"
import { About } from "./screen/About"
import { Profile } from "./screen/Profile"
import { Settings } from "./screen/Settings"



const Drawer = createDrawerNavigator()

export const DrawerNavigator = () => {
    return(
        <Drawer.Navigator>
          <Drawer.Screen name="home" component={Home2}/>
          <Drawer.Screen name="about" component={About}/>
          <Drawer.Screen name="profile" component={Profile}/>
          <Drawer.Screen name="settings" component={Settings}/>

        </Drawer.Navigator>
    )
}