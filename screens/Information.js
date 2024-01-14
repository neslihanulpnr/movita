import React, { useState, useEffect } from 'react';
import { View, Text, ActivityIndicator, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native'; // React Navigation kullanılıyorsa ekleyin
import moment from 'moment';

export const Information = ({ data }) => {
  const [userData, setUserData] = useState([]);
  const [loading, setLoading] = useState(true);
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

        // Filtreleme işlemi
        const filteredData = result.ret.filter((item) => {
          const currentDay = moment().isoWeekday();
          const apiDay = moment(item.gun, "dddd").isoWeekday();

          const isDayMatching = currentDay === apiDay;
          const isTimeMatching = moment().isBetween(moment(item.seans.split("-")[0], "HH:mm"), moment(item.seans.split("-")[1], "HH:mm"));

          if (isDayMatching && isTimeMatching) {
            console.log(`Günler uyuşuyor mu: true`);
            console.log(`Saatler uyuşuyor mu: true`);
            console.log(`Uygun gün: ${item.gun}`);
          } else {
            console.log(`Günler uyuşuyor mu: false`);
            console.log(`Saatler uyuşuyor mu: false`);
          }

          return isDayMatching;
        });

        setUserData(filteredData);
        setLoading(false);
      } catch (error) {
        console.error('Veri çekme hatası:', error);
      }
    };

    fetchData();
  }, [data.ret.user_id]);

  const getRowStyle = (item) => {
    const currentDay = moment().isoWeekday();
    const apiDay = moment(item.gun, "dddd").isoWeekday();
    const isDayMatching = currentDay === apiDay;
    const isTimeMatching = moment().isBetween(moment(item.seans.split("-")[0], "HH:mm"), moment(item.seans.split("-")[1], "HH:mm"));

    return {
      backgroundColor: isDayMatching && isTimeMatching ? '' : '', // Arka plan rengi
      textColor: isDayMatching && isTimeMatching ? '#00ADEE' : 'black', // Yazı rengi
    };
  };

  return (

    <View style={styles.tableContainer}>
      <View style={[styles.tableRow, styles.tableHeader]}>
        <Text style={styles.tableHeaderText}>PLAKA</Text>
        <Text style={styles.tableHeaderText}>GÜN</Text>
        <Text style={styles.tableHeaderText}>SEANS</Text>
      </View>
      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        userData && userData.length > 0 ? (
          userData.map((item, index) => (
            <View key={index} style={[styles.tableRow, getRowStyle(item)]}>
              <Text style={[styles.tableCell, { color: getRowStyle(item).textColor }]}>{item.arac_plaka}</Text>
              <Text style={[styles.tableCell, { color: getRowStyle(item).textColor }]}>{item.gun}</Text>
              <Text style={[styles.tableCell, { color: getRowStyle(item).textColor }]}>{item.seans}</Text>
            </View>
          ))
        ) : (
          <Text>No data available</Text>
        )
      )}
    </View>
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
    fontSize: 15,
    fontWeight: 'bold',
    textAlign: 'center',
    flex: 1,
  },
});

export default Information;
