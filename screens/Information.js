import React, { useEffect, useState } from 'react';
import { View, Text } from 'react-native';

export const Information = () => {
  const [userData, setUserData] = useState();

  useEffect(() => {
    console.log("use effect içi");

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
        console.log('API :', data);
        setUserData(data);
      })
      .catch(error => console.error('Hata:', error));
  }, []); 

  return (
    <View>
      <Text>nesliş</Text>
    </View>
  );
}

export default Information;