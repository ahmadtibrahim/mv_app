// /screens/modes/BabyModeScreen.js

import React, { useState } from "react";
import { SafeAreaView, ScrollView, View } from "react-native";
import gStyles from "../../constants/globalStyles";
import colors from "../../constants/colors";
import ModeHeader from "../../components/ModeHeader";
import LiveCam from "../../components/LiveCam";
import PushToTalk from "../../components/PushToTalk";
import CryDetection from "../../components/CryDetection";
import MusicPlayer from "../../components/MusicPlayer";
import VolumeControlWidget from "../../components/VolumeControlWidget";

export default function BabyModeScreen({ navigation }) {
  const [isActive, setIsActive] = useState(true);
  const [cryEnabled, setCryEnabled] = useState(false);
  const [liveEnabled, setLiveEnabled] = useState(false);
  const [speakerEnabled, setSpeakerEnabled] = useState(false);
  const [speakerVolume, setSpeakerVolume] = useState(20);

  function handleCryToggle() {
    const newVal = !cryEnabled;
    setCryEnabled(newVal);
    if (newVal) setLiveEnabled(false);
  }
  function handleLiveToggle() {
    const newVal = !liveEnabled;
    setLiveEnabled(newVal);
    if (newVal) setCryEnabled(false);
  }
  function handleSnapshotPress() {}
  function handleSpeakStart() {}
  function handleSpeakEnd() {}

  return (
    <SafeAreaView style={gStyles.container}>
      <ModeHeader
        isActive={isActive}
        onBack={() => navigation.goBack()}
        showToggle={true}
        toggleValue={isActive}
        onToggle={() => setIsActive((v) => !v)}
        label="Baby Mode"
      />
      <ScrollView contentContainerStyle={{ paddingVertical: 16 }}>
        <View style={gStyles.section}>
          <LiveCam
            snapshotUri={null}
            onPressSnapshot={handleSnapshotPress}
            isDetectionActive={isActive}
            disabled={!isActive}
          />
        </View>
        <View style={gStyles.section}>
          <PushToTalk
            onPressIn={handleSpeakStart}
            onPressOut={handleSpeakEnd}
            disabled={!isActive}
          />
        </View>
        <View style={gStyles.section}>
          <CryDetection
            cryEnabled={cryEnabled}
            onCryToggle={handleCryToggle}
            liveEnabled={liveEnabled}
            onLiveToggle={handleLiveToggle}
            disabled={!isActive}
          />
        </View>
        <View style={gStyles.section}>
          <MusicPlayer disabled={!isActive} />
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
      </ScrollView>
    </SafeAreaView>
  );
}
