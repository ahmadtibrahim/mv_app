// /screens/modes/SecurityModeScreen.js

import React, { useState } from "react";
import { SafeAreaView, ScrollView, View } from "react-native";
import gStyles from "../../constants/globalStyles";
import ModeHeader from "../../components/ModeHeader";
import LiveCam from "../../components/LiveCam";
import GasSmokeSwitch from "../../components/GasSmokeSwitch";
import ClimateStatus from "../../components/ClimateStatus";
import WaterLevelMeter from "../../components/WaterLevelMeter";

export default function SecurityModeScreen({ navigation }) {
  const [isActive, setIsActive] = useState(true);
  const [gasSmokeEnabled, setGasSmokeEnabled] = useState(false);

  return (
    <SafeAreaView style={gStyles.container}>
      <ModeHeader
        isActive={isActive}
        onBack={() => navigation.goBack()}
        showToggle={true}
        toggleValue={isActive}
        onToggle={() => setIsActive((v) => !v)}
        label="Security Mode"
      />
      <ScrollView contentContainerStyle={{ paddingVertical: 16 }}>
        <View style={gStyles.section}>
          <LiveCam disabled={!isActive} />
        </View>
        <View style={gStyles.section}>
          <GasSmokeSwitch
            enabled={gasSmokeEnabled && isActive}
            onToggle={() => setGasSmokeEnabled((v) => !v)}
            disabled={!isActive}
          />
        </View>
        <View style={gStyles.section}>
          <ClimateStatus disabled={!isActive} />
        </View>
        <View style={gStyles.section}>
          <WaterLevelMeter disabled={!isActive} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
