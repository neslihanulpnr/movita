import React, { useState } from 'react';
import { View, TextInput, Image, Alert, TouchableOpacity, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { AntDesign } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';


export const Homepage = () => {
    const navigation = useNavigation();

    const [password, setPassword] = useState("");
    const [username, setUsername] = useState("");

    function Login() {
        fetch('http://161.97.107.99:8011/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'sample_token1234',

            },
            body: JSON.stringify({
                username: username,
                password: password
            })
        })
            .then(response => response.json())
            .then(data => {
                console.log('API yanıtı:', data);
                if (data.error_code === 1011) {
                    Alert.alert("", "Şifre veya kullanıcı adı yanlış");
                } else {
                    navigation.navigate("menu"); 
                }
            })
            
            .catch(error => {
                console.error('Hata:', error);
                Alert.alert("Hata", "Şifre veya kullanıcı adı yanlış.");
            });
    }

    return (
        <View style={{
            alignItems: "center",
            justifyContent: "center",
            flex: 1,
            marginBottom: 80,
        }}>
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
                                onChangeText={setUsername}
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
                <View style= {{justifyContent: 'center', alignItems: 'center'}}>
                <TouchableOpacity
                    style={{
                        backgroundColor: '#00ADEE',
                        padding: 10,
                        borderRadius: 5,
                        width: 150,
                        height: 40, 
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}
                    onPress={Login}
                >
                    <Text style={{ color: 'white', fontSize: 16 }}>Giriş Yap</Text>
                </TouchableOpacity>
            </View>

            </View>
        </View>
    );
};