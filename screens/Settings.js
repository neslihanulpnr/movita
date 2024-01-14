import React from "react";
import { View, Text } from "react-native";

export const Settings = ({ data }) => {
    const filoData = data?.ret?.filo;
  
    return (
      <View>
        <View style={{ margin: 20 }}></View>
        <View style={{ justifyContent: "center", alignItems: "center" }}>
          <Text style={{ fontSize: 20, fontWeight: "bold" }}> Kişi Bilgileri</Text>
        </View>
  
        <View style={{ justifyContent: "center", alignItems: "center" }}>
          {filoData && (
            <View>
              <Text style={{ color: "black", fontSize: 25 }}>Adres: {filoData.address}</Text>
              {/* Diğer özellikleri de ekleyebilirsiniz */}
            </View>
          )}
        </View>
      </View>
    );
  };