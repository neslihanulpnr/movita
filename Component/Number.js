import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, Text, StyleSheet, } from 'react-native';

export const Number = () => {
    const [currentNo, setCurrentNo] = useState('');
    const [newNo, setNewNo] = useState('');

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