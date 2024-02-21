import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, Text, StyleSheet, } from 'react-native';
import { AntDesign } from '@expo/vector-icons';

export const Password = ({ data }) => {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  console.log("userid-şifre:", data.ret.user_id);

  const handleChangePassword = async () => {
    try {
      if (newPassword !== confirmPassword) {
        console.log('Yeni şifreler uyuşmuyor.');
        return;
      }
  
      const apiUrl = 'http://www.movita.com.tr:8019/users_change_pass';
      const userId = data.ret.user_id;
  
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'sample_token1234'
        },
        body: JSON.stringify({
          userId: userId,
          currentPassword: currentPassword,
          newPassword: newPassword,
        }),
      });

      const responseData = await response.json();

      console.log('API Yanıtı:', responseData);
      if (responseData.error_code === 0) {
        console.log('Şifre başarıyla değiştirildi');
      } else {
        console.log('Şifre değiştirme başarısız. Hata Kodu:', responseData.error_code);
      
        if (responseData.error_code === 9999) {
          console.log('Mevcut şifre yanlış girilmiş olabilir.');
        } else {
          console.log('Hata Mesajı:', responseData.error_message);
        }
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

      <View style={{ margin: 5 }}></View>

      <View style={styles.İnput}>
        <TextInput
          placeholder="Şifre Onay"
          placeholderTextColor={"grey"}
          secureTextEntry={!showPassword}
          value={confirmPassword}
          onChangeText={setConfirmPassword}
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