// components/ClimateStatus.js

import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  useWindowDimensions,
  Pressable,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import colors from "../constants/colors";

const disabledColor = "#bbb";

function getStatusColor(type, value) {
  if (value === "Disabled") return disabledColor;
  switch (type) {
    case "aqi":
      if (value >= 80) return "#26de81";
      if (value >= 50) return "#f7b731";
      return "#ee5253";
    case "humidity":
      if (value >= 35 && value <= 60) return "#26de81";
      if ((value >= 25 && value < 35) || (value > 60 && value <= 75))
        return "#f7b731";
      return "#ee5253";
    case "gas":
      if (value === "Safe" || value === "No Gas") return "#26de81";
      if (value === "Moderate") return "#f7b731";
      return "#ee5253";
    case "temp":
      if (value >= 18 && value <= 26) return "#26de81";
      if ((value >= 16 && value < 18) || (value > 26 && value <= 30))
        return "#f7b731";
      return "#ee5253";
    default:
      return colors.muted;
  }
}

export default function ClimateStatus({
  airQuality = 94,
  humidity = 40,
  gasStatus = "Safe",
  temperature = 22,
}) {
  const { width } = useWindowDimensions();
  const widgetWidth = width > 600 ? 500 : width * 0.9;

  const innerWidth = widgetWidth - 16; // card padding
  const baseSize = (innerWidth - 32) / 4; // four boxes
  const boxHeight = baseSize + 20;

  const [isCelsius, setIsCelsius] = useState(true);
  const displayTemp = isCelsius
    ? `${temperature}°C`
    : `${Math.round((temperature * 9) / 5 + 32)}°F`;

  return (
    <View style={[styles.card, { width: widgetWidth, alignSelf: "center" }]}>
      <View style={styles.row}>
        <StatusBox
          icon="cloud-outline"
          value={airQuality === "Disabled" ? "—" : airQuality + "%"}
          label="Air Quality"
          color={getStatusColor("aqi", airQuality)}
          size={baseSize}
          height={boxHeight}
        />
        <StatusBox
          icon="water-outline"
          value={humidity === "Disabled" ? "—" : humidity + "%"}
          label="Humidity"
          color={getStatusColor("humidity", humidity)}
          size={baseSize}
          height={boxHeight}
        />
        <StatusBox
          icon="warning-outline"
          value={gasStatus === "Disabled" ? "—" : gasStatus}
          label="Gas / Smoke"
          color={getStatusColor("gas", gasStatus)}
          size={baseSize}
          height={boxHeight}
        />
        <Pressable onPress={() => setIsCelsius((c) => !c)}>
          <StatusBox
            icon="thermometer-outline"
            value={displayTemp}
            label="Temp"
            color={getStatusColor("temp", temperature)}
            size={baseSize}
            height={boxHeight}
          />
        </Pressable>
      </View>
    </View>
  );
}

function StatusBox({ icon, value, label, color, size, height }) {
  const isDisabled = color === disabledColor;
  const bg = color + "22";
  return (
    <View style={[styles.box, { width: size, height, marginHorizontal: 4 }]}>
      <View
        style={[
          styles.innerBox,
          {
            backgroundColor: bg,
            borderColor: bg, // match border to background
          },
        ]}
      >
        <Ionicons
          name={icon}
          size={20}
          color={color}
          style={{ marginBottom: 4 }}
        />
        <Text style={[styles.value, { color }]}>
          {isDisabled ? "—" : value}
        </Text>
        <Text style={[styles.label, { color: colors.text }]}>{label}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.surface,
    borderRadius: 18,
    padding: 8,
    marginVertical: 10,
    elevation: 3,
    shadowColor: colors.primary,
    shadowOpacity: 0.12,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
    borderWidth: 1,
    borderColor: colors.primaryLight,
  },
  row: {
    flexDirection: "row",
    justifyContent: "center",
  },
  box: {
    borderRadius: 14,
    borderWidth: 0,
    overflow: "hidden",
  },
  innerBox: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-start",
    paddingTop: 8,
  },
  value: {
    fontSize: 18,
    fontWeight: "700",
    marginBottom: 4,
  },
  label: {
    fontSize: 12,
    fontWeight: "600",
    letterSpacing: 0.3,
    textAlign: "center",
    marginTop: 2,
  },
});
