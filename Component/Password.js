import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, Text, StyleSheet, ScrollView, } from 'react-native';
import { AntDesign } from '@expo/vector-icons';

export const Password = () => {
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [currentEmail, setCurrentEmail] = useState('');
    const [newEmail, setNewEmail] = useState('');
    const [currentNo, setCurrentNo] = useState('');
    const [newNo, setNewNo] = useState('');
    const [showPassword, setShowPassword] = useState(false);


    const toggleShowPassword = () => {
        setShowPassword(!showPassword);
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
                <TouchableOpacity onPress={toggleShowPassword} style={{marginLeft: 155}}>
                    <AntDesign name={showPassword ? 'unlock' : 'lock'} size={24} color="grey" />
                </TouchableOpacity>
            </View>

            <View style={styles.İnput}>
                <TextInput
                    placeholder="Yeni şifre"
                    placeholderTextColor={"grey"}
                    secureTextEntry={!showPassword}
                    value={newPassword}
                    onChangeText={setNewPassword}
                />
                <TouchableOpacity onPress={toggleShowPassword} style={{marginLeft: 175}}>
                    <AntDesign name={showPassword ? 'unlock' : 'lock'} size={24} color="grey" />
                </TouchableOpacity>
            </View>

            <View style={{ justifyContent: 'center', alignItems: 'center', margin: 5 }}>
                <TouchableOpacity style={styles.button}>
                    <Text style={{ color: "white" }}>Şifreyi Değiştir</Text>
                </TouchableOpacity>
            </View>

            <View style={{ margin: 15 }}></View>

            <View style={styles.İnput}>
                <TextInput
                    placeholder="Mevcut numara"
                    placeholderTextColor={"grey"}
                    value={currentNo}
                    onChangeText={setCurrentNo}
                />
            </View>

            <View style={styles.İnput}>
                <TextInput
                    placeholder="Yeni numara"
                    placeholderTextColor={"grey"}
                    value={newNo}
                    onChangeText={setNewNo}
                />
            </View>

            <View style={{ justifyContent: 'center', alignItems: 'center', margin: 5 }}>
                <TouchableOpacity style={styles.button}>
                    <Text style={{ color: "white" }}>Numara Değiştir</Text>
                </TouchableOpacity>
            </View>

            <View style={{ margin: 15 }}></View>

            <View style={styles.İnput}>
                <TextInput
                    placeholder="Mevcut e-mail"
                    placeholderTextColor={"grey"}
                    value={currentEmail}
                    onChangeText={setCurrentEmail}
                />
            </View>

            <View style={styles.İnput}>
                <TextInput
                    placeholder="Yeni e-mail"
                    placeholderTextColor={"grey"}
                    value={newEmail}
                    onChangeText={setNewEmail}
                />
            </View>

            <View style={{ justifyContent: 'center', alignItems: 'center', margin: 5 }}>
                <TouchableOpacity style={styles.button}>
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

export default Password;
