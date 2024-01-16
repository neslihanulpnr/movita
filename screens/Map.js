import React, { useState, useEffect } from "react";
import { StyleSheet, View, Text, Image, ActivityIndicator } from "react-native";
import MapView, { Marker } from "react-native-maps";
import moment from "moment";
import 'moment/locale/tr'; // Türkçe dil ayarı
import MarkerImage from '../assets/marker2.png';

export const Map = ({ data }) => {
  const [userData, setUserData] = useState([]);
  const [userLocation, setUserLocation] = useState(null);
  const [isMapVisible, setMapVisible] = useState(false);
  const [isLoading, setLoading] = useState(true); // Yükleniyor durumunu izlemek için state ekledik
  const mapViewRef = React.useRef(null);

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
  
        const carLocationResults = await Promise.all(result.ret.map(async (location) => {
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
  
              mapViewRef.current?.animateToRegion({
                latitude: parseFloat(carLocationResult.ret.konum_y),
                longitude: parseFloat(carLocationResult.ret.konum_x),
                latitudeDelta: 0.05,
                longitudeDelta: 0.05,
              });
  
              setMapVisible(true);
              setLoading(false); // Harita yüklendiğinde loading durumunu false yapın
              return true;
            }
          }
  
          return false;
        }));
  
        if (carLocationResults.some((result) => result)) {
          setUserData(carLocationResults); // Diziyi direkt set edin
        } else {
          setMapVisible(false);
          setLoading(false); // Eğer harita yüklenmediyse loading durumunu false yapın
        }
      } catch (error) {
        console.error('Error bilgi:', error);
        setLoading(false); // Hata oluştuğunda loading durumunu false yapın
      }
    };
  
    // İlk çalıştırmayı yap
    fetchUserData();
  
    // Daha sonra 10 saniyede bir haritayı güncelle
    const updateInterval = setInterval(fetchUserData, 10000);
    console.log("10 saniyede yenilendi")
    // Komponent unmount edildiğinde zamanlayıcıyı temizle
    return () => clearInterval(updateInterval);
  
  }, [data]);
  
  
  return (
    <View style={styles.container}>
      {isLoading ? (
        <ActivityIndicator style={styles.loading} size="large" color="#0000ff" />
      ) : (
        <>
          {isMapVisible && userLocation && (
            <MapView
              ref={mapViewRef}
              style={styles.map}
              initialRegion={{
                latitude: userLocation.latitude,
                longitude: userLocation.longitude,
                latitudeDelta: 0.05,
                longitudeDelta: 0.05,
              }}
            >
              <Marker
                coordinate={{
                  latitude: userLocation.latitude,
                  longitude: userLocation.longitude,
                }}
                title="Kullanıcı Konumu"
              >
                <Image
                  source={require('../assets/marker2.png')}
                  style={{ width: 60, height: 105 }}
                />
              </Marker>
            </MapView>
          )}
        </>
      )}
    </View>
  );
};


const styles = StyleSheet.create({
  map: {
    width: "100%",
    height: "100%"
  },
  loading: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});