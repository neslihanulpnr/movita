import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, Text, StyleSheet, } from 'react-native';
import { useFormik } from 'formik';

export const Number = ({ data }) => {
  const [notification, setNotification] = useState(null);

  console.log("userid-numara :", data.ret.user_id);

  const formik = useFormik({
    initialValues: {
      currentNo: '',
      newNo: '',
      confirmNo: '',
    },
    onSubmit: async (values) => {
      try {
        if (values.newNo !== values.confirmNo) {
          setNotification('Numaralar uyuşmuyor.');
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
            currentNo: values.currentNo,
            newNo: values.newNo,
          }),
        });

        const responseData = await response.json();

        console.log('API Yanıtı:', responseData);
        if (responseData.error_code === 0) {
          setNotification('Numara başarıyla değiştirildi.');
        } else {
          console.log('Numara değiştirme başarısız. Hata Kodu:', responseData.error_code);

          if (responseData.error_code === 9999) {
            setNotification('Numara değiştirme başarısız.');
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
          placeholder="Mevcut numara"
          placeholderTextColor={"grey"}
          value={formik.values.currentNo}
          keyboardType={'numeric'}
          onChangeText={formik.handleChange("currentNo")}
        />
      </View>

      <View style={{ margin: 5 }}></View>

      <View style={styles.İnput}>
        <TextInput
          placeholder="Yeni numara"
          placeholderTextColor={"grey"}
          value={formik.values.newNo}
          keyboardType={'numeric'}
          onChangeText={formik.handleChange("newNo")}
        />
      </View>

      <View style={{ margin: 5 }}></View>

      <View style={styles.İnput}>
        <TextInput
          placeholder="Numara onay"
          placeholderTextColor={"grey"}
          value={formik.values.confirmNo}
          keyboardType={'numeric'}
          onChangeText={formik.handleChange("confirmNo")}
        />
      </View>

      {notification && (
        <View>
          <Text style={styles.notificationText}>{notification}</Text>
        </View>
      )}

      <View style={{ justifyContent: 'center', alignItems: 'center', margin: 5 }}>
        <TouchableOpacity style={styles.button} onPress={formik.handleSubmit}>
          <Text style={{ color: "white" }}>Numarayı Değiştir</Text>
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

export default Number;
