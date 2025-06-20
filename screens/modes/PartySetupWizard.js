// screens/modes/PartySetupWizard.js

import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import colors from "../../constants/colors";
import { availableChairs } from "../../data/availableChairs";

const STEPS = [
  "Pair Chairs",
  "Assign Roles",
  "Sound Mode",
  "Lighting",
  "Review",
];

export default function PartySetupWizard({ navigation }) {
  const [step, setStep] = useState(0);
  const [selectedChairs, setSelectedChairs] = useState([]);
  const [roleAssignments, setRoleAssignments] = useState({});
  const [soundMode, setSoundMode] = useState("party");
  const [lighting, setLighting] = useState({});

  // Step Content
  function renderStep() {
    switch (step) {
      case 0:
        // Pair Chairs
        return (
          <View>
            <Text style={styles.stepTitle}>Step 1: Pair Your Chairs</Text>
            <Text style={styles.desc}>
              Tap to select chairs to include in Party Mode.
            </Text>
            <View style={styles.chairList}>
              {availableChairs.map((c) => (
                <TouchableOpacity
                  key={c.id}
                  style={[
                    styles.chairButton,
                    selectedChairs.includes(c.id) && styles.chairButtonSelected,
                  ]}
                  onPress={() =>
                    setSelectedChairs((prev) =>
                      prev.includes(c.id)
                        ? prev.filter((id) => id !== c.id)
                        : [...prev, c.id]
                    )
                  }
                >
                  <Text
                    style={[
                      styles.chairButtonText,
                      selectedChairs.includes(c.id) && { color: "#fff" },
                    ]}
                  >
                    {c.name || c.id}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        );
      case 1:
        // Assign Roles (L/C/R etc)
        return (
          <View>
            <Text style={styles.stepTitle}>Step 2: Assign Roles</Text>
            <Text style={styles.desc}>Assign each chair a position:</Text>
            {selectedChairs.map((id, idx) => (
              <View key={id} style={styles.roleRow}>
                <Text style={styles.roleChair}>
                  {availableChairs.find((c) => c.id === id)?.name || id}
                </Text>
                <View style={styles.roleOptions}>
                  {["L", "C", "R", "Back"].map((role) => (
                    <TouchableOpacity
                      key={role}
                      style={[
                        styles.roleBtn,
                        roleAssignments[id] === role && styles.roleBtnSelected,
                      ]}
                      onPress={() =>
                        setRoleAssignments((prev) => ({ ...prev, [id]: role }))
                      }
                    >
                      <Text
                        style={
                          roleAssignments[id] === role
                            ? { color: "#fff" }
                            : { color: colors.secondary }
                        }
                      >
                        {role}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </View>
              </View>
            ))}
          </View>
        );
      case 2:
        // Sound Mode selection
        return (
          <View>
            <Text style={styles.stepTitle}>Step 3: Choose Sound Mode</Text>
            <View style={styles.soundModesRow}>
              {["party", "surround", "dynamic", "custom"].map((mode) => (
                <TouchableOpacity
                  key={mode}
                  style={[
                    styles.soundModeBtn,
                    soundMode === mode && styles.soundModeBtnActive,
                  ]}
                  onPress={() => setSoundMode(mode)}
                >
                  <Text
                    style={
                      soundMode === mode
                        ? { color: "#fff" }
                        : { color: colors.secondary }
                    }
                  >
                    {mode.charAt(0).toUpperCase() + mode.slice(1)}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        );
      case 3:
        // Lighting settings
        return (
          <View>
            <Text style={styles.stepTitle}>Step 4: Lighting Setup</Text>
            <Text style={styles.desc}>Choose a color for party lights:</Text>
            <View style={styles.colorRow}>
              {["#ff4444", "#ffe234", "#4caf50", "#1e90ff", "#fff"].map(
                (color) => (
                  <TouchableOpacity
                    key={color}
                    style={[
                      styles.colorSwatch,
                      lighting.color === color && styles.colorSwatchActive,
                      { backgroundColor: color },
                    ]}
                    onPress={() => setLighting((prev) => ({ ...prev, color }))}
                  />
                )
              )}
            </View>
          </View>
        );
      case 4:
        // Review
        return (
          <View>
            <Text style={styles.stepTitle}>Step 5: Review & Finish</Text>
            <Text style={styles.desc}>Check your party setup:</Text>
            <Text style={styles.reviewLine}>
              Chairs:{" "}
              {selectedChairs
                .map(
                  (id) => availableChairs.find((c) => c.id === id)?.name || id
                )
                .join(", ")}
            </Text>
            <Text style={styles.reviewLine}>
              Roles: {JSON.stringify(roleAssignments)}
            </Text>
            <Text style={styles.reviewLine}>Sound: {soundMode}</Text>
            <Text style={styles.reviewLine}>
              Color: {lighting.color || "None"}
            </Text>
            <TouchableOpacity
              style={styles.doneBtn}
              onPress={() => navigation.goBack()}
            >
              <Text style={styles.doneBtnText}>Finish & Return</Text>
            </TouchableOpacity>
          </View>
        );
      default:
        return null;
    }
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.card}>
        {/* Stepper Indicator */}
        <View style={styles.stepIndicator}>
          {STEPS.map((title, i) => (
            <View
              key={title}
              style={[styles.stepDot, i === step && styles.stepDotActive]}
            />
          ))}
        </View>
        {renderStep()}
        {/* Navigation */}
        <View style={styles.navRow}>
          <TouchableOpacity
            style={[styles.navBtn, step === 0 && { opacity: 0.4 }]}
            disabled={step === 0}
            onPress={() => setStep((s) => Math.max(0, s - 1))}
          >
            <Text style={styles.navBtnText}>Back</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.navBtn,
              step === STEPS.length - 1 && { opacity: 0.4 },
            ]}
            disabled={step === STEPS.length - 1}
            onPress={() => setStep((s) => Math.min(STEPS.length - 1, s + 1))}
          >
            <Text style={styles.navBtnText}>Next</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.background,
  },
  card: {
    backgroundColor: colors.surface,
    borderRadius: 18,
    margin: 20,
    padding: 18,
    minHeight: 500,
    justifyContent: "flex-start",
    shadowColor: "#222",
    shadowOpacity: 0.06,
    shadowRadius: 8,
  },
  stepIndicator: {
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 20,
  },
  stepDot: {
    width: 10,
    height: 10,
    borderRadius: 6,
    backgroundColor: "#c5d7ff",
    margin: 3,
  },
  stepDotActive: {
    backgroundColor: colors.primary,
    width: 14,
    height: 14,
  },
  stepTitle: {
    fontSize: 22,
    fontWeight: "700",
    marginBottom: 8,
    color: colors.primary,
    textAlign: "center",
    letterSpacing: 1,
  },
  desc: {
    fontSize: 15,
    color: colors.secondary,
    textAlign: "center",
    marginBottom: 18,
  },
  chairList: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    gap: 8,
  },
  chairButton: {
    paddingVertical: 12,
    paddingHorizontal: 20,
    backgroundColor: "#f0f5ff",
    borderRadius: 14,
    margin: 6,
    borderColor: colors.primaryLight,
    borderWidth: 2,
  },
  chairButtonSelected: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  chairButtonText: {
    fontWeight: "600",
    color: colors.primary,
  },
  roleRow: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 8,
    justifyContent: "center",
  },
  roleChair: {
    width: 100,
    textAlign: "right",
    marginRight: 12,
    fontWeight: "700",
    color: colors.secondary,
  },
  roleOptions: {
    flexDirection: "row",
    gap: 6,
  },
  roleBtn: {
    paddingHorizontal: 14,
    paddingVertical: 7,
    backgroundColor: "#eef2fa",
    borderRadius: 7,
    marginHorizontal: 3,
    borderWidth: 1,
    borderColor: "#bcd4ff",
  },
  roleBtnSelected: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  soundModesRow: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 8,
    marginTop: 16,
  },
  soundModeBtn: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    backgroundColor: "#f3f6fd",
    borderRadius: 12,
    marginHorizontal: 5,
    borderWidth: 1,
    borderColor: "#bfd1ff",
  },
  soundModeBtnActive: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  colorRow: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 10,
  },
  colorSwatch: {
    width: 36,
    height: 36,
    borderRadius: 18,
    margin: 8,
    borderColor: "#a0c3ff",
    borderWidth: 2,
  },
  colorSwatchActive: {
    borderColor: colors.primary,
    borderWidth: 3,
  },
  reviewLine: {
    fontSize: 16,
    marginVertical: 6,
    color: colors.secondary,
    textAlign: "center",
  },
  navRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 30,
  },
  navBtn: {
    backgroundColor: colors.primary,
    paddingHorizontal: 34,
    paddingVertical: 10,
    borderRadius: 10,
  },
  navBtnText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  doneBtn: {
    backgroundColor: colors.primary,
    paddingVertical: 14,
    borderRadius: 14,
    marginTop: 26,
    marginHorizontal: 30,
  },
  doneBtnText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 18,
    textAlign: "center",
  },
});
