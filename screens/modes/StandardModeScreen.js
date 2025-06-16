// screens/modes/StandardModeScreen.js

import React, { useState } from "react";
import { SafeAreaView, ScrollView, View } from "react-native";
import VolumeControlWidget from "../../components/VolumeControlWidget";
import colors from "../../constants/colors";
import SoundModeDropdown from "../../components/SoundModeDropdown";
import ModeHeader from "../../components/ModeHeader";
import LightModeWidget from "../../components/LightModeWidget";

export default function StandardModeScreen({ navigation }) {
  const [speakerEnabled, setSpeakerEnabled] = useState(false);
  const [speakerVolume, setSpeakerVolume] = useState(50);
  const [micEnabled, setMicEnabled] = useState(false);
  const [micVolume, setMicVolume] = useState(50);
  const [isActive, setIsActive] = useState(true);

  const SOUND_MODES_STANDARD = [
    { key: "standard", label: "Standard" },
    { key: "chill", label: "Chill" },
    { key: "custom", label: "Custom" },
  ];

  const [soundMode, setSoundMode] = useState("standard");
  const [equalizer, setEqualizer] = useState({ Bass: 50, Mid: 50, Treble: 50 });

  function handleEqChange(band, value) {
    setEqualizer((prev) => ({ ...prev, [band]: value }));
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.background }}>
      <ScrollView contentContainerStyle={{ paddingVertical: 18 }}>
        <View style={{ paddingHorizontal: 10, marginTop: 8 }}>
          <ModeHeader
            isActive={false}
            onBack={() => navigation.goBack()}
            showToggle={true}
            toggleValue={isActive}
            onToggle={() => setIsActive(!isActive)}
          />
        </View>
        <VolumeControlWidget
          label="Speaker Volume"
          icon="volume-high"
          enabled={speakerEnabled}
          onToggle={setSpeakerEnabled}
          value={speakerVolume}
          onValueChange={setSpeakerVolume}
        />
        <VolumeControlWidget
          label="Mic Volume"
          icon="mic"
          enabled={micEnabled}
          onToggle={setMicEnabled}
          value={micVolume}
          onValueChange={setMicVolume}
        />
        <SoundModeDropdown
          modes={SOUND_MODES_STANDARD}
          value={soundMode}
          onChange={setSoundMode}
          showEqualizer={soundMode === "custom"}
          equalizerState={equalizer}
          onEqualizerChange={handleEqChange}
        />
        <LightModeWidget />
      </ScrollView>
    </SafeAreaView>
  );
}
