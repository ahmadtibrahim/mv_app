import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Alert,
  StyleSheet,
  TextInput,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import colors from "../constants/colors";

const chairLayoutsRow = {
  1: [""],
  2: ["L", "R"],
  3: ["L", "C", "R"],
  4: ["R", "RC", "CL", "L"],
};
const chairLayoutsSquare = ["RF", "RR", "LF", "LR"];

export default function SetupWizard({
  step,
  setStep,
  chairs = [],
  ceilingLights = [],
  ceilingLayout,
  setCeilingLayout,
  profileName,
  setProfileName,
  saveProfileHandler,
  navigateHome,
  savedProfiles = [],
  chairConnectedMap,
  setChairConnectedMap,
  chairLayoutMap,
  setChairLayoutMap,
  lightConnectedMap,
  setLightConnectedMap,
  lightLayoutMap,
  setLightLayoutMap,
}) {
  useEffect(() => {
    if (!profileName || profileName.trim() === "") {
      const defaultIndex = savedProfiles.length + 1;
      setProfileName(`Settings ${defaultIndex}`);
    }
  }, []);

  const connectedChairs = chairs.filter((c) => chairConnectedMap[c.id]);
  const connectedLights = ceilingLights.filter((l) => lightConnectedMap[l.id]);

  const getLayoutOptions = (count, layoutType) => {
    if (layoutType === "square" && count >= 4) return chairLayoutsSquare;
    return chairLayoutsRow[count] || [];
  };

  const chairLayoutOptions = getLayoutOptions(
    connectedChairs.length,
    connectedChairs.length >= 4 ? ceilingLayout : "row"
  );
  const usedChairLayouts = Object.values(chairLayoutMap).filter(Boolean);

  const lightLayoutOptions = getLayoutOptions(
    connectedLights.length,
    connectedLights.length >= 4 ? ceilingLayout : "row"
  );
  const usedLightLayouts = Object.values(lightLayoutMap).filter(Boolean);

  const toggleChairConnected = (id) => {
    setChairConnectedMap((prev) => {
      const newVal = !prev[id];
      if (!newVal) {
        setChairLayoutMap((layouts) => {
          const copy = { ...layouts };
          delete copy[id];
          return copy;
        });
      }
      return { ...prev, [id]: newVal };
    });
  };

  const toggleLightConnected = (id) => {
    setLightConnectedMap((prev) => {
      const newVal = !prev[id];
      if (!newVal) {
        setLightLayoutMap((layouts) => {
          const copy = { ...layouts };
          delete copy[id];
          return copy;
        });
      }
      return { ...prev, [id]: newVal };
    });
  };

  const onSelectChairLayout = (chairId, layout) => {
    if (
      usedChairLayouts.includes(layout) &&
      chairLayoutMap[chairId] !== layout
    ) {
      Alert.alert("Layout already assigned to another chair");
      return;
    }
    setChairLayoutMap((prev) => ({ ...prev, [chairId]: layout }));
  };

  const onSelectLightLayout = (lightId, layout) => {
    if (
      usedLightLayouts.includes(layout) &&
      lightLayoutMap[lightId] !== layout
    ) {
      Alert.alert("Layout already assigned to another light");
      return;
    }
    setLightLayoutMap((prev) => ({ ...prev, [lightId]: layout }));
  };

  if (step === 1) {
    return (
      <View style={styles.step1Container}>
        <Text style={styles.title}>Step 1: Connect to HD Sync Box</Text>
        <Text style={{ marginTop: 16, fontSize: 16, color: colors.secondary }}>
          Tap the button below to begin the setup wizard.
        </Text>
        <TouchableOpacity
          style={[styles.navButton, { marginTop: 36 }]}
          onPress={() => setStep(2)}
        >
          <Text style={styles.navButtonText}>Start Setup Wizard</Text>
        </TouchableOpacity>
      </View>
    );
  }

  if (step === 2) {
    const showLayoutSelector =
      connectedChairs.length >= 4 || connectedLights.length >= 4;

    return (
      <ScrollView
        style={styles.container}
        contentContainerStyle={{ paddingBottom: 120 }}
        keyboardShouldPersistTaps="handled"
      >
        <Text style={styles.title}>Step 2: Setup Layout</Text>

        <Text style={styles.sectionTitle}>Chairs</Text>
        {chairs.map((chair) => (
          <View key={chair.id} style={styles.row}>
            <Text style={styles.name}>{chair.name}</Text>
            <TouchableOpacity
              style={[
                styles.connectButton,
                chairConnectedMap[chair.id] && styles.connectedButton,
              ]}
              onPress={() => toggleChairConnected(chair.id)}
            >
              <Text
                style={[
                  styles.connectText,
                  chairConnectedMap[chair.id] && styles.connectedText,
                ]}
              >
                {chairConnectedMap[chair.id] ? "Connected" : "Connect"}
              </Text>
            </TouchableOpacity>
            {chairConnectedMap[chair.id] && connectedChairs.length > 1 && (
              <Picker
                selectedValue={chairLayoutMap[chair.id] || ""}
                style={[
                  styles.picker,
                  { color: colors.primary, height: 50, width: 170 },
                ]}
                dropdownIconColor={colors.primary}
                itemStyle={{ color: colors.primary, height: 50 }}
                onValueChange={(val) => onSelectChairLayout(chair.id, val)}
              >
                <Picker.Item label="select" value="" color={colors.secondary} />
                {chairLayoutOptions
                  .filter(
                    (opt) =>
                      opt === chairLayoutMap[chair.id] ||
                      !usedChairLayouts.includes(opt)
                  )
                  .map((opt) => (
                    <Picker.Item
                      key={opt}
                      label={opt}
                      value={opt}
                      color={colors.primary}
                    />
                  ))}
              </Picker>
            )}
          </View>
        ))}

        <Text style={[styles.sectionTitle, { marginTop: 30 }]}>
          Ceiling RGB Lights
        </Text>
        {ceilingLights.map((light) => (
          <View key={light.id} style={styles.row}>
            <Text style={styles.name}>{light.name}</Text>
            <TouchableOpacity
              style={[
                styles.connectButton,
                lightConnectedMap[light.id] && styles.connectedButton,
              ]}
              onPress={() => toggleLightConnected(light.id)}
            >
              <Text
                style={[
                  styles.connectText,
                  lightConnectedMap[light.id] && styles.connectedText,
                ]}
              >
                {lightConnectedMap[light.id] ? "Connected" : "Connect"}
              </Text>
            </TouchableOpacity>
            {lightConnectedMap[light.id] && connectedLights.length > 1 && (
              <Picker
                selectedValue={lightLayoutMap[light.id] || ""}
                style={[
                  styles.picker,
                  { color: colors.primary, height: 50, width: 170 },
                ]}
                dropdownIconColor={colors.primary}
                itemStyle={{ color: colors.primary, height: 50 }}
                onValueChange={(val) => onSelectLightLayout(light.id, val)}
              >
                <Picker.Item label="select" value="" color={colors.secondary} />
                {lightLayoutOptions
                  .filter(
                    (opt) =>
                      opt === lightLayoutMap[light.id] ||
                      !usedLightLayouts.includes(opt)
                  )
                  .map((opt) => (
                    <Picker.Item
                      key={opt}
                      label={opt}
                      value={opt}
                      color={colors.primary}
                    />
                  ))}
              </Picker>
            )}
          </View>
        ))}

        {showLayoutSelector && (
          <View style={{ flexDirection: "row", marginTop: 20 }}>
            <TouchableOpacity
              style={[
                styles.layoutOption,
                ceilingLayout === "square" && styles.layoutOptionSelected,
              ]}
              onPress={() => setCeilingLayout("square")}
            >
              <Text
                style={[
                  styles.layoutOptionText,
                  ceilingLayout === "square" && styles.layoutOptionTextSelected,
                ]}
              >
                Square
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.layoutOption,
                ceilingLayout === "row" && styles.layoutOptionSelected,
              ]}
              onPress={() => setCeilingLayout("row")}
            >
              <Text
                style={[
                  styles.layoutOptionText,
                  ceilingLayout === "row" && styles.layoutOptionTextSelected,
                ]}
              >
                Row
              </Text>
            </TouchableOpacity>
          </View>
        )}

        <View style={{ marginTop: 30, marginBottom: 10 }}>
          <Text style={styles.sectionTitle}>Profile Name</Text>
          <TextInput
            style={styles.input}
            value={profileName}
            onChangeText={setProfileName}
            placeholder="Enter profile name"
            placeholderTextColor="#888"
            returnKeyType="done"
          />
        </View>

        <View
          style={{
            flexDirection: "row",
            justifyContent: "flex-end",
            marginTop: 20,
            marginBottom: 20,
          }}
        >
          <TouchableOpacity
            style={[styles.navButton, { marginRight: 12 }]}
            onPress={() => setStep(1)}
          >
            <Text style={styles.navButtonText}>Back</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.navButton}
            onPress={() => {
              const trimmedName = profileName?.trim();
              if (!trimmedName) {
                const defaultIndex = savedProfiles.length + 1;
                const defaultName = `Settings ${defaultIndex}`;
                setProfileName(defaultName);
                setTimeout(() => {
                  saveProfileHandler({
                    chairConnectedMap,
                    chairLayoutMap,
                    lightConnectedMap,
                    lightLayoutMap,
                    ceilingLayout,
                    name: defaultName, // use `name` prop here
                  });
                  navigateHome();
                }, 50);
                return;
              }
              saveProfileHandler({
                chairConnectedMap,
                chairLayoutMap,
                lightConnectedMap,
                lightLayoutMap,
                ceilingLayout,
                name: trimmedName, // use `name` prop here
              });
              navigateHome();
            }}
          >
            <Text style={styles.navButtonText}>Save & Activate</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    );
  }

  return null;
}

