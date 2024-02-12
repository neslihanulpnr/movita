import React, { useState } from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { Adres } from '../Component/Adres';
import { Password } from '../Component/Password';
import { Number } from '../Component/Number';
import { Email } from '../Component/Email';

export const Settings = ({ data }) => {
  const [showAdres, setShowAdres] = useState(false);
  const [showSifre, setShowSifre] = useState(false);
  const [showEmail, setShowEmail] = useState(false);
  const [showNumber, setShowNumber] = useState(false);

  const handleAdresPress = () => {
    setShowAdres(true);
    setShowSifre(false);
    setShowEmail(false);
    setShowNumber(false);
  }

  const handleSifrePress = () => {
    setShowAdres(false);
    setShowSifre(true);
    setShowEmail(false);
    setShowNumber(false);
  }

  const handleEmailPress = () => {
    setShowAdres(false);
    setShowSifre(false);
    setShowEmail(true);
    setShowNumber(false);
  }

  const handleNumberPress = () => {
    setShowAdres(false);
    setShowSifre(false);
    setShowEmail(false);
    setShowNumber(true);
  }

  return (
    <View style={styles.Container}>
      <View style={styles.rowContainer}>
        <View style={styles.columnContainer}>
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

        <View style={styles.columnContainer}>
          <TouchableOpacity style={styles.button} onPress={handleEmailPress}>
            <Text style={styles.Text}>
              E-mail Değiştir
            </Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.button} onPress={handleNumberPress}>
            <Text style={styles.Text}>
              Numara Değiştir
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.contentContainer}>
        {showAdres && <Adres data={data} />}
        {showSifre && <Password data={data} />}
        {showEmail && <Email data={data} />}
        {showNumber && <Number data={data} />}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  Container: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
  },
  rowContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    
  },
  columnContainer: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    margin: 5,
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
    alignItems: 'center',
  },
});