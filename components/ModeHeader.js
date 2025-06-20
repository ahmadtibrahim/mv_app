// /components/ModeHeader.js

import React from "react";
import { View, Text, Switch, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import gStyles from "../constants/globalStyles";
import colors from "../constants/colors";

export default function ModeHeader({
  isActive = false,
  onBack,
  showToggle = true,
  toggleValue = false,
  onToggle,
  label = "",
}) {
  return (
    <View style={gStyles.header}>
      {/* Back button */}
      <TouchableOpacity onPress={onBack} style={{ marginRight: 12 }}>
        <Ionicons
          name="arrow-back"
          size={24}
          color={isActive ? colors.primary : colors.secondary}
        />
      </TouchableOpacity>

      {/* Optional label (mode name) */}
      {label ? (
        <Text
          style={{
            fontWeight: "700",
            fontSize: 18,
            color: colors.primary,
            flex: 1,
          }}
        >
          {label}
        </Text>
      ) : (
        <View style={{ flex: 1 }} />
      )}

      {/* Activation toggle */}
      {showToggle && onToggle && (
        <Switch
          value={toggleValue}
          onValueChange={onToggle}
          trackColor={{ false: colors.secondary, true: colors.primary }}
          thumbColor={toggleValue ? colors.accent : colors.background}
          ios_backgroundColor={colors.background}
        />
      )}
    </View>
  );
}
