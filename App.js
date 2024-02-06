import { StatusBar } from 'expo-status-bar';
import React, { useState, useRef, useEffect } from "react";
import { NavigationContainer } from '@react-navigation/native';
import { Navigator } from './Navigator';
import Toast from 'react-native-toast-message';



export default function App() {
  const ref = useRef()
  return (
    <NavigationContainer>
      <StatusBar style="auto" />
      <Navigator/> 
      <Toast ref={(ref) => Toast.setRef(ref)} />
    </NavigationContainer>

  );
}