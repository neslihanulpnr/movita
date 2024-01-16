import React from "react";
import { View, Text, StyleSheet } from "react-native";

export const Settings = ({ data }) => {
  const filoData = data?.ret?.filo;

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Kişi Bilgileri</Text>
      </View>

      <View style={styles.content}>
        {filoData && (
          <View>
            <Text style={styles.infoText}>Adres: {filoData.address}</Text>
            <Text style={styles.infoText}>E-posta: {filoData.eposta}</Text>
            <Text style={styles.infoText}>Telefon: {filoData.telefon}</Text>
            <Text style={styles.infoText}>Username: {filoData.username}</Text>
          </View>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    margin: 10,
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 10,
    padding: 10,
  },
  header: {
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 10,
  },
  headerText: {
    fontSize: 30,
    fontWeight: "bold",
  },
  content: {
    justifyContent: "center",
    alignItems: "center",
  },
  infoText: {
    color: "black",
    fontSize: 23,
    marginBottom: 5,
  },
});

export default Settings;
