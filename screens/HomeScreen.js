// screens/HomeScreen.js

import React from "react";
import { View, Text, StyleSheet } from "react-native";
import colors from "../constants/colors";
import RestControl from "../components/RestControl";
import SmartCupControl from "../components/SmartCupControl";

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Home Page</Text>
      <RestControl
        label="Back Rest"
        onPress={(action) => console.log("Back Rest", action)}
      />
      <RestControl
        label="Foot Rest"
        onPress={(action) => console.log("Foot Rest", action)}
      />
      <SmartCupControl
        state="off" // or 'hot1', 'hot2', 'cold1', 'cold2'
        onAction={(action) => console.log("Cup Action:", action)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.background,
  },
  text: {
    fontSize: 24,
    color: colors.primary,
  },
});
