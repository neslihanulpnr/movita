import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, Text, StyleSheet, } from 'react-native';
import { useFormik } from 'formik';

export const Email = ({ data }) => {
  const [notification, setNotification] = useState(null);

  console.log("userid-email :", data.ret.user_id)

  const formik = useFormik({
    initialValues: {
      currentEmail: '',
      newEmail: '',
      confirmEmail: '',
    },
    onSubmit: async (values) => {
      try {
        if (values.newEmail !== values.confirmEmail) {
          console.log('Yeni email uyuşmuyor.');
          setNotification('E-mailler uyuşmuyor.');
          return;
        }

        const apiUrl = 'http://www.movita.com.tr:8019/personel_guncelle';
        const userId = data.ret.user_id;

        const response = await fetch(apiUrl, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'sample_token1234'
          },
          body: JSON.stringify({
            userId: userId,
            currentEmail: values.currentEmail,
            newEmail: values.newEmail,
          }),
        });

        const responseData = await response.json();

        console.log('API Yanıtı:', responseData);
        if (responseData.error_code === 0) {
          setNotification('E-mail başarıyla değiştirildi.');
        } else {
          console.log('Email değiştirme başarısız. Hata Kodu:', responseData.error_code);

          if (responseData.error_code === 1) {
            setNotification('E-mail değiştirme başarısız.');
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
          placeholder="Mevcut e-mail"
          placeholderTextColor={"grey"}
          value={formik.values.currentEmail}
          inputMode={"email"}
          onChangeText={formik.handleChange("currentEmail")}
        />
      </View>

      <View style={{ margin: 5 }}></View>

      <View style={styles.İnput}>
        <TextInput
          placeholder="Yeni e-mail"
          placeholderTextColor={"grey"}
          value={formik.values.newEmail}
          inputMode={"email"}
          onChangeText={formik.handleChange("newEmail")}
        />
      </View>

      <View style={{ margin: 5 }}></View>

      <View style={styles.İnput}>
        <TextInput
          placeholder="E-mail onay"
          placeholderTextColor={"grey"}
          value={formik.values.confirmEmail}
          inputMode={"email"}
          onChangeText={formik.handleChange("confirmEmail")}
        />
      </View>

      {notification && (
        <View>
          <Text style={styles.notificationText}>{notification}</Text>
        </View>
      )}

      <View style={{ justifyContent: 'center', alignItems: 'center', margin: 5 }}>
        <TouchableOpacity style={styles.button} onPress={formik.handleSubmit}>
          <Text style={{ color: "white" }}>E-maili Değiştir</Text>
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

export default Email;