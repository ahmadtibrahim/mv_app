// /screens/modes/StandardModeScreen.js

import React, { useState } from "react";
import { SafeAreaView, ScrollView, View } from "react-native";
import gStyles from "../../constants/globalStyles";
import colors from "../../constants/colors";
import ModeHeader from "../../components/ModeHeader";
import VolumeControlWidget from "../../components/VolumeControlWidget";
import SoundModeDropdown from "../../components/SoundModeDropdown";
import LightModeWidget from "../../components/LightModeWidget";

export default function StandardModeScreen({ navigation }) {
  const [isActive, setIsActive] = useState(true);
  const [speakerEnabled, setSpeakerEnabled] = useState(false);
  const [speakerVolume, setSpeakerVolume] = useState(50);
  const [micEnabled, setMicEnabled] = useState(false);
  const [micVolume, setMicVolume] = useState(50);
  const [soundMode, setSoundMode] = useState("standard");
  const [equalizer, setEqualizer] = useState({ Bass: 50, Mid: 50, Treble: 50 });

  const SOUND_MODES = [
    { key: "standard", label: "Standard" },
    { key: "chill", label: "Chill" },
    { key: "custom", label: "Custom" },
  ];

  function handleEqChange(band, value) {
    setEqualizer((prev) => ({ ...prev, [band]: value }));
  }

  return (
    <SafeAreaView style={gStyles.container}>
      <ModeHeader
        isActive={isActive}
        onBack={() => navigation.goBack()}
        showToggle={true}
        toggleValue={isActive}
        onToggle={() => setIsActive((v) => !v)}
        label="Standard Mode"
      />
      <ScrollView contentContainerStyle={{ paddingVertical: 16 }}>
        <View style={gStyles.section}>
          <VolumeControlWidget
            label="Speaker Volume"
            icon="volume-high"
            enabled={speakerEnabled && isActive}
            onToggle={setSpeakerEnabled}
            value={speakerVolume}
            onValueChange={setSpeakerVolume}
            disabled={!isActive}
          />
        </View>
        <View style={gStyles.section}>
          <VolumeControlWidget
            label="Mic Volume"
            icon="mic"
            enabled={micEnabled && isActive}
            onToggle={setMicEnabled}
            value={micVolume}
            onValueChange={setMicVolume}
            disabled={!isActive}
          />
        </View>
        <View style={gStyles.section}>
          <SoundModeDropdown
            modes={SOUND_MODES}
            value={soundMode}
            onChange={setSoundMode}
            showEqualizer={soundMode === "custom"}
            equalizerState={equalizer}
            onEqualizerChange={handleEqChange}
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
