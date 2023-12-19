import React from "react";
import { View, StyleSheet } from "react-native";
import { User } from "./User";

export const Bilgi = () => {
  return (
    <View style={styles.container}>
      <User />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});