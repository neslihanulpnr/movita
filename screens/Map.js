import React, { useState, useEffect, useRef } from "react";
import { StyleSheet, View, Text, Image, ActivityIndicator } from "react-native";
import MapView, { Marker } from "react-native-maps";
import moment from "moment";
import 'moment/locale/tr'; // Türkçe dil ayarı
import MarkerImage from '../assets/marker2.png';

export const Map = ({ data }) => {
  const [userData, setUserData] = useState([]);
  const [userLocation, setUserLocation] = useState(null);
  const [isMapVisible, setMapVisible] = useState(false);
  const mapViewRef = useRef(null);
  const [loading, setLoading] = useState(true);

  const fetchUserData = async () => {
    try {
      moment.locale('tr');
      setLoading(true);
      const response = await fetch('http://www.movita.com.tr:8019/personel_guzergah_listeleme', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'sample_token1234'
        },
        body: JSON.stringify({ user_id: data && data.ret && data.ret.user_id })
      });

      const result = await response.json();
      console.log('bilgi API:', result.ret);

      const filteredData = result.ret.filter(async (location) => {
        const currentDay = moment().isoWeekday();
        const apiDay = moment(location.gun, "dddd").isoWeekday();

        const isDayMatching = apiDay === currentDay;
        const isTimeMatching = moment().isBetween(moment(location.seans.split("-")[0], "HH:mm"), moment(location.seans.split("-")[1], "HH:mm"));

        if (isDayMatching && isTimeMatching && location.arac_plaka) {
          const carLocationResponse = await fetch('http://www.movita.com.tr:8019/arac_sonkonum2', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': 'sample_token1234'
            },
            body: JSON.stringify({ plaka: location.arac_plaka })
          });

          const carLocationResult = await carLocationResponse.json();
          console.log('Araç son konum API yanıtı:', carLocationResult);

          if ('ret' in carLocationResult && 'konum_x' in carLocationResult.ret && 'konum_y' in carLocationResult.ret) {
            setUserLocation({
              latitude: parseFloat(carLocationResult.ret.konum_y),
              longitude: parseFloat(carLocationResult.ret.konum_x),
            });

            if (mapViewRef.current) {
              mapViewRef.current.animateToRegion({
                latitude: parseFloat(carLocationResult.ret.konum_y),
                longitude: parseFloat(carLocationResult.ret.konum_x),
                latitudeDelta: 0.05,
                longitudeDelta: 0.05,
              });
            }

            // Harita görünürlüğünü true olarak ayarla ve bir miktar gecikme ekle
            setTimeout(() => {
              setMapVisible(true);
              setLoading(false); 
              console.log("5 saniyede yenileniyor")
            }, 1); // Örneğin 500 milisaniye (0.5 saniye) bekleyebilirsiniz
          }
        }

        return isDayMatching && isTimeMatching;
      });

      if (filteredData.length > 0) {
        setUserData(filteredData);
      } else {
        // Koşullar sağlanmadığında haritayı gizle
        setMapVisible(false);
        setLoading(false);
        console.log('Uygun sefer bulunamadı.');
      }
    } catch (error) {
      console.error('Error bilgi:', error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUserData();
  }, [data]);

  return (
    <View>
      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : isMapVisible ? (
        <MapView
          ref={mapViewRef}
          style={styles.map}
          initialRegion={{
            latitude: userLocation?.latitude || 39.9334,
            longitude: userLocation?.longitude || 32.8597,
            latitudeDelta: 0.05,
            longitudeDelta: 0.05,
          }}
        >
          {userLocation && (
            <Marker coordinate={userLocation} title="">
              <Image source={require('../assets/marker2.png')} style={{ width: 60, height: 105 }} />
            </Marker>
          )}
        </MapView>
      ) : (
        <View style={{ alignItems: 'center', justifyContent: 'center' }}>
          <Text style={{ fontWeight: 'bold', fontSize: 30 }}>Uygun sefer bulunamadı.</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  map: {
    width: "100%",
    height: "100%"
  },
});