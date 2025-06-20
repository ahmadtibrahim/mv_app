// /screens/modes/KaraokeModeScreen.js

import React, { useState } from "react";
import { SafeAreaView, ScrollView, View } from "react-native";
import gStyles from "../../constants/globalStyles";
import ModeHeader from "../../components/ModeHeader";
import VolumeControlWidget from "../../components/VolumeControlWidget";
import MusicPlayer from "../../components/MusicPlayer";
import LightModeWidget from "../../components/LightModeWidget";

export default function KaraokeModeScreen({ navigation }) {
  const [isActive, setIsActive] = useState(true);
  const [micEnabled, setMicEnabled] = useState(false);
  const [micVolume, setMicVolume] = useState(50);
  const [speakerEnabled, setSpeakerEnabled] = useState(false);
  const [speakerVolume, setSpeakerVolume] = useState(50);

  return (
    <SafeAreaView style={gStyles.container}>
      <ModeHeader
        isActive={isActive}
        onBack={() => navigation.goBack()}
        showToggle={true}
        toggleValue={isActive}
        onToggle={() => setIsActive((v) => !v)}
        label="Karaoke Mode"
      />
      <ScrollView contentContainerStyle={{ paddingVertical: 16 }}>
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
          <MusicPlayer disabled={!isActive} />
        </View>
        <View style={gStyles.section}>
          <LightModeWidget disabled={!isActive} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
