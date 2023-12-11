import {Text, View, Button } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

export const Homepage = () => {
const navigation = useNavigation();

    return(
 
        <View style={{ 
        alignItems: "center",
        justifyContent: "center", 
        flex: 1, marginBottom: 80, }}>
        <MaterialCommunityIcons name="bus-marker" size={100} color="orange" />
        <Text style={{
          color: "#00ADEE",
          fontWeight: 'bold',
          fontSize: 50,
          marginTop: 0,
        }}>movita</Text>
        <View style={{ marginTop: 20 }}>
          <View>
            <Button color="#00ADEE" title='Giriş Yap' onPress={() => navigation.navigate("login")} />
          </View>
        </View>
      </View>
    );
}