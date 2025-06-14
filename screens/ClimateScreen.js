import React, { useState } from "react";
import { SafeAreaView, ScrollView } from "react-native";
import ModeSelector from "../components/ModeSelector";
import WaterLevelMeter from "../components/WaterLevelMeter";
import ClimateStatus from "../components/ClimateStatus";
import colors from "../constants/colors";
import GasSmokeSwitch from "../components/GasSmokeSwitch";

export default function ClimateScreen() {
  const [mist, setMist] = useState("Off");
  const [purifier, setPurifier] = useState("Off");
  const [detectorActive, setDetectorActive] = useState(true);

  // Example water status; replace with your state/data
  const waterRight = "ok"; // "ok" or "refill"
  const waterLeft = "refill"; // "ok" or "refill"

  // Example values for air quality, humidity, and gas
  const airQuality = 88; // percent
  const humidity = 42; // percent
  const gasStatus = "Safe"; // "Safe", "Moderate", "Detected", etc

  // When detector is OFF, grey out the gas status
  const displayGasStatus = detectorActive ? gasStatus : "Disabled";

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.background }}>
      <ScrollView contentContainerStyle={{ paddingVertical: 12 }}>
        <ClimateStatus
          airQuality={airQuality}
          humidity={humidity}
          gasStatus={displayGasStatus}
        />
        <ModeSelector
          label="Cool Mist"
          icon="cloud-outline"
          options={["Off", "High", "Low", "Auto"]}
          selected={mist}
          onSelect={setMist}
          headerRight={
            <>
              <WaterLevelMeter label="R" status={waterRight} />
              <WaterLevelMeter label="L" status={waterLeft} />
            </>
          }
        />
        <ModeSelector
          label="Air Purifier"
          icon="leaf-outline"
          options={["Off", "Low", "High", "Max", "Auto"]}
          selected={purifier}
          onSelect={setPurifier}
        />
        <GasSmokeSwitch
          value={detectorActive}
          onValueChange={setDetectorActive}
        />
      </ScrollView>
    </SafeAreaView>
  );
}
