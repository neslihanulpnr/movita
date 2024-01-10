import React, { useState, useEffect } from "react";
import { StyleSheet, View } from "react-native";
import MapView from "react-native-maps";

export const Map = ({ data }) => {
  const [userData, setUserData] = useState([]);
  
  useEffect(() => {
    const fetchUserData = async () => {
      try {
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
        setUserData(result.ret);

        // Gün ve saat karşılaştırması
        const apiDay = result.ret && result.ret.gun; // API'den gelen gün bilgisi
        const apiHour = result.ret && result.ret.saat; // API'den gelen saat bilgisi
        const apiMinutes = result.ret && result.ret.dakika; // API'den gelen dakika bilgisi

        const currentDayNumber = new Date().getDay();
        const currentHour = new Date().getHours();
        const currentMinutes = new Date().getMinutes();

        // Gün ve saat karşılaştırması
        const isDayMatch = (typeof apiDay === 'number' && currentDayNumber === apiDay) ||
          (typeof apiDay === 'string' && apiDay.toLowerCase() === currentDay.toLowerCase());

        const isTimeMatch = currentHour === apiHour && currentMinutes === apiMinutes;

        // Gün ve saat eşleşiyorsa userData state'ini güncelle
        if (isDayMatch && isTimeMatch) {
          console.log('Günler ve saatler eşleşiyor');
          setUserData(result.ret);
        } else {
          console.log('Günler veya saatler eşleşmiyor');
        }

      } catch (error) {
        console.error('Error bilgi:', error);
      }
    };

    fetchUserData();
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