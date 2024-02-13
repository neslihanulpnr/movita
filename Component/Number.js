import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, Text, StyleSheet, } from 'react-native';

export const Number = ({data}) => {
    const [currentNo, setCurrentNo] = useState('');
    const [newNo, setNewNo] = useState('');

    console.log("userid-numara :",data.ret.user_id)

    const handleChangeNumber = async () => {
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
              currentPassword: currentPassword,
              newPassword: newPassword,
            }),
          });
    
          if (response.ok) {
            console.log('Numara başarıyla değiştirildi');
          } else {
            console.log('Numara değiştirme başarısız');
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