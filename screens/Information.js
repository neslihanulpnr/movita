import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, ActivityIndicator, TouchableOpacity } from 'react-native';
import moment from "moment";
import { useNavigation } from '@react-navigation/native';

export const Information = ({ data }) => {
  const [userData, setUserData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [matchingIndexes, setMatchingIndexes] = useState([]);
  const [isPressed, setIsPressed] = useState(false);
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

        const apiDays = result.ret.map(item => item.gun);
        console.log('API\'den gelen günler:', apiDays);

        const currentDay = moment().format('dddd');
        console.log('Şuanki gün:', currentDay);

        const matchingDays = apiDays.map(apiDay => {
          const isDayMatching = apiDay === currentDay;
          console.log(`Gün: ${apiDay}, API'den gelen gün: ${apiDay}, Uyuşuyor mu: ${isDayMatching}`);

          return {
            day: apiDay,
            isDayMatching: isDayMatching
          };
        });

        const matchingIndexes = matchingDays.reduce((acc, item, index) => {
          if (item.isDayMatching) {
            acc.push(index);
          }
          return acc;
        }, []);

        const currentHourMinute = moment().format('HH:mm');

        matchingIndexes.forEach(index => {
          const seans = result.ret[index].seans;
          const isTimeMatching = moment(currentHourMinute, 'HH:mm').isBetween(
            moment(seans.split("-")[0], 'HH:mm'),
            moment(seans.split("-")[1], 'HH:mm')
          );
          console.log(`Gün: ${matchingDays[index].day}, Seans: ${seans}, Saatler uyuşuyor mu: ${isTimeMatching}`);
        });

        const initialUserData = result.ret.map(item => ({ ...item, isPressed: false }));
        setUserData(initialUserData);
        setMatchingIndexes(matchingIndexes);
        setLoading(false);
      } catch (error) {
        console.error('Veri çekme hatası:', error);
      }
    };

    fetchData();
  }, [data]);

  const handleIptalButtonPress = (index) => {
    console.log("Katılmayacağım");
    const updatedUserData = [...userData];
    updatedUserData[index].isPressed = !updatedUserData[index].isPressed;
    setUserData(updatedUserData);
  };

  const handleRoutePress = (index) => {
    if (matchingIndexes.includes(index)) {
      console.log('Harita butonuna tıklandı');
      navigation.navigate('Map', { data: data, selectedRowIndex: index });
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
                matchingIndexes.includes(index) && userData[index].isTimeMatching ? styles.matchingRow : styles.nonMatchingRow
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
                    backgroundColor: userData[index].isPressed ? 'red' : '#00ADEE',
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
  nonMatchingRow:{
    backgroundColor: "#0000"
  }
});

export default Information; 