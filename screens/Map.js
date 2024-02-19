import React, { useState, useEffect, useRef } from "react";
import { StyleSheet, View, Text, Image, Button } from "react-native";
import MapView, { Marker } from "react-native-maps";
import moment from "moment";
import 'moment/locale/tr'; // Türkçe dil ayarı
import * as Location from 'expo-location';
import MapViewDirections from 'react-native-maps-directions';
import Modal from "react-native-modal";


export const Map = ({ data }) => {
  const [userData, setUserData] = useState([]);
  const [userId, setUSerId] = useState(data.ret.user_id)
  const [userLocation, setUserLocation] = useState(null);
  const [carLocation, setCarLocation] = useState(null);
  const [durakLocation, setDurakLocation] = useState(null);
  const [isMapVisible, setMapVisible] = useState(false);
  const [distance, setDistance] = useState(null);
  const [distanceCar, setDistanceCar] = useState(null);
  const [duration, setDuration] = useState(null);
  const [durationCar, setDurationCar] = useState(null);
  const mapViewRef = useRef(null);
  const [isModalVisible, setModalVisible] = useState(false);
  const [loading, setLoading] = useState(true);
  const toastRef = useRef(null);

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
    handleMarkerPress()
  };

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


        const filteredData = result.ret.filter(async (location) => {
          const translateDayToISO = (day) => {
            const turkishDays = ['Pazartesi', 'Salı', 'Çarşamba', 'Perşembe', 'Cuma', 'Cumartesi', 'Pazar'];
            const index = turkishDays.indexOf(day);
            return index !== -1 ? index + 1 : null;
          };
          
          const currentDay = moment().isoWeekday();
          const apiDay = translateDayToISO(location.gun);
          

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
            });
          }

          return isDayMatching && isTimeMatching;
        });

        if (filteredData.length > 0) {
          setUserData(filteredData);
          setMapVisible(true);
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
      console.error('Konumunuz alınamadı. Konumunuzu açın. ');
      setLoading(false);
    }
  };
  useEffect(() => {


    fetchUserData();

    const intervalId = setInterval(() => {
      fetchUserData();

    }, 20000);
    console.log("yenilendi")
    return () => clearInterval(intervalId);
  }, [data]);


  const fetchDurakData = async () => {
    console.log(JSON.stringify({ "kullanici_id": userId }))
    try {
      const response = await fetch('http://www.movita.com.tr:8019/personel_durak_getir', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'sample_token1234'
        },
        body: JSON.stringify({ "kullanici_id": userId }),
      });

      const result = await response.json();
      const durakLocationCoords = {
        latitude: +result.ret.konum_lat,
        longitude: +result.ret.konum_lng,
      };
      setDurakLocation(durakLocationCoords);
      console.log("durak :", result.ret)
    } catch (error) {
      console.error('Durak konumu alınamadı. Hata:', error);
    }
  };

  useEffect(() => {
    fetchDurakData()
  }, [])
  const handleMarkerPress = async () => {
    const apiKey = 'AIzaSyCiIBWjjvR0EWMACPDWf3IkazQlH17K0CE';
    const carApiURL = `https://maps.googleapis.com/maps/api/directions/json?origin=${carLocation.latitude},${carLocation.longitude}&destination=${+durakLocation.latitude},${+durakLocation.longitude}&mode=driving&key=${apiKey}&language=tr`;
    const walkingApiURL = `https://maps.googleapis.com/maps/api/directions/json?origin=${userLocation.latitude},${userLocation.longitude}&destination=${+durakLocation.latitude},${+durakLocation.longitude}&mode=walking&key=${apiKey}&language=tr`;

    try {
      const responseWalking = await fetch(walkingApiURL);
      const resultWalking = await responseWalking.json();
      if (resultWalking.routes.length > 0 && resultWalking.routes[0].legs.length > 0) {
        const leg = resultWalking.routes[0].legs[0];
        setDistance(leg.distance.text);
        setDuration(leg.duration.text);
      }

      const responseCar = await fetch(carApiURL);
      const resultCar = await responseCar.json();
      if (resultCar.routes.length > 0 && resultCar.routes[0].legs.length > 0) {
        const leg = resultCar.routes[0].legs[0];
        setDistanceCar(leg.distance.text);
        setDurationCar(leg.duration.text);
      }

      // Toast.show({
      //   type: 'info',
      //   position: 'bottom',
      //   text1: Personelin Durağa yürüme mesafesi tahmini ${distance}\nPersonelin Durağa yürüme süresi tahmini ${duration}\nPersonelin Durağa araçla mesafesi tahmini ${distanceCar}\nPersonelin Durağa araçla süresi tahmini ${durationCar},
      //   visibilityTime: 5000,
      // });

      console.log('duration:', duration);
      console.log('durationCar:', durationCar);


    } catch (error) {
      console.log('API hatası:', error);
      // Hata durumunda kullanıcıya bilgi verebilir veya başka bir işlem yapabilirsiniz.
    }
  };

  return (
    <View>
      {isMapVisible ? (
        <><MapView
          ref={mapViewRef}
          style={styles.map}
          showsUserLocation={false}
          initialRegion={{
            latitude: carLocation?.latitude || userLocation?.latitude,
            longitude: carLocation?.longitude || userLocation?.longitude,
            latitudeDelta: 0.05,
            longitudeDelta: 0.05,
          }}
        >
          {userLocation && (
            <Marker coordinate={userLocation} title="Kullanıcı Konumu" pinColor="#00ADEE" />
          )}
          {durakLocation && (
            <Marker coordinate={durakLocation} title="Durak Konumu" pinColor="red" onPress={toggleModal} />
          )}

          {carLocation && (
            <Marker coordinate={carLocation} title="Araç Konumu" anchor={{ x: 0.5, y: 0.7 }}>
              <Image source={require('../assets/marker2.png')} style={{ width: 60, height: 105 }} />
            </Marker>
          )}

          {carLocation && userLocation && (
            <MapViewDirections
              origin={userLocation}
              destination={durakLocation}
              apikey="AIzaSyBxChzeUAytU-FcR8EkvX508ZXbbvpqDjw"
              strokeWidth={4}
              strokeColor="#00ADEE"
            />
          )}
        </MapView>
          <Modal isVisible={isModalVisible} animationIn="slideInUp" animationOut="slideOutDown">
            <View style={{ justifyContent: "flex-start", alignItems: "left", backgroundColor: "white", paddingHorizontal: 10, paddingVertical: 10, borderRadius: 10 }}>
              <Text style={{ fontWeight: "bold", fontSize: 16, }}>Personelin tahmini ;</Text>
              <Text style={styles.modalText}>Durağa yürüme süresi : {duration}</Text>
              <Text style={styles.modalText}>Durağa yürüme mesafesi : {distance}</Text>
              <Text style={{ fontWeight: "bold", fontSize: 16, }}>Aracın tahmini ;</Text>
              <Text style={styles.modalText}>Durağa varış süresi : {durationCar}</Text>
              <Text style={styles.modalText}>Durağa mesafesi : {distanceCar}</Text>
              <Button title="Tamam" onPress={toggleModal} />
            </View>
          </Modal>
        </>
      ) : (
        !loading && (
          <View style={{ alignItems: 'center', justifyContent: 'center' }}>
          </View>
        )
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  map: {
    width: "100%",
    height: "100%"
  },
  modalText: {
    fontSize: 16,
    marginBottom: 10,
  },
});