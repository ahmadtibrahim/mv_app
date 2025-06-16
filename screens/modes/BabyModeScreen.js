// screens/modes/BabyModeScreen.js

import React, { useState } from "react";
import {
  SafeAreaView,
  View,
  StyleSheet,
  Switch,
  Pressable,
  ScrollView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import LiveCam from "../../components/LiveCam";
import PushToTalk from "../../components/PushToTalk";
import CryDetection from "../../components/CryDetection";
import MusicPlayer from "../../components/MusicPlayer";
import VolumeControlWidget from "../../components/VolumeControlWidget";
import colors from "../../constants/colors";

const BabyModeScreen = ({ navigation }) => {
  const [isActive, setIsActive] = useState(false);
  const [cryEnabled, setCryEnabled] = useState(false);
  const [liveEnabled, setLiveEnabled] = useState(false);
  const [speakerEnabled, setSpeakerEnabled] = useState(false);
  const [speakerVolume, setSpeakerVolume] = useState(20);

  const toggleSwitch = () => setIsActive((prev) => !prev);

  const handleCryToggle = () => {
    const newVal = !cryEnabled;
    setCryEnabled(newVal);
    if (newVal) setLiveEnabled(false);
  };
  const handleLiveToggle = () => {
    const newVal = !liveEnabled;
    setLiveEnabled(newVal);
    if (newVal) setCryEnabled(false);
  };

  const handleSnapshotPress = () => console.log("Live view activated");
  const handleSpeakStart = () => console.log("Speak start");
  const handleSpeakEnd = () => console.log("Speak end");

  return (
    <SafeAreaView style={styles.container}>
      {/* Activation Header */}
      <View style={styles.header}>
        <Pressable
          onPress={() => navigation.goBack()}
          disabled={isActive}
          style={({ pressed }) => (pressed ? styles.pressed : null)}
        >
          <Ionicons
            name="arrow-back"
            size={24}
            color={isActive ? colors.secondary : colors.primary}
          />
        </Pressable>
        <Switch
          value={isActive}
          onValueChange={toggleSwitch}
          trackColor={{ false: colors.secondary, true: colors.primary }}
          thumbColor={isActive ? colors.accent : colors.background}
          ios_backgroundColor={colors.backgroundSecondary}
        />
      </View>

      {/* Scrollable Content */}
      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.section}>
          <LiveCam
            snapshotUri={null}
            onPressSnapshot={handleSnapshotPress}
            isDetectionActive={isActive}
          />
        </View>

        <View style={styles.section}>
          <PushToTalk
            onPressIn={handleSpeakStart}
            onPressOut={handleSpeakEnd}
          />
        </View>

        <View style={styles.section}>
          <CryDetection
            cryEnabled={cryEnabled}
            onCryToggle={handleCryToggle}
            liveEnabled={liveEnabled}
            onLiveToggle={handleLiveToggle}
          />
        </View>

        <View style={styles.section}>
          <MusicPlayer />
        </View>

        <View style={styles.section}>
          <VolumeControlWidget
            label="Speaker Volume"
            icon="volume-high"
            enabled={speakerEnabled}
            onToggle={setSpeakerEnabled}
            value={speakerVolume}
            onValueChange={setSpeakerVolume}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default BabyModeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  content: {
    padding: 16,
  },
  section: {
    marginBottom: 10, // reduced from 24 to ~10 (60% less)
  },
  pressed: {
    opacity: 0.6,
  },
});
