import React, { useState } from "react";
import { View } from "react-native";
import ModeSelector from "../components/ModeSelector";

export default function ClimateScreen() {
  const [mist, setMist] = useState("Off");
  const [purifier, setPurifier] = useState("Off");

  return (
    <View style={{ flex: 1, backgroundColor: "#f5f6fa" }}>
      <ModeSelector
        label="Cool Mist"
        icon="cloud-outline"
        options={["Off", "High", "Low", "Auto"]}
        selected={mist}
        onSelect={setMist}
      />
      <ModeSelector
        label="Air Purifier"
        icon="leaf-outline"
        options={["Off", "Low", "High", "Max", "Auto"]}
        selected={purifier}
        onSelect={setPurifier}
      />
    </View>
  );
}
