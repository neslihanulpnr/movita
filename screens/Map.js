import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, ActivityIndicator } from "react-native";
import MapView, { Marker } from "react-native-maps";

export const Map = ({ data }) => {
  const [markers, setMarkers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchData(data);
    const intervalId = setInterval(() => {
      fetchData(data);
      console.log("Her 10 saniyede bir çağırıldı");
    }, 10000);

    return () => clearInterval(intervalId);
  }, [data]);

  const fetchData = (data) => {
    setIsLoading(true);

    fetch('http://www.movita.com.tr:8019/arac_sonkonum2', {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'sample_token1234',
      },
      body: JSON.stringify({
        plaka: "YBAK_PLAKA2"
      })
    })
      .then(response => response.json())
      .then(data => {
        console.log("API Response:", data);
        setMarkers(data.ret);
      })
      .catch(error => {
        console.log("Hata:", error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };
  return (
    <View>
    {markers === undefined ? (
      <Text>Veri yükleniyor...</Text>
    ) : (
          <View>
            <MapView
            style={styles.map}
            region={{
              latitude: markers && markers.length === 1 ? markers[0].latitude : 40.774021,
              longitude: markers && markers.length === 1 ? markers[0].longitude : 29.918631,
              latitudeDelta: 5, // Ölçek faktörlerini ayarlayabilirsiniz
              longitudeDelta: 5, // Ölçek faktörlerini ayarlayabilirsiniz
            }}>    
            
            <Marker coordinate={{latitude : 40.774021,longitude:29.918631}}/>  
        
          </MapView>
           
          </View>

    )}
  </View>
  
  );
}

const styles = StyleSheet.create({
  map: {
    width: "100%",
    height: "100%"
  },
});