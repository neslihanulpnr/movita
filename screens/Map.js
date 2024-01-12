import React, { useState, useEffect } from "react";
import { StyleSheet, View, Text } from "react-native";
import MapView from "react-native-maps";
import moment from "moment";
import 'moment/locale/tr'; // Türkçe dil ayarı

export const Map = ({ data }) => {
  const [userData, setUserData] = useState([]);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        moment.locale('tr'); // Türkçe dil ayarı
  
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
  
        // API'den alınan güzergah bilgilerini kontrol et
        const filteredData = result.ret.filter(async (location) => { // async olarak işaretlendi
          const currentDay = moment().isoWeekday(); // Şuanki günün sayısal değeri
          const apiDay = moment(location.gun, "dddd").isoWeekday(); // API'den gelen günün sayısal değeri
  
          console.log(`API'den gelen gün: ${moment(location.gun, "dddd").format('dddd')}`);
          console.log(`Şuanki gün: ${moment().format('dddd')}`);
          
          const isDayMatching = apiDay === currentDay;
          const isTimeMatching = moment().isBetween(moment(location.seans.split("-")[0], "HH:mm"), moment(location.seans.split("-")[1], "HH:mm"));
  
          console.log(`Günler uyuşuyor mu: ${isDayMatching}`);
          console.log(`Saatler uyuşuyor mu: ${isTimeMatching}`);
  
          // Eğer günler ve saatler uyuşuyorsa ve araç plakası varsa
          if (isDayMatching && isTimeMatching && location.arac_plaka) {
            console.log(`Araç Plakası: ${location.arac_plaka}`);
  
            // Araç son konum API'sine istek yap
            const carLocationResponse = await fetch('http://www.movita.com.tr:8019/arac_sonkonum2', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
                'Authorization': 'sample_token1234'
              },
              body: JSON.stringify({ plaka: location.arac_plaka }) // Eğer API plaka bekliyorsa
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
  
    const intervalId = setInterval(() => {
      fetchUserData();
      console.log("Her 10 saniyede bir çağırıldı");
    }, 10000);

    return () => clearInterval(intervalId);
  }, [data]);
  return (
    <View>
      <View>
        <MapView style={styles.map}/>
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