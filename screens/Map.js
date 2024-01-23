import React, { useState, useEffect, useRef } from "react";
import { StyleSheet, View, Text, Image, ActivityIndicator } from "react-native";
import MapView, { Marker } from "react-native-maps";
import moment from "moment";
import 'moment/locale/tr'; // Türkçe dil ayarı
import * as Location from 'expo-location';

export const Map = ({ data }) => {
  const [userData, setUserData] = useState([]);
  const [userLocation, setUserLocation] = useState(null);
  const [carLocation, setCarLocation] = useState(null);
  const [isMapVisible, setMapVisible] = useState(false);
  const mapViewRef = useRef(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        moment.locale('tr');
        setLoading(true);

        // Kullanıcı konum iznini iste
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
          console.error('Konum izni verilmedi.');
          setLoading(false);
          return;
        }

        // Kullanıcı konumunu al
        let location = await Location.getCurrentPositionAsync({});
        const userLocationCoords = {
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
        };
        setUserLocation(userLocationCoords);
        console.log(userLocation)

        const userId = data && data.ret && data.ret.user_id;

        if (userId) {
          const response = await fetch('http://www.movita.com.tr:8019/personel_guzergah_listeleme', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': 'sample_token1234'
            },
            body: JSON.stringify({ user_id: userId })
          });

          const result = await response.json();
          console.log('bilgi API:', result.ret);

          const filteredData = result.ret.filter(async (location) => {
            const currentDay = moment().isoWeekday();
            const apiDay = moment(location.gun, "dddd").isoWeekday();

            const isDayMatching = apiDay === currentDay;
            const isTimeMatching = moment().isBetween(moment(location.seans.split("-")[0], "HH:mm"), moment(location.seans.split("-")[1], "HH:mm"));

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
                setCarLocation({
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
              }

              setTimeout(() => {
                setMapVisible(true);
                setLoading(false);
              }, 1);
            }

            return isDayMatching && isTimeMatching;
          });

          if (filteredData.length > 0) {
            setUserData(filteredData);
          } else {
            setMapVisible(false);
            setLoading(false);
            console.log('Uygun sefer bulunamadı.');
          }
        } else {
          setMapVisible(true);
          setLoading(false);
          console.log('Kullanıcı ID\'si bulunamadı. Harita yükleniyor.');
        }
      } catch (error) {
        console.error('Error bilgi:', error);
        setLoading(false);
      }
    };

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
        showsUserLocation={false} // Kullanıcı konumunu göster
        initialRegion={{
          latitude: carLocation?.latitude || userLocation?.latitude ,
          longitude: carLocation?.longitude || userLocation?.longitude ,
          latitudeDelta: 0.05,
          longitudeDelta: 0.05,
        }}> 
      
        {/* Kullanıcının konumunu göstermek için yeni bir Marker ekleyin */}
        {userLocation && (
          <Marker coordinate={userLocation} title="Kullanıcı Konumu" pinColor="#00ADEE">
            <Image source={require('../assets/marker2.png')} style={{ width: 60, height: 105 }} />
          </Marker>
        )}
      
        {carLocation && (
          <Marker coordinate={carLocation} title="Araç Konumu">
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
