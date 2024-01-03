import { useState } from "react";
import { StyleSheet, View, } from "react-native";
import MapView, { Marker } from "react-native-maps";

export const Map = () => {
  let [markers, setMarkers] = useState([
    {
      lat: 40.774021,
      long: 29.918631
    },
    {
      lat: 39.933365,
      long: 32.859741
    },
    {
      lat: 37.916248,
      long: 40.225590
    },
  ]);


  return (
    <View>
      <MapView
        style={styles.map}>
        {markers.map((e, i) => (
          <Marker 
          pinColor="yellow" 
          coordinate={{ latitude: e.lat, longitude: e.long }} key={i} />
        ))}

      </MapView>
    </View>
  );
}

const styles = StyleSheet.create({
  map: {
    width: "100%",
    height: "100%"
  },
});