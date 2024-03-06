import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, Text, StyleSheet, } from 'react-native';
import { useFormik } from 'formik';

export const Email = ({ data }) => {
  const [notification, setNotification] = useState(null);

  console.log("userid-email :", data.ret.user_id);

  const formik = useFormik({
    initialValues: {
      currentEmail: '',
      newEmail: '',
      confirmEmail: '',
    },
    onSubmit: async (values) => {
      try {
        if (values.newEmail !== values.confirmEmail) {
          setNotification('E-mailler uyuşmuyor.');
          return;
        }

        const response = await fetch('http://161.97.107.99:8019/personel_guncelle', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'sample_token1234',
          },
          body: JSON.stringify({
            user_id: data.ret.user_id,
            currentEmail: values.currentEmail,
            newEmail: values.newEmail,
            confirmEmail: values.confirmEmail,
          }),
        });


        if (response.ok) {
          console.log('Email güncelleme başarılı');
          setNotification('Email güncelleme başarılı');
        } else {
          console.error('Email güncelleme başarısız', response.statusText);
          setNotification('Email güncelleme başarısız');
        }
      } catch (error) {
        console.error('Email güncelleme hatası', error);
        setNotification('Email güncelleme hatası');
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