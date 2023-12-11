import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { Navigator } from './Navigator';


export default function App() {
  return (
    <NavigationContainer>
      <StatusBar style="auto" />
      <Navigator/>
    </NavigationContainer>

  );
}

