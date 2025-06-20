// /screens/modes/PartyModeScreen.js

import React, { useState } from "react";
import { SafeAreaView, View, Text, ScrollView } from "react-native";
import gStyles from "../../constants/globalStyles";
import colors from "../../constants/colors";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import ModeHeader from "../../components/ModeHeader";
import VolumeControlWidget from "../../components/VolumeControlWidget";
import PartySoundControl from "../../components/PartySoundControl";
import LightModeWidget from "../../components/LightModeWidget";
import { useParty } from "../../contexts/PartyContext";
import PartySetupWizard from "./PartySetupWizard";
import MasterBroadcastWidget from "../../components/MasterBroadcastWidget"; // Optional: advanced widget

const Tab = createMaterialTopTabNavigator();

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
    <ScrollView contentContainerStyle={{ padding: 16, paddingBottom: 32 }}>
      <VolumeControlWidget
        label="Speaker Volume"
        icon="volume-high"
        enabled={speakerEnabled && !disabled}
        onToggle={setSpeakerEnabled}
        value={Math.round(masterVolume * 100)}
        onValueChange={(v) => setMasterVolume(v / 100)}
        disabled={disabled}
      />
      <PartySoundControl
        value={soundMode}
        onChange={setSoundMode}
        toggles={toggles}
        onToggle={handleToggle}
        disabled={disabled}
      />
      <View style={gStyles.section}>
        <LightModeWidget disabled={disabled} />
      </View>
    </ScrollView>
  );
}

function BroadcastTab({
  showWizard,
  onFinishWizard,
  onCancelWizard,
  soundMode,
  setSoundMode,
  toggles,
  setToggles,
  partyEq,
  setPartyEq,
  masterVolume,
  setMasterVolume,
  wizardResult,
}) {
  // After wizard, show settings/profile selection and group controls
  if (showWizard) {
    return (
      <View style={{ flex: 1 }}>
        <PartySetupWizard onFinish={onFinishWizard} onCancel={onCancelWizard} />
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={{ padding: 16, paddingBottom: 32 }}>
      <Text style={gStyles.label}>Party Broadcast Settings</Text>
      {/* Example: let user choose saved profile (future) */}
      <Text style={{ marginBottom: 14, color: colors.primary }}>
        Broadcast profile: <Text style={{ fontWeight: "600" }}>Last Used</Text>
      </Text>
      {/* Insert master controls for broadcast here: */}
      <VolumeControlWidget
        label="Master Volume"
        icon="volume-high"
        enabled={true}
        onToggle={() => {}}
        value={Math.round(masterVolume * 100)}
        onValueChange={(v) => setMasterVolume(v / 100)}
      />
      <PartySoundControl
        value={soundMode}
        onChange={setSoundMode}
        toggles={toggles}
        onToggle={(key) =>
          setToggles((prev) => ({ ...prev, [key]: !prev[key] }))
        }
      />
      <LightModeWidget />
      {/* Optionally: <MasterBroadcastWidget ... /> */}
    </ScrollView>
  );
}

function SettingsTab() {
  return (
    <View style={{ padding: 16, paddingBottom: 32 }}>
      <Text style={{ color: colors.secondary }}>
        Party Mode settings and saved profiles will appear here.
      </Text>
    </View>
  );
}

export default function PartyModeScreen({ navigation }) {
  const { connectedChair, partySetup, setPartySetup } = useParty();
  const [isActive, setIsActive] = useState(true);
  const [soundMode, setSoundMode] = useState("party");
  const [masterVolume, setMasterVolume] = useState(1);
  const [toggles, setToggles] = useState({
    surround: false,
    dynamic: false,
  });
  const [partyEq, setPartyEq] = useState({
    Bass: 50,
    Mid: 50,
    Treble: 50,
  });
  const [wizardDone, setWizardDone] = useState(!!partySetup);

  function handleFinishWizard(result) {
    setPartySetup(result);
    setWizardDone(true);
    setIsActive(true);
  }
  function handleCancelWizard() {
    navigation.goBack();
  }

  if (!connectedChair) {
    return (
      <SafeAreaView style={gStyles.container}>
        <ModeHeader
          isActive={false}
          onBack={() => navigation.goBack()}
          label="Party Mode"
        />
        <View style={[gStyles.card, { marginTop: 40, alignItems: "center" }]}>
          <Text
            style={{
              fontSize: 18,
              color: colors.primary,
              textAlign: "center",
              marginBottom: 10,
            }}
          >
            Please connect to a chair to use Party Mode.
          </Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={gStyles.container}>
      <ModeHeader
        isActive={isActive}
        onBack={() => navigation.goBack()}
        showToggle={true}
        toggleValue={isActive}
        onToggle={() => setIsActive((v) => !v)}
        label="Party Mode"
      />

      <Tab.Navigator
        initialRouteName="Controls"
        swipeEnabled={false}
        screenOptions={{
          tabBarIndicatorStyle: { backgroundColor: colors.primary },
          tabBarActiveTintColor: colors.primary,
          tabBarInactiveTintColor: colors.secondary,
          tabBarStyle: { backgroundColor: colors.surface },
        }}
      >
        <Tab.Screen name="Controls">
          {() => (
            <ControlsTab
              disabled={!isActive}
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
        </Tab.Screen>
        <Tab.Screen name="Broadcast">
          {() => (
            <BroadcastTab
              showWizard={!wizardDone}
              onFinishWizard={handleFinishWizard}
              onCancelWizard={handleCancelWizard}
              soundMode={soundMode}
              setSoundMode={setSoundMode}
              toggles={toggles}
              setToggles={setToggles}
              partyEq={partyEq}
              setPartyEq={setPartyEq}
              masterVolume={masterVolume}
              setMasterVolume={setMasterVolume}
              wizardResult={partySetup}
            />
          )}
        </Tab.Screen>
        <Tab.Screen name="Settings" component={SettingsTab} />
      </Tab.Navigator>
    </SafeAreaView>
  );
}
