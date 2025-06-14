// screens/ModesScreen.js

import React from "react";
import { View, Text, StyleSheet } from "react-native";
import colors from "../constants/colors";

export default function ModesScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Modes Page</Text>
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
