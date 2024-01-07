import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';

export const Information = ({data}) => {
  const [userData, setUserData] = useState();
  useEffect(() => {
    console.log("kullanıcı :", data);

    const fetchData = async () => {
      const response = await fetch('http://www.movita.com.tr:8019/personel_guzergah_listeleme', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'sample_token1234'
        },
        body: JSON.stringify({user_id:data.ret.user_id})
      });
      const result = await response.json();
      console.log("RESULT: ",result)
      setUserData(result.ret);
    };
    fetchData();
      
  }, []); // Boş bağımlılık dizisi

  return (
    <View>
      <View style={{ margin: 8 }}>
        {userData === undefined ? (
          <Text>Veri yükleniyor...</Text>
        ) : (
          <View>
            {userData.map((item, index) => (
              <View key={index}>
                <View style={styles.infoContainer}>
                  <Text style={{fontSize: 20}}> PLAKA : {item.arac_plaka} </Text>
                  <Text style={{fontSize: 20}}> FİLO ID: {item.filo_id} </Text>
                  <Text style={{fontSize: 20}}> GÜN : {item.gun} </Text>
                  <Text style={{fontSize: 20}}> İSTASYON ID: {item.istasyon_id} </Text>
                  <Text style={{fontSize: 20}}> SEANS: {item.seans} </Text>
                  <Text style={{fontSize: 20}}> SMS : {item.sms_atilsin} </Text>
                </View>
                   {/* İki kez yazılan kısımlar arasında boşluk eklemek için aşağıdaki View kullanılabilir */}
                 {index < userData.length - 1 && <View style={styles.spacing}></View>}
               
              </View>
            ))}
          </View>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  infoContainer: {
    marginBottom: 10,
  },
  spacing: {
    height: 10,
  },
});

export default Information;

