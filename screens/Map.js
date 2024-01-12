import React, { useState, useEffect } from "react";
import { StyleSheet, View, Text } from "react-native";
import MapView, {Marker} from "react-native-maps";
import moment from "moment";
import 'moment/locale/tr'; // Türkçe dil ayarı

export const Map = ({ data }) => {
  const [userData, setUserData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
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
          }

          return isDayMatching && isTimeMatching;
        });

        setUserData(filteredData);

      } catch (error) {
        console.error('Error bilgi:', error);
      }
    };

    fetchData();

    // Her 10 saniyede bir yenileme yapmak için setInterval kullanımı
    const intervalId = setInterval(() => {
      fetchData();
    }, 10000);

    // useEffect temizleme fonksiyonu
    return () => clearInterval(intervalId);
  }, [data]);

  
  return (
    <View>
      <View>
        <MapView style={styles.map}>
          
          
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