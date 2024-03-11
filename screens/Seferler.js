import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, ActivityIndicator, TouchableOpacity } from 'react-native';
import moment from "moment";
import { AntDesign } from '@expo/vector-icons';
import axios from 'axios';

export const Seferler = ({ data }) => {
  const [userData, setUserData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [matchingDays, setMatchingDays] = useState([]);
  const [matchingIndexes, setMatchingIndexes] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://www.movita.com.tr:8019/personel_guzergah_listesi', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'sample_token1234'
          },
          body: JSON.stringify({ user_id: data.ret.user_id })
        });
        const result = await response.json();
        console.log('API sefer:', result.ret);

        // Günleri pazartesiden cumaya sırala
        const daysInOrder = ['Pazartesi', 'Salı', 'Çarşamba', 'Perşembe', 'Cuma', 'Cumartesi', 'Pazar'];
        result.ret.sort((a, b) => daysInOrder.indexOf(a.gun) - daysInOrder.indexOf(b.gun));

        const apiDays = result.ret.map(item => item.gun);
        console.log('API\'den gelen günler:', apiDays);

        const currentDay = moment().format('dddd');
        console.log('Şuanki gün:', currentDay);

        
        const matchingIndexes = result.ret
        .map((location, index) => {
          const isDayMatching = location.gun === currentDay;
          console.log(`Gün: ${location.gun}, API'den gelen gün: ${location.gun}, Uyuşuyor mu: ${isDayMatching}`);
      
          const isTimeMatching = moment().isBetween(moment(location.seans.split("-")[0], "HH:mm"), moment(location.seans.split("-")[1], "HH:mm"), null, '[]');
          console.log(`Saatler uyuşuyor mu: ${isTimeMatching}`);
      
          return isDayMatching && isTimeMatching ? index : null;
        })
        .filter(index => index !== null);
      
      // Günleri kontrol et
      const isAnyDayMatching = matchingIndexes.length > 0;
      console.log(`Günler uyuşuyor mu: ${isAnyDayMatching}`);
      
      setUserData(result.ret);
      setMatchingIndexes(matchingIndexes);
      setLoading(false);
      } catch (error) {
        console.error('Veri çekme hatası:', error);
      }
    };

    fetchData();
  }, [data]);

const handleIptalButtonPress = async (index) => {
  const sefer = userData[index];
  const seferDay = sefer.gun;
  const seferSaatBaslangic = moment(sefer.seans.split("-")[0], "HH:mm");
  const seferSaatBitis = moment(sefer.seans.split("-")[1], "HH:mm");

  if (matchingDays.some(day => day.day === seferDay && day.isDayMatching) &&
    moment().isBetween(seferSaatBaslangic, seferSaatBitis)) {
    console.log("Bu gün ve saat için katılmayacağım butonuna basılamaz.");
    return;
  }

  console.log("Katılmayacağım");

  // Eğer uygun seferin olduğu bir zaman dilimindeyse, butona basma işlemini engelle
  if (matchingIndexes.includes(index)) {
    console.log("Uygun seferin olduğu bir zaman dilimindeyken butona basılamaz.");
    return;
  }

  try {
    // API çağrısını gerçekleştir
    const response = await axios.post('', {
      // Gerekli verileri gönder
      index: index,
      // Diğer verileri de gönderebilirsiniz
    });

    const updatedUserData = [...userData];
    updatedUserData[index].isPressed = !updatedUserData[index].isPressed;
    setUserData(updatedUserData);

    console.log("API başarıyla çağrıldı, kullanıcı verisi güncellendi.");
  } catch (error) {
    console.error("API çağrısı sırasında bir hata oluştu:", error);
  }
};


  const handleRoutePress = (index) => {
    if (matchingIndexes.includes(index)) {
    } else {
      console.log("Uygun sefer bulunamadı.");
    }
  };

  return (
    <ScrollView>
      <View style={styles.tableContainer}>
        <View style={[styles.tableRow, styles.tableHeader]}>
          <Text style={styles.tableHeaderText}>Plaka</Text>
          <Text style={styles.tableHeaderText}>Gün</Text>
          <Text style={styles.tableHeaderText}>Seans</Text>
          <Text style={styles.tableHeaderText}>Katılım</Text>
        </View>
        {loading ? (
          <ActivityIndicator size="large" color="#0000ff" />
        ) : (
          userData && userData.length > 0 ? (
            userData.map((item, index) => (
              <TouchableOpacity
                key={index}
                onPress={() => handleRoutePress(index)}
                style={[
                  styles.tableRow,
                  matchingIndexes.includes(index)
                    ? styles.matchingRow
                    : styles.nonMatchingRow
                ]}
              >
                <Text style={styles.tableCell}>{item.arac_plaka}</Text>
                <Text style={styles.tableCell}>{item.gun}</Text>
                <Text style={styles.tableCell}>{item.seans}</Text>
                <TouchableOpacity
                  onPress={() => handleIptalButtonPress(index)}
                  style={styles.tableCell}
                >
                  <View
                    style={{
                      width: 20,
                      height: 20,
                      backgroundColor: item.isPressed ? 'red' : '#00ADEE',
                      justifyContent: 'center',
                      alignItems: 'center',
                      left: 35,
                      borderRadius: 5
                    }}>
                    <Text><AntDesign name="close" size={20} color="black" /></Text>
                  </View>
                </TouchableOpacity>
              </TouchableOpacity>
            ))
          ) : (
            <Text>Veri bulunamadı.</Text>
          )
        )}
      </View>
    </ScrollView>
  );
};

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
    color: "white"
  },
  tableCell: {
    fontSize: 13,
    fontWeight: 'bold',
    textAlign: 'center',
    flex: 1,
  },
  cancelButton: {
    width: 20,
    height: 20,
    backgroundColor: "#00ADEE",
    justifyContent: 'center',
    alignItems: 'center',
    left: 35
  },
  matchingRow: {
    backgroundColor: 'lightgreen',
  },
  nonMatchingRow: {
    backgroundColor: "#0000"
  }
});

export default Seferler;