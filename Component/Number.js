import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, Text, StyleSheet, } from 'react-native';

export const Number = ({ data }) => {
  const [currentNo, setCurrentNo] = useState('');
  const [newNo, setNewNo] = useState('');
  const [confirmNo, setConfirmNo] = useState('');

  console.log("userid-numara :", data.ret.user_id)

  const handleChangeNumber = async () => {
    try {
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
          currentNo: currentNo,
          newNo: newNo,
        }),
      });

      const responseData = await response.json();

      console.log('API Yanıtı:', responseData);
      if (responseData.error_code === 0) {
        console.log('Numara başarıyla değiştirildi');
      } else {
        console.log('Numara değiştirme başarısız. Hata Kodu:', responseData.error_code);
      
        if (responseData.error_code === 9999) {
          console.log('Mevcut numara yanlış girilmiş olabilir.');
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
          placeholder="Mevcut numara"
          placeholderTextColor={"grey"}
          value={currentNo}
          onChangeText={setCurrentNo}
        />
      </View>

      <View style={{ margin: 5 }}></View>

      <View style={styles.İnput}>
        <TextInput
          placeholder="Yeni numara"
          placeholderTextColor={"grey"}
          value={newNo}
          onChangeText={setNewNo}
        />
      </View>

      <View style={{ margin: 5 }}></View>

      <View style={styles.İnput}>
        <TextInput
          placeholder="Numara onay"
          placeholderTextColor={"grey"}
          value={confirmNo}
          onChangeText={setConfirmNo}
        />
      </View>

      <View style={{ justifyContent: 'center', alignItems: 'center', margin: 5 }}>
        <TouchableOpacity style={styles.button} onPress={handleChangeNumber}>
          <Text style={{ color: "white" }}>Numara Değiştir</Text>
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

export default Number;