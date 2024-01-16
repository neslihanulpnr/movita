import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, ActivityIndicator } from 'react-native';
import moment from "moment";

export const Information = ({ data }) => {
  const [userData, setUserData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://www.movita.com.tr:8019/personel_guzergah_listeleme', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'sample_token1234'
          },
          body: JSON.stringify({ user_id: data.ret.user_id })
        });
        const result = await response.json();
        console.log('API Response:', result.ret);
  
        // Tüm günleri içeren bir dizi oluştur
        const apiDays = result.ret.map(item => item.gun);
        console.log('API\'den gelen günler:', apiDays);
  
        // Şuanki günü al
        const currentDay = moment().format('dddd');
        console.log('Şuanki gün:', currentDay);
  
        // Her bir gün için kontrol yap
        const matchingDays = apiDays.map(apiDay => {
          const isDayMatching = apiDay === currentDay;
          console.log(`Gün: ${apiDay}, API'den gelen gün: ${apiDay}, Uyuşuyor mu: ${isDayMatching}`);
  
          return {
            day: apiDay,
            isDayMatching: isDayMatching
          };
        });
  
        // matchingDays dizisinde true olan günlerin indekslerini bulup, o günün seansına göre saat kontrolü yap
        const matchingIndexes = matchingDays.reduce((acc, item, index) => {
          if (item.isDayMatching) {
            acc.push(index);
          }
          return acc;
        }, []);
  
        // Şuanki saat aralığını al
        const currentHourMinute = moment().format('HH:mm');
  
        // Her bir eşleşen gün için saat kontrolü yap
        matchingIndexes.forEach(index => {
          const seans = result.ret[index].seans;
          const isTimeMatching = moment(currentHourMinute, 'HH:mm').isBetween(moment(seans.split("-")[0], 'HH:mm'), moment(seans.split("-")[1], 'HH:mm'));
          console.log(`Gün: ${matchingDays[index].day}, Seans: ${seans}, Saatler uyuşuyor mu: ${isTimeMatching}`);
        });
  
        setUserData(result.ret);
        setLoading(false); // Veri çekme tamamlandığında yüklemeyi kapat
      } catch (error) {
        console.error('Veri çekme hatası:', error);
      }
    };
  
    fetchData();
  }, [data]);
  

  return (
    <ScrollView>
      <View style={styles.tableContainer}>
        <View style={[styles.tableRow, styles.tableHeader]}>
          <Text style={styles.tableHeaderText}>PLAKA</Text>
          <Text style={styles.tableHeaderText}>GÜN</Text>
          <Text style={styles.tableHeaderText}>SEANS</Text>
        </View>
        {loading ? (
          <ActivityIndicator size="large" color="#0000ff" /> // Yüklenme animasyonu
        ) : (
          userData && userData.length > 0 ? (
            userData.map((item, index) => (
              <View key={index} style={styles.tableRow}>
                <Text style={styles.tableCell}>{item.arac_plaka}</Text>
                <Text style={styles.tableCell}>{item.gun}</Text>
                <Text style={styles.tableCell}>{item.seans}</Text>
              </View>
            ))
          ) : (
            <Text>Veri bulunamadı.</Text>
          )
        )}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  tableContainer: {
    margin: 1,
  },
  tableRow: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderColor: '#ccc',
    paddingVertical: 20,
  },
  tableHeader: {
    backgroundColor: "#00ADEE",
  },
  tableHeaderText: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    flex: 1,
    color: "lightgrey"
  },
  tableCell: {
    fontSize: 15,
    fontWeight: 'bold',
    textAlign: 'center',
    flex: 1,
  },
});

export default Information; 