import React from 'react';
import { View, Text } from 'react-native';

export const Information = ({plaka}) => {

  return (
    <View>
      <Text style={{fontSize: 20, margin: 5}}>Plaka : {plaka} </Text>
    </View>
  );
}

export default Information;
