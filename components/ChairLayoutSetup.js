// /components/ChairLayoutSetup.js

import React from "react";
import { View, Text } from "react-native";
import gStyles from "../constants/globalStyles";
import colors from "../constants/colors";

export default function ChairLayoutSetup({
  layout = "Default",
  onChange,
  disabled = false,
}) {
  return (
    <View
      style={[
        gStyles.card,
        { alignItems: "center", opacity: disabled ? 0.5 : 1 },
      ]}
    >
      <Text style={gStyles.label}>Chair Layout Setup</Text>
      <Text style={{ color: colors.secondary, marginBottom: 8 }}>
        Current:{" "}
        <Text style={{ color: colors.primary, fontWeight: "600" }}>
          {layout}
        </Text>
      </Text>
      {/* You can add a Picker or layout select buttons here */}
    </View>
  );
}
