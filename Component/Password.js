import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { useFormik } from 'formik';

export const Password = ({ data }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [notification, setNotification] = useState(null);

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  console.log("userid-şifre:", data.ret.user_id);

  const formik = useFormik({
    initialValues: {
      currentPassword: '',
      newPassword: '',
      confirmPassword: '',
    },
    onSubmit: async (values) => {
      try {
        if (values.newPassword !== values.confirmPassword) {
          console.log('Yeni şifreler uyuşmuyor.');
          setNotification('Şifreler uyuşmuyor.');
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
            currentPassword: values.currentPassword,
            newPassword: values.newPassword,
          }),
        });

        const responseData = await response.json();

        console.log('API Yanıtı:', responseData);
        if (responseData.error_code === 0) {
          setNotification('Şifre başarıyla değiştirildi.');
        } else {
          console.log('Şifre değiştirme başarısız. Hata Kodu:', responseData.error_code);

          if (responseData.error_code === 9999) {
            setNotification('Şifre değiştirme başarısız.');
          } else {
            setNotification(responseData.error_message);
          }
        }

      } catch (error) {
        console.error('API isteği sırasında bir hata oluştu:', error);
      }
    },
  });

  return (
    <View style={{top:60}}>
      <View style={styles.İnput}>
        <TextInput
          placeholder="Mevcut şifre"
          placeholderTextColor={"grey"}
          secureTextEntry={!showPassword}
          value={formik.values.currentPassword}
          onChangeText={formik.handleChange("currentPassword")}
        />
        <TouchableOpacity onPress={toggleShowPassword} style={{ right: 10, position: 'absolute' }}>
          <AntDesign name={showPassword ? 'unlock' : 'lock'} size={24} color="grey" />
        </TouchableOpacity>
      </View>

      <View style={{ margin: 5 }}></View>

      <View style={styles.İnput}>
        <TextInput
          placeholder="Yeni şifre"
          placeholderTextColor={"grey"}
          secureTextEntry={!showPassword}
          value={formik.values.newPassword}
          onChangeText={formik.handleChange("newPassword")}
        />
        <TouchableOpacity onPress={toggleShowPassword} style={{ right: 10, position: 'absolute' }}>
          <AntDesign name={showPassword ? 'unlock' : 'lock'} size={24} color="grey" />
        </TouchableOpacity>
      </View>

      <View style={{ margin: 5 }}></View>

      <View style={styles.İnput}>
        <TextInput
          placeholder="Şifre Onay"
          placeholderTextColor={"grey"}
          secureTextEntry={!showPassword}
          value={formik.values.confirmPassword}
          onChangeText={formik.handleChange("confirmPassword")}
        />
        <TouchableOpacity onPress={toggleShowPassword} style={{ right: 10, position: 'absolute' }}>
          <AntDesign name={showPassword ? 'unlock' : 'lock'} size={24} color="grey" />
        </TouchableOpacity>
      </View>

      {notification && (
        <View>
          <Text style={styles.notificationText}>{notification}</Text>
        </View>
      )}

      <View style={{ justifyContent: 'center', alignItems: 'center', margin: 5 }}>
        <TouchableOpacity style={styles.button} onPress={formik.handleSubmit}>
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
  notificationText: {
    color: 'red',
  },
});

export default Password;
