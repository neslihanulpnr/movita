import React, { useState, useEffect } from "react";
import { StyleSheet, View } from "react-native";
import MapView, { Marker } from "react-native-maps";

export const Map = ({ data }) => {
  const [userData, setUserData] = useState();
  let [markers, setMarkers] = useState([
    {
      //lat: userData?.hist_lat,
      //long: userData?.hist_long
    }
  ]);
  useEffect(() => {
    fetchData();
  }, []); // Boş dependency array ile sadece bir kere çalışmasını sağla

  const fetchData = () => {
    fetch('http://www.movita.com.tr:8019/arac_sonkonum2', {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'sample_token1234',
      },
      body: JSON.stringify({
        plaka: "1.44_PIZERO_YILDIRIM"
      })
    })
    .then(response => response.json())
    .then(data => {
      console.log("PLAKA :", data);
      setUserData(data);
      
    })
    .catch(error => {
      console.log("HATA :", error);
    });
  };

  return (
    <View>
      <MapView
        style={styles.map}>

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
