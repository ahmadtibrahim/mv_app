// /components/GasSmokeSwitch.js

import React from "react";
import { View, Text, Switch } from "react-native";
import gStyles from "../constants/globalStyles";
import colors from "../constants/colors";

export default function GasSmokeSwitch({
  enabled,
  onToggle,
  disabled = false,
}) {
  return (
    <View
      style={[
        gStyles.card,
        {
          flexDirection: "row",
          alignItems: "center",
          opacity: disabled ? 0.5 : 1,
        },
      ]}
    >
      <Text style={gStyles.label}>Gas/Smoke Detector</Text>
      <Switch
        value={enabled}
        onValueChange={onToggle}
        trackColor={{ false: colors.secondary, true: colors.primary }}
        thumbColor={enabled ? colors.accent : colors.background}
        style={{ marginLeft: 16 }}
        disabled={disabled}
      />
    </View>
  );
}
