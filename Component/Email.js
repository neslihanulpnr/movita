import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, Text, StyleSheet, ScrollView, } from 'react-native';

export const Email = () => {
    const [currentEmail, setCurrentEmail] = useState('');
    const [newEmail, setNewEmail] = useState('');

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

export default Email;