import React, { useEffect, useState } from 'react';
import { View, Text } from 'react-native';

export const Information = ({data}) => { //eklendi
  console.log("props",data)
  const [userData, setUserData] = useState();

  useEffect(() => {

    fetch('http://www.movita.com.tr:8019/guzergah_personel_listele', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'sample_token1234'
      },
      body: JSON.stringify({ user_id: 999 })
    })
      .then(response => response.json())
      .then(data => {
        console.log('API:', data);
        setUserData(data);
      })
      .catch(error => console.error('Hata:', error));
  }, []); 

  //userdata tanımlı değilse
  if (!userData) {
    return (
      <View>
        <Text></Text>
      </View>
    );
  }

  //ret özelliği tanımlı değilse
  if (!userData.ret) {
    return (
      <View>
        <Text></Text>
      </View>
    );
  }

  return (
    <View>
        <Text style={{fontSize: 20, margin:15}}>
          Arac Plakası: {userData.ret[0].arac_plaka} {"\n"}
          Filo ID: {userData.ret[0].filo_id} {"\n"}
          Gün: {userData.ret[0].gun} {"\n"}
          Seans: {userData.ret[0].seans} {"\n"}
        </Text>
      
    </View>
  );
}

export default Information;
