import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, ActivityIndicator, TouchableOpacity } from 'react-native';
import moment from "moment";
import { useNavigation } from '@react-navigation/native';

export const Seferler = ({ data }) => {
  const [userData, setUserData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [matchingDays, setMatchingDays] = useState([]);
  const [matchingIndexes, setMatchingIndexes] = useState([]);
  const navigation = useNavigation();

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

        // Günleri pazartesiden cumaya sırala
        const daysInOrder = ['Pazartesi', 'Salı', 'Çarşamba', 'Perşembe', 'Cuma', 'Cumartesi', 'Pazar'];
        result.ret.sort((a, b) => daysInOrder.indexOf(a.gun) - daysInOrder.indexOf(b.gun));

        const apiDays = result.ret.map(item => item.gun);
        console.log('API\'den gelen günler:', apiDays);

        const currentDay = moment().format('dddd');
        console.log('Şuanki gün:', currentDay);

        const matchingIndexes = result.ret
          .map((location, index) => {
            const apiDay = moment(location.gun, "dddd").format('dddd');
            const isDayMatching = apiDay === currentDay;
            console.log(`Gün: ${apiDay}, API'den gelen gün: ${apiDay}, Uyuşuyor mu: ${isDayMatching}`);

            const isTimeMatching = moment().isBetween(moment(location.seans.split("-")[0], "HH:mm"), moment(location.seans.split("-")[1], "HH:mm"));
            console.log(`Saatler uyuşuyor mu: ${isTimeMatching}`);

            return isDayMatching && isTimeMatching ? index : null;
          })
          .filter(index => index !== null);

        setUserData(result.ret);
        setMatchingIndexes(matchingIndexes);
        setLoading(false);
      } catch (error) {
        console.error('Veri çekme hatası:', error);
      }
    };

    fetchData();
  }, [data]);

  const handleIptalButtonPress = (index) => {
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

    const updatedUserData = [...userData];
    updatedUserData[index].isPressed = !updatedUserData[index].isPressed;
    setUserData(updatedUserData);
  };

  const handleRoutePress = (index) => {
    // Tıklanan günün uygun indeksi var mı kontrol et
    if (matchingIndexes.includes(index)) {
      // Eğer uygun indeks bulunduysa, harita sayfasına git
      navigation.navigate('Map', { data: userData[index], selectedRowIndex: index });
    } else {
      // Uygun indeks bulunamazsa kullanıcıya bir mesaj gösterebilirsiniz
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
                    <Text>X</Text>
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
    color: "lightgrey"
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