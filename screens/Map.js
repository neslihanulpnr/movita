import React, { useState, useEffect } from "react";
import { StyleSheet, View, image } from "react-native";
import MapView, { Marker } from "react-native-maps";

export const Map = ({ data }) => {
  const [userData, setUserData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://www.movita.com.tr:8019/personel_guzergah_listeleme', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'sample_token1234'
          },
          body: JSON.stringify({ user_id: data && data.ret && data.ret.user_id })
        });
        const result = await response.json();
        console.log('API Response:', result.ret);
        setUserData(result.ret);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, [data]);

  const turkeyRegion = {
    latitude: 39.9334,
    longitude: 32.8597,
    latitudeDelta: 2,
    longitudeDelta: 2
  };

  const markers = [
    { coordinates: { latitude: 39.9334, longitude: 32.8629 } },
    { coordinates: { latitude: 39.9434, longitude: 32.8267 } },
    { coordinates: { latitude: 39.9097, longitude: 32.8401 } },
    { coordinates: { latitude: 39.8972, longitude: 32.8024 } },
  ];

  return (
    <View>
      <View>
        <MapView style={styles.map} region={turkeyRegion}>
          {markers.map((marker, index) => (
            <Marker
              key={index}
              coordinate={marker.coordinates}/>
              
          ))}
        </MapView>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  map: {
    width: "100%",
    height: "100%"
  },
});