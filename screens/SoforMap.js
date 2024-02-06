import { View, Text, StyleSheet, Linking, TouchableOpacity, Image } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import MapView, { Marker, Polyline } from 'react-native-maps';
import * as Location from 'expo-location';
import MapViewDirections from 'react-native-maps-directions';

export default function SoforMap({data}) {
    const [userLocation, setUserLocation] = useState(null);
    const [soforDurak, setSoforDurak] = useState([]);

    const sofor_durak_get = async () => {
        
          const response = await fetch('http://www.movita.com.tr:8019/sofor_guzerhah_listesi', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': 'sample_token1234'
            },
            body: JSON.stringify({ user_id: "" })
          });
      
          const result = await response.json();
          console.log(result.ret)
          setSoforDurak(result.ret);
          console.log("sofor", soforDurak);
        
      }
      
      useEffect(() => {
        sofor_durak_get()
      }, []);
    
    useEffect(() => {
        const getUserLocation = async () => {
          try {
            const { status } = await Location.requestForegroundPermissionsAsync();
    
            if (status !== 'granted') {
              console.log('Konum izni verilmedi.');
              return;
            }
    
            const location = await Location.getCurrentPositionAsync({});
            setUserLocation({
              latitude: location.coords.latitude,
              longitude: location.coords.longitude,
            });
          } catch (error) {
            console.error('Konum alınamadı:', error);
          }
        };
    
        getUserLocation();
      }, []);
      const coordinates = [
        { latitude: userLocation?.latitude, longitude: userLocation?.longitude },
        ...(soforDurak || []),
      ];
      console.log(coordinates)
      const openGoogleMaps = () => {
        if (soforDurak.length > 0) {
          const waypoints = soforDurak.map(coord => `${coord.latitude},${coord.longitude}`).join('|');
          const destination = `${soforDurak[soforDurak.length - 1].latitude},${soforDurak[soforDurak.length - 1].longitude}`;
          const url = `https://www.google.com/maps/dir/?api=1&origin=${userLocation.latitude},${userLocation.longitude}&waypoints=${waypoints}&destination=${destination}`;
          Linking.openURL(url);
        }
      };
  return (
    <View>
    {userLocation && (
        <MapView
          style={styles.map}
          initialRegion={{
            latitude: userLocation.latitude,
            longitude: userLocation.longitude,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
        >
          <Marker coordinate={userLocation} title="Sofor Konumunuz" anchor={{ x: 0.5, y: 0.7 }}>
          <Image source={require('../assets/marker2.png')} style={{ width: 60, height: 105 }} />
          </Marker>
          
        {soforDurak?.map((coord, index) => (
          <Marker
            key={index}
            coordinate={coord}
            title={`Durak ${index + 1}`}
            pinColor="#00ADEE"
            
          />
        ))}
        <MapViewDirections
            origin={userLocation}
            waypoints={soforDurak}
            destination={soforDurak[soforDurak.length - 1]}
            apikey="AIzaSyBxChzeUAytU-FcR8EkvX508ZXbbvpqDjw"
            strokeWidth={3}
            strokeColor="blue"
          />
        </MapView>
      )}
      <TouchableOpacity style={styles.button} onPress={openGoogleMaps}>
        <Text style={styles.buttonText}>Yol Tarifine Başla</Text>
      </TouchableOpacity>
  </View>
  )
}

const styles = StyleSheet.create({
    map: {
      width: "100%",
      height: "90%"
    },
      button: {
        backgroundColor: '#F7941E',
        padding: 10,
        borderRadius: 5,
        margin: 10,
        alignItems: 'center',
      },
      buttonText: {
        color: 'white',
        fontWeight: 'bold',
      },
  });