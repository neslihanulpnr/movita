import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, Text, StyleSheet, } from 'react-native';

export const Email = ({data}) => {
    const [currentEmail, setCurrentEmail] = useState('');
    const [newEmail, setNewEmail] = useState('');

    console.log("userid-email :",data.ret.user_id)

    const handleChangeEmail = async () => {
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
              userId: userId,
              currentEmail: currentEmail,
              newEmail: newEmail,
            }),
          });
    
          if (response.ok) {
            console.log('Email başarıyla değiştirildi');
          } else {
            console.log('Email değiştirme başarısız');
          }
        } catch (error) {
          console.error('API isteği sırasında bir hata oluştu:', error);
        }
      };

    return (
        <View>
            <View style={styles.İnput}>
                <TextInput
                    placeholder="Mevcut e-mail"
                    placeholderTextColor={"grey"}
                    value={currentEmail}
                    onChangeText={setCurrentEmail}
                />
            </View>

            <View style={{ margin: 5 }}></View>

            <View style={styles.İnput}>
                <TextInput
                    placeholder="Yeni e-mail"
                    placeholderTextColor={"grey"}
                    value={newEmail}
                    onChangeText={setNewEmail}
                />
            </View>

            <View style={{ justifyContent: 'center', alignItems: 'center', margin: 5 }}>
                <TouchableOpacity style={styles.button} onPress={handleChangeEmail}>
                    <Text style={{ color: "white" }}>E-mail Değiştir</Text>
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

export default Email;