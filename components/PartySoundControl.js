// components\PartySoundControl.js

import React, { useState } from "react";
import {
  View,
  Text,
  Switch,
  StyleSheet,
  useWindowDimensions,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import Slider from "@react-native-community/slider";
import { partySoundModes, partySoundToggles } from "../data/partySoundMode";
import colors from "../constants/colors";

export default function PartySoundControl({
  value,
  onChange,
  toggles,
  onToggle,
  disabled,
}) {
  const { width } = useWindowDimensions();
  const widgetWidth = width > 600 ? 500 : width * 0.9;

  // Equalizer state for custom mode
  const [equalizer, setEqualizer] = useState({
    Bass: 50,
    Mid: 50,
    Treble: 50,
  });

  const handleEqChange = (band, val) => {
    setEqualizer((eq) => ({ ...eq, [band]: Math.round(val) }));
  };

  return (
    <View style={[styles.card, { width: widgetWidth, alignSelf: "center" }]}>
      <Text style={styles.label}>Party Sound Mode</Text>
      <View style={styles.pickerWrap}>
        <Picker
          selectedValue={value}
          onValueChange={onChange}
          style={styles.picker}
          dropdownIconColor={colors.primary}
          enabled={!disabled}
        >
          {partySoundModes.map((mode) => (
            <Picker.Item key={mode.key} label={mode.label} value={mode.key} />
          ))}
        </Picker>
      </View>
      <View style={styles.togglesWrap}>
        {partySoundToggles.map((t) => (
          <View key={t.key} style={styles.toggleRow}>
            <Switch
              value={!!toggles[t.key]}
              onValueChange={() => onToggle(t.key)}
              trackColor={{ false: colors.secondary, true: colors.primary }}
              thumbColor={!!toggles[t.key] ? colors.accent : colors.background}
              disabled={disabled}
            />
            <Text style={styles.toggleLabel}>{t.label}</Text>
            <Text style={styles.toggleDesc}>{t.description}</Text>
          </View>
        ))}
      </View>
      {/* Equalizer shows only if mode is custom */}
      {value === "custom" && (
        <View style={styles.eqWrap}>
          <Text style={styles.eqLabel}>Equalizer</Text>
          {["Bass", "Mid", "Treble"].map((band) => (
            <View key={band} style={styles.sliderRow}>
              <Text style={styles.bandLabel}>{band}</Text>
              <View style={styles.sliderBg}>
                <Slider
                  style={{ width: 120 }}
                  minimumValue={0}
                  maximumValue={100}
                  value={equalizer[band]}
                  onValueChange={(v) => handleEqChange(band, v)}
                  minimumTrackTintColor={colors.primary}
                  maximumTrackTintColor={colors.muted}
                  thumbTintColor={colors.primary}
                  disabled={disabled}
                />
              </View>
              <Text style={styles.valueLabel}>{equalizer[band]}</Text>
            </View>
          ))}
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.surface,
    borderRadius: 18,
    padding: 14,
    marginVertical: 12,
    borderWidth: 1,
    borderColor: colors.primaryLight,
    alignSelf: "center",
  },
  label: {
    fontWeight: "700",
    fontSize: 17,
    color: colors.primary,
    marginBottom: 8,
  },
  pickerWrap: {
    borderRadius: 10,
    borderWidth: 1,
    borderColor: colors.primaryLight,
    backgroundColor: "#f6f6f8",
    marginBottom: 10,
    overflow: "hidden",
    width: "100%",
    minHeight: 44,
    justifyContent: "center",
  },
  picker: {
    flex: 1,
    color: colors.secondary,
    fontSize: 16,
    paddingLeft: 8,
    minHeight: 44,
    width: "100%",
  },
  togglesWrap: {
    marginTop: 10,
  },
  toggleRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  toggleLabel: {
    fontWeight: "600",
    fontSize: 15,
    color: colors.primary,
    marginLeft: 12,
    minWidth: 80,
  },
  toggleDesc: {
    fontSize: 13,
    color: colors.secondary,
    marginLeft: 10,
    flex: 1,
  },
  eqWrap: {
    marginTop: 18,
    marginBottom: 2,
  },
  eqLabel: {
    fontWeight: "600",
    color: colors.secondary,
    marginBottom: 6,
    marginLeft: 2,
  },
  sliderRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  bandLabel: {
    width: 60,
    color: colors.primary,
    fontWeight: "600",
    fontSize: 14,
  },
  sliderBg: {
    flex: 1,
    alignItems: "center",
    marginHorizontal: 8,
  },
  valueLabel: {
    width: 28,
    textAlign: "right",
    fontSize: 13,
    color: colors.secondary,
  },
});
