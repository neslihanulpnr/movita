import React, { useState } from 'react';
import { Text, View, Button, TextInput, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { AntDesign } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';

export const Homepage = () => {
  const navigation = useNavigation();

  const [PASS, setPASS] = useState("123456");
  const [NAME, setNAME] = useState("neslihan@gmail.com");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");

  function Login() {
    if (PASS === password && NAME === name) {
      alert("Giriş başarılı");
      navigation.navigate("menu");
    } else {
      alert("Şifre veya email yanlış");
    }
  }

  return (
    <View style={{
      alignItems: "center",
      justifyContent: "center",
      flex: 1,
      marginBottom: 80,
    }}>
      <Text style={{
        color: "#00ADEE",
        marginTop: 0,
      }}></Text>
      <View style={{ marginTop: 20 }}>
        <View>
          <View style={{
            justifyContent: "center",
            alignItems: "center"
          }}>
            <Image source={require("../assets/movitaLogo.jpeg")}
              style={{
                width: 250,
                height: 200
              }} />
          </View>
          <View>
            <View style={{ margin: 7 }}></View>
            <View style={{
              flexDirection: 'row',
              alignItems: 'center',
              width: 300,
              height: 55,
              padding: 15,
              borderWidth: 0.1,
              borderRadius: 1
            }}>
              <Ionicons name="person-circle-outline" size={27} color="grey" />
              <TextInput
                placeholder='Kullanıcı Adı'
                placeholderTextColor={"gray"}
                style={{ flex: 1, marginLeft: 10 }}
                onChangeText={setName}
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
              borderRadius: 1
            }}>
              <AntDesign name="lock" size={27} color="grey" />
              <TextInput
                placeholder='Şifre'
                placeholderTextColor={"grey"}
                secureTextEntry={true}
                style={{ flex: 1, marginLeft: 10 }}
                onChangeText={setPassword}
              />
            </View>
          </View>
          <View style={{ margin: 10 }}></View>
        </View>
        <View>
          <Button color="#00ADEE" title='Giriş Yap' onPress={Login} />
        </View>
      </View>
    </View>
  );
};
