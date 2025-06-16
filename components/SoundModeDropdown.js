// components/SoundModeDropdown.js

import React from "react";
import { View, Text, StyleSheet, useWindowDimensions } from "react-native";
import { Picker } from "@react-native-picker/picker";
import Slider from "@react-native-community/slider";
import colors from "../constants/colors";

export default function SoundModeDropdown({
  modes = [],
  value,
  onChange,
  showEqualizer,
  equalizerState,
  onEqualizerChange,
}) {
  const { width } = useWindowDimensions();
  const isTablet = width > 600;
  const widgetWidth = isTablet ? 500 : width * 0.9;

  return (
    <View style={[styles.card, { width: widgetWidth, alignSelf: "center" }]}>
      <Text style={styles.label}>Sound Mode</Text>
      <View style={styles.pickerWrap}>
        <Picker
          selectedValue={value}
          onValueChange={onChange}
          style={styles.picker}
          dropdownIconColor={colors.primary}
        >
          {modes.map((mode) => (
            <Picker.Item key={mode.key} label={mode.label} value={mode.key} />
          ))}
        </Picker>
      </View>
      {showEqualizer && equalizerState && onEqualizerChange && (
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
                  value={equalizerState[band]}
                  onValueChange={(value) =>
                    onEqualizerChange(band, Math.round(value))
                  }
                  minimumTrackTintColor={colors.primary}
                  maximumTrackTintColor={colors.muted}
                  thumbTintColor={colors.primary}
                />
              </View>
              <Text style={styles.valueLabel}>{equalizerState[band]}</Text>
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
    marginBottom: 8,
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
  eqWrap: {
    marginTop: 16,
  },
  eqLabel: {
    fontWeight: "600",
    color: colors.secondary,
    marginBottom: 4,
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
