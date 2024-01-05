import React, { useEffect, useState } from 'react';
import { View, Text } from 'react-native';

export const Information = ({data}) => {
  const [userData, setUserData] = useState();
  useEffect(() => {
    console.log("kullanıcı :", data);

    const fetchData = async () => {
      const response = await fetch('http://www.movita.com.tr:8019/guzergah_personel_listele', {
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

  return(

    <View>
      <View style={{margin: 8}} >
        {userData == undefined ? (
          <Text>Veri yükleniyor...</Text>
        ) : (
          <View>
            {userData.map(item => (
                <View >
                  <Text> PLAKA : {item.arac_plaka} </Text>
                  <Text> FİLO ID: {item.filo_id} </Text>
                  <Text> GÜN : {item.gun} </Text>
                  <Text> İSTASYON ID: {item.istasyon_id} </Text>
                  <Text> SEANS: {item.seans} </Text>
                  <Text> SMS : {item.sms_atilsin} </Text>
              </View>
             
            ))}
          </View>
        )}

      </View>
    
    </View>
  );
}

export default Information;
