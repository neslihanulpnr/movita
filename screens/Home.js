import React from 'react';
import { Text, View, Button, TextInput, Image} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { AntDesign } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';

export const Homepage = () => {
  const navigation = useNavigation();

  return (
    <View style={{
      alignItems: "center",
      justifyContent: "center",
      flex: 1,
      marginBottom: 80,
    }}>
   
      <Text style={{
        color: "#00ADEE",
        fontWeight: 'bold',
        fontSize: 50,
        marginTop: 0,
      }}></Text>
      <View style={{ marginTop: 20 }}>
        <View>
          <View>
            <Text style={{
              fontSize: 20,
            }}><Image source={require("../assets/movitaLogo.jpeg")}/>
            </Text>
            <View style={{ margin: 7 }}></View>
            
            <View style={{ 
              flexDirection: 'row', 
              alignItems: 'center', 
              width: 300, 
              height: 55, 
              padding: 15, 
              borderWidth: 0.1, 
              borderRadius: 1 }}>
              <FontAwesome name="user-o" size={24} color="grey" />
              <TextInput
                placeholder='Kullanıcı Adı'
                placeholderTextColor={"gray"}
                style={{ flex: 1, marginLeft: 10 }}
              />
            </View>
          </View>

          <View style={{ margin: 5 }}></View>

          <View>
            <View style={{ 
              flexDirection: 'row', 
              alignItems: 'center', 
              width: 300, 
              height: 55, 
              padding: 15, 
              borderWidth: 0.1, 
              borderRadius: 1 }}>
              <AntDesign name="lock" size={27} color="grey" />
              <TextInput
                placeholder='Şifre'
                placeholderTextColor={"grey"}
                secureTextEntry={true}
                style={{ flex: 1, marginLeft: 10 }}
              />
            </View>
          </View>
          <View style={{ margin: 10 }}></View>
        </View>
        <View>
          <Button color="#00ADEE" title='Giriş Yap' onPress={() => navigation.navigate("menu")} />
        </View>
      </View>
    </View>
  );
}