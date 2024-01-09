import { useState, useEffect } from "react";
import { StyleSheet, View, } from "react-native";
import MapView from "react-native-maps";

export const Map = ({ data }) => {
  const [userData, setUserData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://www.movita.com.tr:8019/personel_guzergah_listeleme', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'sample_token1234'
          },
          body: JSON.stringify({ user_id: data && data.ret && data.ret.user_id })
        });
        const result = await response.json();
        console.log('API Response:', result.ret);
        setUserData(result.ret);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, [data]);

  return (
    <View>
      
        <View>
          <MapView style={styles.map}  />
        </View>
  
    </View>
  );
};

const styles = StyleSheet.create({
  map: {
    width: "100%",
    height: "100%"
  },
});