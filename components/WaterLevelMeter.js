// components\WaterLevelMeter.js

import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function WaterLevelMeter({ label, status }) {
  // status: "ok" or "refill"
  const color = status === "ok" ? "#26de81" : "#ee5253"; // green or red

  return (
    <View style={styles.iconWrap}>
      <Ionicons name="water-outline" size={38} color={color} />
      <Text style={[styles.iconLetter, { color }]}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  iconWrap: {
    width: 42,
    height: 42,
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 14,
    position: "relative",
  },
  iconLetter: {
    position: "absolute",
    top: 7,
    left: 0,
    right: 0,
    textAlign: "center",
    fontWeight: "900",
    fontSize: 21,
    opacity: 1,
    // Ensures the letter is clearly visible inside the icon
  },
});
