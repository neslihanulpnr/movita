import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, Text, StyleSheet } from 'react-native';

export const Password = () => {
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmNewPassword, setConfirmNewPassword] = useState('');


    return (
        <View>
            <View style={styles.İnput}>
                <TextInput
                    placeholder="Mevcut Şifre"
                    placeholderTextColor={"grey"}
                    secureTextEntry
                    value={currentPassword}
                    onChangeText={setCurrentPassword}
                />
            </View>

            <View style={styles.İnput}>
                <TextInput
                    placeholder="Yeni Şifre"
                    placeholderTextColor={"grey"}
                    value={newPassword}
                    onChangeText={setNewPassword}
                />
            </View>

            <View style={styles.İnput}>
                <TextInput
                    placeholder="Yeni Şifreyi Onayla"
                    placeholderTextColor={"grey"}
                    value={confirmNewPassword}
                    onChangeText={setConfirmNewPassword}
                />
            </View>

            <View style={{ justifyContent: 'center', alignItems: 'center', margin: 5 }}>
                <TouchableOpacity style={styles.button}>
                    <Text style={{color: "white"}}>Şifreyi Değiştir</Text>
                </TouchableOpacity>
            </View>


            <View style={styles.İnput}>
                <TextInput
                    placeholder="Mevcut Ad"
                    placeholderTextColor={"grey"}
                />
            </View>

            <View style={styles.İnput}>
                <TextInput
                    placeholder="Yeni Ad"
                    placeholderTextColor={"grey"}
                />
            </View>

            <View style={{ justifyContent: 'center', alignItems: 'center', margin: 5 }}>
                <TouchableOpacity style={styles.button}>
                    <Text style={{color: "white"}}>Adı Değiştir</Text>
                </TouchableOpacity>
        </View>

        <View style={styles.İnput}>
                <TextInput
                    placeholder="MevcutNumara"
                    placeholderTextColor={"grey"}
                />
            </View>

            <View style={styles.İnput}>
                <TextInput
                    placeholder="Yeni Numara"
                    placeholderTextColor={"grey"}
                />
            </View>

            <View style={{ justifyContent: 'center', alignItems: 'center', margin: 5 }}>
                <TouchableOpacity style={styles.button}>
                    <Text style={{color: "white"}}>Numarayı Değiştir</Text>
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
        borderRadius: 1
    }
});

export default Password;
