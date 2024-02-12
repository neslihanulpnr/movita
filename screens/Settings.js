import React, { useState } from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { Adres } from '../Component/Adres';
import { Password } from '../Component/Password';

export const Settings = ({ data }) => {
  const [showAdres, setShowAdres] = useState(false);

  const handleAdresPress = () => {
    setShowAdres(true);
  }

  const handleSifrePress = () => {
    setShowAdres(false);
  }

  return (
    <View style={styles.Container}>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={handleAdresPress}>
          <Text style={styles.Text}>
            Adres Değiştir
          </Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={handleSifrePress}>
          <Text style={styles.Text}>
            Şifre Değiştir
          </Text>
        </TouchableOpacity>
      </View>

      {showAdres && (
        <View style={styles.contentContainer}>
          <Adres data={data} />
        </View>
      )}

      {!showAdres && (
        <View style={styles.contentContainer}>
          <Password data={data}/>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  Container: {
    justifyContent: 'center',
    alignItems: 'center',
    top: 40
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    margin: 15,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: "#00ADEE",
    borderRadius: 10,
    width: 150,
    height: 50,
  },
  Text: {
    fontSize: 20,
    color: 'white',
  },
  contentContainer: {
    marginTop: 20,
  },
});
