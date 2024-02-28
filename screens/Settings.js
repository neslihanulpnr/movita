import React, { useState } from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { Address } from '../Component/Address';
import { Password } from '../Component/Password';
import { Number } from '../Component/Number';
import { Email } from '../Component/Email';
import { AntDesign } from '@expo/vector-icons';

export const Settings = ({ data }) => {
  const filoData = data?.ret?.filo;
  const [selectedTab, setSelectedTab] = useState(null);

  const handleBack = () => {
    setSelectedTab(null);
  };

  return (
    <View style={styles.Container}>
      {selectedTab ? (
        <View style={styles.contentContainer}>
          {selectedTab === 'address' && <Address data={data} />}
          {selectedTab === 'password' && <Password data={data} />}
          {selectedTab === 'email' && <Email data={data} />}
          {selectedTab === 'number' && <Number data={data} />}

          <TouchableOpacity onPress={handleBack} style={styles.backButton}>
            <Text style={styles.Text}><AntDesign name="arrowleft" size={20} color="white" /></Text>
          </TouchableOpacity>
        </View>
      ) : (
        <View>
          <View>
            <Text style={{ fontSize: 30, right: 40 }}>Kullanıcı bilgileri</Text>
          </View>
          {filoData && (
            <View style={{right: 25}}>
              <Text style={{fontSize: 24}}>Kullanıcı adı: <Text style={styles.infoText}>{data?.ret?.username}</Text></Text>
              <Text style={{fontSize: 24}}>E-posta: <Text style={styles.infoText}>{filoData.eposta}</Text></Text>
              <Text style={{fontSize: 24}}>Telefon: <Text style={styles.infoText}>{filoData.telefon}</Text></Text>
            </View>
          )}
  
          <View style={{ margin: 25 }}></View>
  
          <View>
            <TouchableOpacity
              style={styles.button}
              onPress={() => setSelectedTab('address')}
            >
              <Text style={styles.Text}>Adres Değiştir</Text>
            </TouchableOpacity>
  
            <TouchableOpacity
              style={styles.button}
              onPress={() => setSelectedTab('password')}
            >
              <Text style={styles.Text}>Şifre Değiştir</Text>
            </TouchableOpacity>
  
            <TouchableOpacity
              style={styles.button}
              onPress={() => setSelectedTab('email')}
            >
              <Text style={styles.Text}>E-mail Değiştir</Text>
            </TouchableOpacity>
  
            <TouchableOpacity
              style={styles.button}
              onPress={() => setSelectedTab('number')}
            >
              <Text style={styles.Text}>Numara Değiştir</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  Container: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
  },
  infoText: {
    fontSize: 20,
    right: 35,
  },
  button: {
    margin: 5,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: "#00ADEE",
    borderRadius: 10,
    width: 160,
    height: 60,
    left: 50
  },
  backButton: {
    position: 'absolute',
    top: 10,
    right: 265,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: "#00ADEE",
    borderRadius: 10,
    width: 40,
    height: 30,
    position: 'absolute'
  },
  Text: {
    fontSize: 20,
    color: 'white',
  },
});

export default Settings;
