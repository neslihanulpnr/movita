import React, { useState, useEffect } from "react";
import { StyleSheet, View, Text, Image } from "react-native";
import MapView, { Marker } from "react-native-maps";
import moment from "moment";
import 'moment/locale/tr'; // Türkçe dil ayarı
import MarkerImage from '../assets/marker2.png';

export const Map = ({ data }) => {
  const [userData, setUserData] = useState([]);
  const [userLocation, setUserLocation] = useState(null);
  const [carLocationResult, setCarLocationResult] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        moment.locale('tr');
  
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
  
          console.log(`API'den gelen gün: ${moment(location.gun, "dddd").format('dddd')}`);
          console.log(`Şuanki gün: ${moment().format('dddd')}`);
  
          const isDayMatching = apiDay === currentDay;
          const isTimeMatching = moment().isBetween(moment(location.seans.split("-")[0], "HH:mm"), moment(location.seans.split("-")[1], "HH:mm"));
  
          console.log(`Günler uyuşuyor mu: ${isDayMatching}`);
          console.log(`Saatler uyuşuyor mu: ${isTimeMatching}`);
  
          if (isDayMatching && isTimeMatching && location.arac_plaka) {
            console.log(`Araç Plakası: ${location.arac_plaka}`);
  
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
  
              // Zoom yapmak için animateToRegion fonksiyonunu kullan
              mapViewRef.current.animateToRegion({
                latitude: parseFloat(carLocationResult.ret.konum_y),
                longitude: parseFloat(carLocationResult.ret.konum_x),
                latitudeDelta: 0.05,
                longitudeDelta: 0.05,
              });
            }
          }
  
          return isDayMatching && isTimeMatching;
        });
  
        setUserData(filteredData);
      } catch (error) {
        console.error('Error bilgi:', error);
      }
    };
  
    fetchUserData();
  }, [data]);
  

  // MapView referansını oluştur
  const mapViewRef = React.useRef(null);

  return (
    <View style={styles.container}>
      <MapView
        ref={mapViewRef}
        style={styles.map}
        initialRegion={{
          latitude: userLocation?.latitude || 39.9334, // Varsayılan olarak Türkiye'nin yaklaşık merkezi
          longitude: userLocation?.longitude || 32.8597,
          latitudeDelta: 8,
          longitudeDelta: 8,
        }}
      >
        {userLocation && (
          <Marker
            coordinate={{
              latitude: userLocation.latitude,
              longitude: userLocation.longitude,
            }}
            title=""
            description=""
          >
            <Image
              source={require('../assets/marker2.png')}
              style={{ width: 60, height: 105 }}
            />
          </Marker>
        )}
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