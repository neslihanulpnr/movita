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

          <View style={styles.header}>
            <Text style={styles.headerText}>Kullanıcı Bilgileri</Text>
          </View>
          <View style={styles.tablo}>
            <View style={styles.content}>
              {filoData && (
                <View>
                  <Text style={[styles.infoText, styles.infoTextWithBorder]}>Kullanıcı adı: <Text style={{ fontSize: 20 }}>{data?.ret?.username}</Text></Text>
                  <Text style={[styles.infoText, styles.infoTextWithBorder]}>E-posta: <Text style={{ fontSize: 20 }}>{filoData.eposta}</Text></Text>
                  <Text style={styles.infoText}>Telefon: <Text style={{ fontSize: 20 }}>{filoData.telefon}</Text></Text>
                </View>
              )}
            </View>
          </View>

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
  infoTextWithBorder: {
    borderBottomColor: 'lightgrey',
    borderBottomWidth: 1,
    width: 339,
    marginVertical: 5,

  },
  Container: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
  },
  button: {
    margin: 10,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: "#00ADEE",
    width: 400,
    height: 90,
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
  tablo: {
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 5,
    padding: 10,
    width: 350,
    left: 35
  },
  header: {
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 10,
  },
  headerText: {
    fontSize: 30,
    fontWeight: "400"
  },
  content: {
    justifyContent: "center",
    alignItems: "center",
  },
  infoText: {
    color: "black",
    fontSize: 23,
    marginBottom: 5,
  },
});

export default Settings;