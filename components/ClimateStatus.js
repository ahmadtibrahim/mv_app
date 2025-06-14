import React from "react";
import { View, Text, StyleSheet, useWindowDimensions } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import colors from "../constants/colors";

// Helper to pick color based on value
const disabledColor = "#bbb"; // grey color
function getStatusColor(type, value) {
  // Grey out if explicitly disabled
  if (value === "Disabled") return disabledColor;

  // Original logic:
  if (type === "aqi") {
    if (value >= 80) return "#26de81"; // green
    if (value >= 50) return "#f7b731"; // yellow
    return "#ee5253"; // red
  }
  if (type === "humidity") {
    if (value >= 35 && value <= 60) return "#26de81";
    if ((value >= 25 && value < 35) || (value > 60 && value <= 75))
      return "#f7b731";
    return "#ee5253";
  }
  if (type === "gas") {
    if (value === "Safe" || value === "No Gas") return "#26de81";
    if (value === "Moderate") return "#f7b731";
    return "#ee5253"; // "Detected", "Alert", etc
  }
  return colors.muted;
}

export default function ClimateStatus({
  airQuality = 94,
  humidity = 40,
  gasStatus = "Safe",
}) {
  const { width } = useWindowDimensions();
  const isTablet = width > 600;
  const widgetWidth = isTablet ? 500 : width * 0.9;

  return (
    <View style={[styles.card, { width: widgetWidth, alignSelf: "center" }]}>
      <View style={styles.row}>
        {/* Air Quality */}
        <StatusBox
          icon="cloud-outline"
          value={airQuality + "%"}
          label="Air Quality"
          color={getStatusColor("aqi", airQuality)}
        />
        {/* Humidity */}
        <StatusBox
          icon="water-outline"
          value={humidity + "%"}
          label="Humidity"
          color={getStatusColor("humidity", humidity)}
        />
        {/* Gas/Smoke */}
        <StatusBox
          icon="warning-outline"
          value={gasStatus}
          label="Gas/Smoke"
          color={getStatusColor("gas", gasStatus)}
        />
      </View>
    </View>
  );
}

function StatusBox({ icon, value, label, color }) {
  const isDisabled = color === "#bbb";
  return (
    <View
      style={[
        styles.box,
        { backgroundColor: color + "22", borderColor: color },
      ]}
    >
      <Ionicons
        name={icon}
        size={26}
        color={color}
        style={{ marginBottom: 4 }}
      />
      <Text style={[styles.value, { color }]}>{isDisabled ? "—" : value}</Text>
      <Text style={[styles.label, isDisabled && { color }]}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.surface,
    borderRadius: 18,
    padding: 16,
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
    justifyContent: "space-between",
    alignItems: "center",
    gap: 10,
  },
  box: {
    flex: 1,
    marginHorizontal: 4,
    backgroundColor: colors.muted,
    borderRadius: 14,
    alignItems: "center",
    paddingVertical: 14,
    paddingHorizontal: 0,
    borderWidth: 2,
  },
  value: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 2,
  },
  label: {
    fontSize: 13,
    color: colors.text,
    fontWeight: "600",
    marginTop: 3,
    letterSpacing: 0.3,
  },
});
