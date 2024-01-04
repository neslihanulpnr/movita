import React, { useState, useEffect } from 'react';
import { View, TouchableOpacity, StyleSheet, Text, Image } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Information } from './Information';
import { Map } from './Map';
import { Settings } from './Settings';

export const Menu = () => {
  const navigation = useNavigation();
  //eklendi
  const route = useRoute()
  console.log(route.params.data);

  const [contentToShow, setContentToShow] = useState(null);
  const [selectedButton, setSelectedButton] = useState(null);
  //eklendi
  const [data,setData]=useState(route.params.data) 
  console.log(data);

  useEffect(() => {
    navigation.setOptions({
      title: '',
      headerLeft: () => null,
    });

    handleButtonPress(<Map />, 'Harita');
  }, [navigation]);

  const handleLogout = () => {
    console.log("çıkış yap butonuna tıklandı");
    navigation.navigate("homepage");
  }

  const handleButtonPress = (content, buttonName) => {
    setContentToShow(content);
    setSelectedButton(buttonName);
  }

  return (
    <View style={{ flex: 1 }}>
      <View style={{ height: 90, width: "100%", backgroundColor: "#edebeb" }}>
        <View style={{
          justifyContent: "flex-start",
          alignItems: "flex-start",
          top: 25,
        }}>
          <Image source={require("../assets/movita.jpeg")}
            style={{
              width: 140,
              height: 60
            }} />
        </View>

        <View style={{
          justifyContent: "flex-end",
          alignItems: "flex-end",
          right: 15,
          bottom: 20
        }}>
          <TouchableOpacity style={{ justifyContent: "center", alignItems: "center", flexDirection: "row" }}
            onPress={handleLogout}>
            <Ionicons name="exit-outline" size={40} color="orange" />
          </TouchableOpacity>
        </View>
      </View>

      <View style={{ flex: 1 }}>
        {contentToShow === null ? (
          <Text>Menü içeriği seçilmedi.</Text>
        ) : (
          <View>
            {contentToShow}
          </View>
        )}
      </View>

      <View style={{
        backgroundColor: "#edebeb",
        width: 395,
        height: 70,
        flexDirection: "row",
      }}>
        <TouchableOpacity
          style={[
            styles.button,
            { backgroundColor: selectedButton === 'Bilgi' ? '#00ADEE' : '#edebeb', flexDirection: "column" },
          ]}
          onPress={() => {
            console.log("Bilgi öğesine tıklandı");
            handleButtonPress(<Information data={data}/>, 'Bilgi'); //eklendi
          }}
        >
          <Ionicons name="information-circle" size={30} color={selectedButton === 'Bilgi' ? 'white' : '#00ADEE'} />
          <Text style={[styles.buttonText, { color: selectedButton === 'Bilgi' ? 'white' : '#00ADEE' }]}>Bilgi</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.button,
            { backgroundColor: selectedButton === 'Harita' ? '#00ADEE' : '#edebeb', flexDirection: "column" },
          ]}
          onPress={() => {
            console.log("harita öğesine tıklandı");
            handleButtonPress(<Map />, 'Harita');
          }}
        >
          <MaterialCommunityIcons name="google-maps" size={30} color={selectedButton === 'Harita' ? 'white' : '#00ADEE'} />
          <Text style={[styles.buttonText, { color: selectedButton === 'Harita' ? 'white' : '#00ADEE' }]}>Harita</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.button,
            { backgroundColor: selectedButton === 'Ayarlar' ? '#00ADEE' : '#edebeb', flexDirection: "column" },
          ]}
          onPress={() => {
            console.log("Ayarlar öğesine tıklandı");
            handleButtonPress(<Settings />, 'Ayarlar');
          }}
        >
          <Ionicons name="settings" size={30} color={selectedButton === 'Ayarlar' ? 'white' : '#00ADEE'} />
          <Text style={[styles.buttonText, { color: selectedButton === 'Ayarlar' ? 'white' : '#00ADEE' }]}>Ayarlar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  button: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    margin: 5,
    borderRadius: 8,
    flexDirection: 'row',
  },
  buttonText: {
    color: "#00ADEE",
    fontWeight: "bold",
    fontSize: 14,
    marginLeft: 8,
    justifyContent: "center",
    alignItems: "center",
  },
});
