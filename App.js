import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { Navigator } from './Navigator';
import 'react-native-gesture-handler'; 


export default function App() {
  return (
    <NavigationContainer>
      <StatusBar style="auto" />
      <Navigator/> 
    </NavigationContainer>

  );
}

