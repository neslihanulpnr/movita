import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { NavigationContainer } from '@react-navigation/native';

export default function App() {
  return (

    <NavigationContainer>
    <View style={styles.container}>
      <StatusBar style="auto" />

      <View style={{ alignItems: "center", justifyContent: "center", flex: 0.4, marginBottom: 80 }}>
        <MaterialCommunityIcons name="bus-marker" size={100} color="orange" />
        <Text style={{
          color: "#00ADEE",
          fontWeight: 'bold',
          fontSize: 50,
          marginTop: 0,
        }}>movita</Text>
        <View style={{ marginTop: 20 }}>
          <View>
            <Button color="#00ADEE" title='Giriş Yap' onPress={() => alert("butona tıklandı")} />
          </View>
        </View>
      </View>
    </View>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});