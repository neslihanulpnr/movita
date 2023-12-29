import React from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, View, } from "react-native";
import MapView from "react-native-maps";

export const Map = () => {
  
  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <MapView
        style={styles.map}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  map: {
    width: 700,
    height: 900
  },
});
