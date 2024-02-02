import React, { useState } from "react";
import { View, StyleSheet, TouchableOpacity, Text, Keyboard } from "react-native";
import { TextInput } from "react-native-gesture-handler";
import MapView, { Marker } from "react-native-maps";

export const Settings = ({data}) => {
  const [adress, setAdress] = useState({"il":"", "ilce":"","mahalle":"","sokak":""});
  const [showMap, setShowMap] = useState(false);
  const [location, setLocation] = useState(null);
  const [coordinates, setCoordinates] = useState([]);
  const [dragAdress,setDragAdress]=useState()

  const logEnteredInformation = async () => {
    try {
      console.log(adress);
      Keyboard.dismiss();
      setShowMap(true);
  
      // Adres bilgilerini kullanarak koordinatları al
      const location = await getLocationFromAddress(
        `${adress.mahalle} ${adress.sokak} ${adress.ilce} ${adress.il}`
      );
  
      setLocation(location);
  
      // Rota için durakları belirle (örnekte sabit bir dizi kullanıldı)
      const stops = [
        { latitude: location.latitude + 0.01, longitude: location.longitude + 0.01 },
        { latitude: location.latitude - 0.01, longitude: location.longitude - 0.01 },
      ];
      setCoordinates([location, ...stops]);
    } catch (error) {
      console.error("logEnteredInformation Hata:", error);
    }
  };
  
  const getLocationFromAddress = async (address) => {
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

  const handleMarkerDragEnd = (e) => {
    // Sürüklenen marker'ın son konumunu al
    const { latitude, longitude } = e.nativeEvent.coordinate;
    setDragAdress({ latitude, longitude });
    console.log("Sürüklenen Marker'ın Son Konumu:", { latitude, longitude });
  };

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
              latitude: 39.933365,
              longitude: 32.859741,
              latitudeDelta: 0.0922,
              longitudeDelta: 0.0421,
            }}
          >
            
            {location && (
              <Marker
                coordinate={location}
                draggable
                onDragEnd={(e) => handleMarkerDragEnd(e)}
               
              />)}
  
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
    padding: 10,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: 'black',
    paddingBottom: 5,
    marginBottom: 10,
  },

  input: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent:"center",
    width: 300,
    height: 35,
    borderWidth: 0.2,
    borderRadius: 2,
    marginBottom: 5,
  },
  map: {
    height: 570,
    width: 400,
    position: "absolute",
    top: 10
  },
  label: {
    marginRight: 10,
  },
  inputField: {
    flex: 1,
    marginLeft: 10,
  },
});