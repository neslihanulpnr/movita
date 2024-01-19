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
              const { status } = await Location.requestForegroundPermissionsAsync();
              if (status !== 'granted') {
                console.error('Konum izni verilmedi');
                return false;
              }
              
                const location = await Location.getCurrentPositionAsync({});
                
                setCarLocation({
                  latitude: parseFloat(location.coords.latitude),
                  longitude: parseFloat(location.coords.longitude),
                });
    
                setUserLocation({
                  latitude: parseFloat(location.coords.latitude),
                  longitude: parseFloat(location.coords.longitude),
                });
    
                if (mapViewRef.current) {
                  mapViewRef.current.animateToRegion({
                    latitude: parseFloat(location.coords.latitude),
                    longitude: parseFloat(location.coords.longitude),
                    latitudeDelta: 0.05,
                    longitudeDelta: 0.05,
                  });
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
          initialRegion={{
            latitude: userLocation?.latitude || 39.9334,
            longitude: userLocation?.longitude || 32.8597,
            latitudeDelta: 0.05,
            longitudeDelta: 0.05,
          }}
        >
          {userLocation && (
            <Marker coordinate={userLocation} title="Mevcut Konum" pinColor="#00ADEE">
            </Marker>
          )}

          {carLocation && (
            <Marker coordinate={carLocation} title="Araç Konumu" >
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