const styles = StyleSheet.create({
  step1Container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 24,
    backgroundColor: colors.background,
  },
  container: { flex: 1, padding: 20, backgroundColor: colors.background },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    color: colors.primary,
    marginBottom: 10,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: colors.primary,
    marginBottom: 10,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },
  name: {
    flex: 1,
    fontSize: 16,
    color: colors.primary,
  },
  connectButton: {
    paddingVertical: 6,
    paddingHorizontal: 14,
    borderRadius: 6,
    backgroundColor: "#ccc",
  },
  connectedButton: {
    backgroundColor: colors.primary,
  },
  connectText: {
    color: "#000",
    fontWeight: "bold",
  },
  connectedText: {
    color: "#fff",
  },
  picker: {
    width: 140,
    height: 40,
    marginLeft: 12,
    color: colors.primary,
  },
  layoutOption: {
    paddingVertical: 10,
    paddingHorizontal: 24,
    borderWidth: 1,
    borderColor: colors.secondary,
    borderRadius: 8,
    marginRight: 12,
  },
  layoutOptionSelected: {
    backgroundColor: colors.primary,
  },
  layoutOptionText: {
    color: colors.secondary,
    fontSize: 16,
  },
  layoutOptionTextSelected: {
    color: "#fff",
    fontWeight: "bold",
  },
  navButton: {
    backgroundColor: colors.primary,
    paddingVertical: 12,
    paddingHorizontal: 28,
    borderRadius: 8,
  },
  navButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
  },
  input: {
    height: 40,
    borderColor: colors.secondary,
    borderWidth: 1,
    borderRadius: 6,
    paddingHorizontal: 10,
    color: colors.primary,
    backgroundColor: "#fff",
  },
});
