// /components/WaterLevelIcon.js

import React from "react";
import { View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import colors from "../constants/colors";

/**
 * Props:
 *  - status: "ok" | "refill"
 *  - size: number (optional, default 28)
 *  - style: object (optional)
 */
export default function WaterLevelIcon({
  status = "ok",
  size = 28,
  style = {},
}) {
  const color = status === "ok" ? colors.accent : colors.error;
  return (
    <View style={[{ alignItems: "center", justifyContent: "center" }, style]}>
      <Ionicons name="water-outline" size={size} color={color} />
    </View>
  );
}
