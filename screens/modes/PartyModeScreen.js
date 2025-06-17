// screens\modes\PartyModeScreen.js

import "react-native-gesture-handler";
import React, { useState, useEffect, useCallback } from "react";
import {
  SafeAreaView,
  View,
  Pressable,
  Switch,
  StyleSheet,
  Text,
  ScrollView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import colors from "../../constants/colors";

import VolumeControlWidget from "../../components/VolumeControlWidget";
import PartySoundControl from "../../components/PartySoundControl";
import LightModeWidget from "../../components/LightModeWidget";
import MasterBroadcastWidget from "../../components/MasterBroadcastWidget";
import ChairLayoutSetup from "../../components/ChairLayoutSetup";

import {
  computeChairVolumes,
  sendVolumeToChair,
} from "../../utils/audioRouter";

const TopTabs = createMaterialTopTabNavigator();

function ControlsTab({
  disabled,
  soundMode,
  setSoundMode,
  toggles,
  setToggles,
  partyEq,
  setPartyEq,
  masterVolume,
  setMasterVolume,
}) {
  const [speakerEnabled, setSpeakerEnabled] = useState(true);

  const handleToggle = (key) =>
    setToggles((prev) => ({ ...prev, [key]: !prev[key] }));

  return (
    <ScrollView contentContainerStyle={styles.tabContent}>
      <VolumeControlWidget
        label="Speaker Volume"
        icon="volume-high"
        enabled={speakerEnabled && !disabled}
        onToggle={setSpeakerEnabled}
        value={Math.round(masterVolume * 100)}
        onValueChange={(val) => setMasterVolume(val / 100)}
        disabled={disabled}
      />

      <PartySoundControl
        value={soundMode}
        onChange={setSoundMode}
        toggles={toggles}
        onToggle={handleToggle}
        disabled={disabled}
        equalizerState={partyEq}
        onEqualizerChange={setPartyEq}
      />

      <View style={styles.section}>
        <LightModeWidget disabled={disabled} />
      </View>
    </ScrollView>
  );
}

function SetupTab({
  currentChairId,
  broadcastTargets,
  onBroadcastChange,
  layoutAssignments,
  setLayoutAssignments,
}) {
  return (
    <ScrollView contentContainerStyle={styles.tabContent}>
      <MasterBroadcastWidget
        currentChairId={currentChairId}
        onBroadcast={onBroadcastChange}
      />
      <ChairLayoutSetup
        broadcastTargets={broadcastTargets}
        layoutAssignments={layoutAssignments}
        setLayoutAssignments={setLayoutAssignments}
      />
    </ScrollView>
  );
}

export default function PartyModeScreen({
  navigation,
  connectedChair,
  disabled,
}) {
  const [isActive, setIsActive] = useState(false);
  const [broadcastTargets, setBroadcastTargets] = useState([]);
  const [layoutAssignments, setLayoutAssignments] = useState({});
  const [soundMode, setSoundMode] = useState("party");
  const [masterVolume, setMasterVolume] = useState(1); // 0–1
  const [toggles, setToggles] = useState({ surround: false, dynamic: false });
  const [partyEq, setPartyEq] = useState({
    Bass: 50,
    Mid: 50,
    Treble: 50,
  });

  // Compose custom volume map for custom mode (optional)
  const customVolumes = React.useMemo(() => {
    if (soundMode !== "custom") return {};
    // Map every position in layout to 1.0 (or allow user to define)
    const result = {};
    Object.keys(layoutAssignments).forEach((pos) => {
      // Example: let users tweak per-channel EQ if you want to use partyEq, but for now 1.0
      result[pos] = 1.0;
    });
    return result;
  }, [soundMode, layoutAssignments]);

  // Main routing effect
  useEffect(() => {
    if (!isActive) return;
    // Only include chairs that are both in broadcastTargets and assigned in layout
    const filteredLayout = Object.fromEntries(
      Object.entries(layoutAssignments).filter(([, chairId]) =>
        broadcastTargets.includes(chairId)
      )
    );
    if (!Object.keys(filteredLayout).length) return;

    const perChairVolumes = computeChairVolumes(
      filteredLayout,
      soundMode,
      masterVolume,
      customVolumes
    );

    Object.entries(perChairVolumes).forEach(([chairId, vol]) => {
      sendVolumeToChair(chairId, vol);
    });
    // Add any DSP/toggles logic here if needed
  }, [
    isActive,
    broadcastTargets,
    layoutAssignments,
    soundMode,
    masterVolume,
    customVolumes,
    toggles.surround,
    toggles.dynamic,
  ]);

  const toggleActive = () => setIsActive((v) => !v);

  return (
    <SafeAreaView style={styles.container}>
      {/* Top activation bar */}
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
          onValueChange={toggleActive}
          trackColor={{ false: colors.secondary, true: colors.primary }}
          thumbColor={isActive ? colors.accent : colors.background}
          ios_backgroundColor={colors.backgroundSecondary}
          disabled={disabled}
        />
      </View>

      <TopTabs.Navigator
        swipeEnabled={false}
        initialRouteName="Controls"
        screenOptions={{
          tabBarIndicatorStyle: { backgroundColor: colors.primary },
          tabBarLabelStyle: { fontWeight: "600" },
          tabBarActiveTintColor: colors.primary,
          tabBarInactiveTintColor: colors.secondary,
          tabBarStyle: { backgroundColor: colors.surface },
        }}
      >
        <TopTabs.Screen
          name="Controls"
          children={() => (
            <ControlsTab
              disabled={!isActive || disabled}
              soundMode={soundMode}
              setSoundMode={setSoundMode}
              toggles={toggles}
              setToggles={setToggles}
              partyEq={partyEq}
              setPartyEq={setPartyEq}
              masterVolume={masterVolume}
              setMasterVolume={setMasterVolume}
            />
          )}
          options={{ tabBarLabel: () => <Text>Controls</Text> }}
        />
        <TopTabs.Screen
          name="Setup"
          children={() => (
            <SetupTab
              currentChairId={connectedChair}
              broadcastTargets={broadcastTargets}
              onBroadcastChange={setBroadcastTargets}
              layoutAssignments={layoutAssignments}
              setLayoutAssignments={setLayoutAssignments}
            />
          )}
          options={{ tabBarLabel: () => <Text>Setup</Text> }}
        />
      </TopTabs.Navigator>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: colors.surface,
  },
  pressed: {
    opacity: 0.6,
  },
  tabContent: {
    padding: 16,
    paddingBottom: 32,
  },
  section: {
    marginBottom: 20,
  },
});
