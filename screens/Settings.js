import React, { useEffect, useState } from "react";
import { View, StyleSheet, Image } from "react-native";
import MapView, { Marker } from "react-native-maps";

export const Settings = ({ data }) => {
  const [driverRoutes, setDriverRoutes] = useState([]);
  const [mapRegion, setMapRegion] = useState({
    latitude: 0,
    longitude: 0,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch(
        'http://www.movita.com.tr:8019/sofor_guzerhah_listesi',
        {
          method: "POST",
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'sample_token1234',
          },
          body: JSON.stringify({
            user_id: 1088,
          }),
        }
      );

      const result = await response.json();

      console.log("Sofor Güzergah Listesi:", result);

      if (result && result.ret) {
        setDriverRoutes(result.ret);

        // Güncellenmiş koordinatları kullanarak mapRegion'ı güncelle
        if (result.ret.length > 0) {
          setMapRegion({
            latitude: result.ret[0][0],
            longitude: result.ret[0][1],
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          });
        }
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  return (
    <View>
    <MapView style={styles.map} region={mapRegion}>
      {driverRoutes.map((coordinate, index) => (
        <Marker
          key={index}
          coordinate={{
            latitude: coordinate[0],
            longitude: coordinate[1],
          }}
          title={`güzergah ${index + 1}`}
        >
          <Image source={require('../assets/marker2.png')} style={{ width: 60, height: 105 }} />
        </Marker>
      ))}
    </MapView>
  </View>
  );
};

const styles = StyleSheet.create({
  map: {
    width: "100%",
    height: "100%"
  },
});

export default Settings;
