import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';

export const Settings = () => {
  return (
    <View style={styles.Container}>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.Text}>
            Şifre Değiştir
          </Text>
        </TouchableOpacity>
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.Text}>
            Şifre Değiştir
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  Container: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  buttonContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    margin: 100,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: "#00ADEE",
    borderRadius: 10,
    width: 200,
    height: 50,
  },
  Text: {
    fontSize: 20,
    color: 'white',
  },
});
export default Settings;
