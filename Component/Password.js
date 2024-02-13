import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, Text, StyleSheet, } from 'react-native';
import { AntDesign } from '@expo/vector-icons';

export const Password = ({data}) => {
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);

    const toggleShowPassword = () => {
        setShowPassword(!showPassword);
    };

    console.log("userid-şifre :",data.ret.user_id)

    const handleChangePassword = async () => {
        try {
          const apiUrl = '';
          const userId = data.ret.user_id;
    
          const response = await fetch(apiUrl, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': 'sample_token1234'
            },
            body: JSON.stringify({
              userId: data.ret.userId,
              currentPassword: currentPassword,
              newPassword: newPassword,
            }),
          });
    
          if (response.ok) {
            console.log('Şifre başarıyla değiştirildi');
          } else {
            console.log('Şifre değiştirme başarısız');
          }
        } catch (error) {
          console.error('API isteği sırasında bir hata oluştu:', error);
        }
      };
    

    return (
        <View>
            <View style={styles.İnput}>
                <TextInput
                    placeholder="Mevcut şifre"
                    placeholderTextColor={"grey"}
                    secureTextEntry={!showPassword}
                    value={currentPassword}
                    onChangeText={setCurrentPassword}
                />
                <TouchableOpacity onPress={toggleShowPassword} style={{ right: 10, position: 'absolute', }}>
                    <AntDesign name={showPassword ? 'unlock' : 'lock'} size={24} color="grey" />
                </TouchableOpacity>
            </View>

            <View style={{ margin: 5 }}></View>

            <View style={styles.İnput}>
                <TextInput
                    placeholder="Yeni şifre"
                    placeholderTextColor={"grey"}
                    secureTextEntry={!showPassword}
                    value={newPassword}
                    onChangeText={setNewPassword}
                />
                <TouchableOpacity onPress={toggleShowPassword} style={{ right: 10, position: 'absolute', }}>
                    <AntDesign name={showPassword ? 'unlock' : 'lock'} size={24} color="grey" />
                </TouchableOpacity>
            </View>

            <View style={{ justifyContent: 'center', alignItems: 'center', margin: 5 }}>
                <TouchableOpacity style={styles.button} onPress={handleChangePassword}>
                    <Text style={{ color: "white" }}>Şifreyi Değiştir</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    button: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: "#00ADEE",
        borderRadius: 10,
        width: 120,
        height: 40,
    },
    İnput: {
        flexDirection: 'row',
        alignItems: 'center',
        width: 300,
        height: 55,
        padding: 15,
        borderWidth: 0.1,
        borderRadius: 1,
    },
});

export default Password;