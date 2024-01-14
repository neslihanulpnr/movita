import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, ActivityIndicator } from 'react-native';
import moment from 'moment';

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
  
        // Filtreleme işlemi
        const filteredData = result.ret.filter((item) => {
          const currentDay = moment().isoWeekday();
          const apiDay = moment(item.gun, "dddd").isoWeekday();
  
          const isDayMatching = currentDay === apiDay; // API'den gelen gün ile şuanki günü karşılaştır
  
          console.log(`Günler uyuşuyor mu: ${isDayMatching}`);
  
          const isTimeMatching = moment().isBetween(moment(item.seans.split("-")[0], "HH:mm"), moment(item.seans.split("-")[1], "HH:mm"));
  
          console.log(`Saatler uyuşuyor mu: ${isTimeMatching}`);
  
          if (isDayMatching && isTimeMatching) {
            console.log(`Uygun gün: ${item.gun}`);
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
          <ActivityIndicator size="large" color="#0000ff" />
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
