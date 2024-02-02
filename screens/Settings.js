import React, { useState } from "react";
import { View, StyleSheet, TouchableOpacity, Text } from "react-native";
import { TextInput } from "react-native-gesture-handler";
import MapView, { Marker } from "react-native-maps";

export const Settings = () => {
  const [ilValue, setIlValue] = useState("");
  const [ilceValue, setIlceValue] = useState("");
  const [mahalleValue, setMahalleValue] = useState("");
  const [sokakValue, setSokakValue] = useState("");
  const [showMap, setShowMap] = useState(false);

  const logEnteredInformation = () => {
    console.log("Girilen Bilgiler:");
    console.log("İl:", ilValue);
    console.log("İlçe:", ilceValue);
    console.log("Mahalle:", mahalleValue);
    console.log("Sokak:", sokakValue);
    setShowMap(true);
  };

  return (
    <View>
      <View style={styles.inputContainer}>
        <View style={styles.input}>
          <TextInput
            placeholder="İl"
            placeholderTextColor={"gray"}
            style={{ flex: 1, marginLeft: 10 }}
            value={ilValue}
            onChangeText={(text) => setIlValue(text)}
          />
        </View>

        <View style={styles.input}>
          <TextInput
            placeholder="İlçe"
            placeholderTextColor={"gray"}
            style={{ flex: 1, marginLeft: 10 }}
            value={ilceValue}
            onChangeText={(text) => setIlceValue(text)}
          />
        </View>

        <View style={styles.input}>
          <TextInput
            placeholder="Mahalle"
            placeholderTextColor={"gray"}
            style={{ flex: 1, marginLeft: 10 }}
            value={mahalleValue}
            onChangeText={(text) => setMahalleValue(text)}
          />
        </View>

        <View style={styles.input}>
          <TextInput
            placeholder="Sokak"
            placeholderTextColor={"gray"}
            style={{ flex: 1, marginLeft: 10 }}
            value={sokakValue}
            onChangeText={(text) => setSokakValue(text)}
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
            <Marker
              coordinate={{ latitude: 39.933365, longitude: 32.859741 }}
              title=""
            />
          </MapView>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    alignItems: "center",
    justifyContent: "center",
    padding: 10,
  },
  input: {
    flexDirection: "row",
    alignItems: "center",
    width: 300,
    height: 55,
    padding: 15,
    borderWidth: 0.2,
    borderRadius: 2,
    margin: 5,
  },
  map: {
    height: 370,
    width: 400,
    position: "absolute",
    top: 10
  },
});