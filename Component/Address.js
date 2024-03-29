import React, { useState, useEffect } from "react";
import { View, StyleSheet, TouchableOpacity, Text, Keyboard } from "react-native";
import { TextInput } from "react-native-gesture-handler";
import MapView, { Marker } from "react-native-maps";
import Toast from 'react-native-toast-message';

export const Address = ({ data }) => {
  
  const [adress, setAdress] = useState({ "il": "", "ilce": "", "mahalle": "", "sokak": "" });
  const [showMap, setShowMap] = useState(false);
  const [location, setLocation] = useState(null);
  const [coordinates, setCoordinates] = useState([]);
  const [dragAdress, setDragAdress] = useState();
  const [personelData, setPersonelData] = useState(null);  

  console.log("userid-adres :", data.ret.user_id)
  const logEnteredInformation = async () => {
    try {
      console.log(adress);
      Keyboard.dismiss();
      setShowMap(true);

      const location = await getLocationFromAddress(
        `${adress.mahalle} ${adress.sokak} ${adress.ilce} ${adress.il}`,
        data.ret.user_id
      );

      setLocation(location);

      const stops = [
        { latitude: location.latitude + 0.01, longitude: location.longitude + 0.01 },
        { latitude: location.latitude - 0.01, longitude: location.longitude - 0.01 },
      ];
      setCoordinates([location, ...stops]);
    } catch (error) {
      console.error("logEnteredInformation Hata:", error);
    }
  };

  const getLocationFromAddress = async (address, userId) => {
    try {
      const apiKey = "AIzaSyBxChzeUAytU-FcR8EkvX508ZXbbvpqDjw";
      const response = await fetch(
        `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
          address
        )}&key=${apiKey}`
      );

      const result = await response.json();

      if (result.results && result.results.length > 0) {
        const { lat, lng } = result.results[0].geometry.location;

        return { latitude: lat, longitude: lng };
      } else {
        throw new Error("Konum bulunamadı.");
      }
    } catch (error) {
      console.error("getLocationFromAddress Hata:", error);
      throw error;
    }
  };

  const handleMarkerDragEnd = async (e) => {
    try {
      // Sürüklenen marker'ın son konumunu al
      const { latitude, longitude } = e.nativeEvent.coordinate;
      setDragAdress({ latitude, longitude });
      console.log("Sürüklenen Marker'ın Son Konumu:", { latitude, longitude });
  
      // API'den mevcut veriyi çek
      const responseData = await fetchDataFromAPI();
  
      const personelId = responseData.ret.id;
  
      // API'ye veriyi gönder
      await sendLocationToAPI(latitude, longitude, personelId);
  
      // API güncellemesi başarılı olduktan sonra, API'den yeni veriyi çek ve state'i güncelle
      const updatedData = await fetchDataFromAPI();
  
      const expectedLatitude = +updatedData.ret.konum_lat;
      const expectedLongitude = +updatedData.ret.konum_lng;
  
      console.log("API'ye gönderilen konum:", { latitude, longitude });
      console.log("apideki konum:", { expectedLatitude, expectedLongitude });
  
      Toast.show({
        type: 'success',
        text1: 'Başarılı!',
        text2: 'İşlem başarıyla gerçekleştirildi.',
        visibilityTime: 2000,
        position: 'bottom',
      });
    } catch (error) {
      console.error("handleMarkerDragEnd Hata:", error);
    }
  };
  

  const sendLocationToAPI = async (latitude, longitude, personelId,) => {
    try {
      if (personelId && latitude && longitude) {
        console.log("API'ye gönderilen istek verisi:", JSON.stringify({
          personelId,
          latitude,
          longitude,
        }));
  
        const apiUrl = "http://www.movita.com.tr:8019/edit_personel_konum";
  
        const response = await fetch(apiUrl, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'sample_token1234',
          },
          body: JSON.stringify({
            personelId,
            latitude,
            longitude,
          }),
        });
  
        const responseData = await response.json();
  
        console.log("API Yanıtı:", responseData);
  
        if (responseData && responseData.status === "ok" && responseData.ret === "konum basariyla guncellendi") {
          console.log("Konum başarıyla kaydedildi.");
        } else {
          console.error("Konum kaydedilemedi.");
        }
      } else {
        console.error("API'ye gönderilen konum bilgisi eksik veya geçersiz.");
      }
    } catch (error) {
      console.error("sendLocationToAPI Hata:", error);
      throw error;
    }
  };

  const fetchDataFromAPI = async () => {
    try {
      const apiUrl = 'http://www.movita.com.tr:8019/personel_getir_by_kullanici_id';
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'sample_token1234',
        },
        body: JSON.stringify({
          kullanici_id: data.ret.user_id,
        }),
      });
  
      if (!response.ok) {
        throw new Error(`HTTP hata! Durum: ${response.status} - ${response.statusText}`);
      }
  
      const responseData = await response.json();
      console.log("API Yanıtı:", responseData.ret);
  
      if (responseData.ret && responseData.ret.id) {
        const personelId = responseData.ret.id;
        console.log("Personel ID :", personelId);

        if (responseData.ret.konum_lat && responseData.ret.konum_lng) {
          const personelLocation = {
            latitude: +responseData.ret.konum_lat,
            longitude: +responseData.ret.konum_lng,
          };
          setLocation(personelLocation);
          setShowMap(true);
          console.log(showMap);
  
        } else {
          console.error("API yanıtında beklenen konum bilgileri eksik");
        }
      } else {
        console.error("API yanıtında beklenen 'id' bilgisi eksik");
      }

      return responseData;
    } catch (error) {
      console.error("fetchDataFromAPI Hata:", error);
      throw error;
    }
  };
  
  useEffect(() => {
    fetchDataFromAPI();
  }, []);
  
  return (
    <View>
      <View style={styles.inputContainer2}>
        <View style={styles.inputContainer}>
          <TextInput
            placeholder="İl"
            placeholderTextColor={"gray"}
            style={styles.inputField}
            value={adress.il}
            onChangeText={(text) => setAdress({ ...adress, il: text })}
          />
        </View>

        <View style={styles.inputContainer}>
          <TextInput
            placeholder="İlçe"
            placeholderTextColor={"gray"}
            style={styles.inputField}
            value={adress.ilce}
            onChangeText={(text) => setAdress({ ...adress, ilce: text })}
          />
        </View>

        <View style={styles.inputContainer}>
          <TextInput
            placeholder="Mahalle"
            placeholderTextColor={"gray"}
            style={styles.inputField}
            value={adress.mahalle}
            onChangeText={(text) => setAdress({ ...adress, mahalle: text })}
          />
        </View>

        <View style={styles.inputContainer}>
          <TextInput
            placeholder="Sokak"
            placeholderTextColor={"gray"}
            style={styles.inputField}

            value={adress.sokak}
            onChangeText={(text) => setAdress({ ...adress, sokak: text })}
          />
        </View>

        <TouchableOpacity
          style={{
            backgroundColor: "#00ADEE",
            padding: 10,
            borderRadius: 5,
            width: 170,
            height: 40,
          }}
          onPress={() => {
            logEnteredInformation();
          }}
        >
          <Text
            style={{
              color: "white",
              fontWeight: "bold",
            }}
          >
            Harita üzerinde göster
          </Text>
        </TouchableOpacity>
      </View>

      {showMap && (
        <View>
          <MapView
            style={styles.map}
            initialRegion={{
              latitude: location.latitude,
              longitude: location.longitude,
              latitudeDelta: 0.0922,
              longitudeDelta: 0.0421,
            }}
          >
            {location && (
              <Marker
                coordinate={location}
                draggable
                onDragEnd={(e) => handleMarkerDragEnd(e)}
              />
            )}
          </MapView>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  inputContainer2: {
    alignItems: "center",
    justifyContent: "center",
    top: 5
    
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
  },

  input: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    width: 300,
    height: 35,
    borderWidth: 0.2,
    borderRadius: 2,
    marginBottom: 5,
  },
  map: {
    height: 570,
    width: 420,
    position: "absolute",
    left: -100,
    top: 25
  },
  label: {
    marginRight: 10,
  },
  inputField: {
    flexDirection: 'row',
    alignItems: 'center',
    width: 250,
    height: 45,
    padding: 7,
    borderWidth: 0.1,
    borderRadius: 1
  },
});

export default Address;