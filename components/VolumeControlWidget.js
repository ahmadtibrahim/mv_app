// components/VolumeControlWidget.js

import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Switch,
  useWindowDimensions,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import colors from "../constants/colors";
import Slider from "@react-native-community/slider";

export default function VolumeControlWidget({
  label,
  icon = "volume-high",
  value,
  onValueChange,
  enabled,
  onToggle,
}) {
  const { width } = useWindowDimensions();
  const isTablet = width > 600;
  const widgetWidth = isTablet ? 500 : width * 0.9;

  // Round to nearest integer
  const displayValue = Math.round(value);

  return (
    <View style={[styles.card, { width: widgetWidth, alignSelf: "center" }]}>
      <View style={styles.header}>
        <View style={styles.iconCircle}>
          <Ionicons name={icon} size={22} color="#fff" />
        </View>
        <Text style={styles.label}>{label}</Text>
        <View style={{ flex: 1 }} />
        <Switch
          value={enabled}
          onValueChange={onToggle}
          trackColor={{ false: colors.muted, true: colors.primary }}
          thumbColor={enabled ? colors.primary : "#fff"}
        />
      </View>
      <Slider
        style={{ width: "100%", marginTop: 18 }}
        minimumValue={0}
        maximumValue={100}
        step={5} // 5% steps
        value={value}
        onValueChange={onValueChange}
        minimumTrackTintColor={colors.primary}
        maximumTrackTintColor={colors.muted}
        thumbTintColor={colors.primary}
        disabled={!enabled}
      />
      <Text style={styles.valueText}>{displayValue}%</Text> {/* integer-only */}
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
    shadowOpacity: 0.13,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
    borderWidth: 1,
    borderColor: colors.primaryLight,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  iconCircle: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: colors.primary,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 8,
  },
  label: {
    fontSize: 18,
    fontWeight: "600",
    color: colors.secondary,
    letterSpacing: 0.3,
  },
  valueText: {
    marginTop: 8,
    fontSize: 15,
    color: colors.primary,
    alignSelf: "center",
    fontWeight: "600",
  },
});
