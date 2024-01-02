import { StyleSheet, View, } from "react-native";
import MapView from "react-native-maps";

export const Map = () => {
  
  return (
    <View>
      <MapView
        style={styles.map}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  map: {
    width: "100%",
    height: "100%"
  },
});
