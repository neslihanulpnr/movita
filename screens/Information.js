import React, { useEffect, useState } from 'react';
import { View, Text } from 'react-native';

export const Information = ({data}) => {
  useEffect(() => {
    console.log("kullanıcı :", data);

    fetch('http://www.movita.com.tr:8019/guzergah_personel_listele', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'sample_token1234'
      },
      body: JSON.stringify({user_id:data.ret.user_id})
    })
      .then(response => response.json())
      .then(data => {
        console.log('API:', data);
        // Yeni gelen veriyi state'e kaydedin
        setUserData(data);
      })
      .catch(error => console.error('Hata:', error));
  }, []); // Boş bağımlılık dizisi

  const [userData, setUserData] = useState();

  // userdata tanımlı değilse
  if (!userData) {
    return (
      <View>
        <Text></Text>
      </View>
    );
  }

  // ret özelliği tanımlı değilse
  if (userData.ret.length==0) {
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
        id: {userData.ret[0].id} {"\n"}
      </Text>
    </View>
  );
}

export default Information;
