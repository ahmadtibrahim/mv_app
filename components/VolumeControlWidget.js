// /components/VolumeControlWidget.js

import React from "react";
import { View, Text, Switch } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import gStyles from "../constants/globalStyles";
import colors from "../constants/colors";
import Slider from "@react-native-community/slider";

export default function VolumeControlWidget({
  label,
  icon = "volume-high",
  value,
  onValueChange,
  enabled = false,
  onToggle,
  disabled = false,
}) {
  // Show as integer
  const displayValue = Math.round(value);

  return (
    <View style={[gStyles.card, { opacity: disabled ? 0.5 : 1 }]}>
      <View
        style={{ flexDirection: "row", alignItems: "center", marginBottom: 8 }}
      >
        <View
          style={{
            backgroundColor: colors.primary,
            borderRadius: 22,
            width: 36,
            height: 36,
            alignItems: "center",
            justifyContent: "center",
            marginRight: 10,
          }}
        >
          <Ionicons name={icon} size={22} color="#fff" />
        </View>
        <Text style={gStyles.label}>{label}</Text>
        <View style={{ flex: 1 }} />
        {typeof enabled === "boolean" && onToggle && (
          <Switch
            value={enabled}
            onValueChange={onToggle}
            trackColor={{ false: colors.secondary, true: colors.primary }}
            thumbColor={enabled ? colors.accent : colors.background}
            disabled={disabled}
          />
        )}
      </View>
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <Slider
          style={{ flex: 1, marginRight: 12 }}
          minimumValue={0}
          maximumValue={100}
          value={displayValue}
          onValueChange={onValueChange}
          minimumTrackTintColor={colors.primary}
          maximumTrackTintColor={colors.muted}
          thumbTintColor={colors.primary}
          disabled={disabled || !enabled}
        />
        <Text
          style={{
            width: 36,
            fontWeight: "700",
            color: colors.primary,
            textAlign: "center",
          }}
        >
          {displayValue}
        </Text>
      </View>
    </View>
  );
}
