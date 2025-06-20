// /screens/modes/MovieModeScreen.js

import React, { useState } from "react";
import { SafeAreaView, ScrollView, View } from "react-native";
import gStyles from "../../constants/globalStyles";
import ModeHeader from "../../components/ModeHeader";
import VolumeControlWidget from "../../components/VolumeControlWidget";
import LightModeWidget from "../../components/LightModeWidget";

export default function MovieModeScreen({ navigation }) {
  const [isActive, setIsActive] = useState(true);
  const [speakerEnabled, setSpeakerEnabled] = useState(false);
  const [speakerVolume, setSpeakerVolume] = useState(70);

  return (
    <SafeAreaView style={gStyles.container}>
      <ModeHeader
        isActive={isActive}
        onBack={() => navigation.goBack()}
        showToggle={true}
        toggleValue={isActive}
        onToggle={() => setIsActive((v) => !v)}
        label="Movie Mode"
      />
      <ScrollView contentContainerStyle={{ paddingVertical: 16 }}>
        <View style={gStyles.section}>
          <VolumeControlWidget
            label="Speaker Volume"
            icon="film"
            enabled={speakerEnabled && isActive}
            onToggle={setSpeakerEnabled}
            value={speakerVolume}
            onValueChange={setSpeakerVolume}
            disabled={!isActive}
          />
        </View>
        <View style={gStyles.section}>
          <LightModeWidget disabled={!isActive} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
