// /components/SoundModeDropdown.js

import React from "react";
import { View, Text } from "react-native";
import { Picker } from "@react-native-picker/picker";
import Slider from "@react-native-community/slider";
import gStyles from "../constants/globalStyles";
import colors from "../constants/colors";

export default function SoundModeDropdown({
  modes,
  value,
  onChange,
  showEqualizer = false,
  equalizerState,
  onEqualizerChange,
  disabled = false,
}) {
  return (
    <View style={[gStyles.card, { opacity: disabled ? 0.5 : 1 }]}>
      <Text style={gStyles.label}>Sound Mode</Text>
      <View
        style={{
          borderRadius: 10,
          borderWidth: 1,
          borderColor: colors.primaryLight,
          backgroundColor: "#f6f6f8",
          marginBottom: 10,
          overflow: "hidden",
        }}
      >
        <Picker
          selectedValue={value}
          onValueChange={onChange}
          dropdownIconColor={colors.primary}
          enabled={!disabled}
        >
          {modes.map((mode) => (
            <Picker.Item key={mode.key} label={mode.label} value={mode.key} />
          ))}
        </Picker>
      </View>
      {showEqualizer && (
        <View style={{ marginTop: 8 }}>
          <Text
            style={{
              fontWeight: "600",
              color: colors.secondary,
              marginBottom: 6,
            }}
          >
            Equalizer
          </Text>
          {["Bass", "Mid", "Treble"].map((band) => (
            <View
              key={band}
              style={{
                flexDirection: "row",
                alignItems: "center",
                marginBottom: 8,
              }}
            >
              <Text
                style={{
                  width: 60,
                  color: colors.primary,
                  fontWeight: "600",
                  fontSize: 14,
                }}
              >
                {band}
              </Text>
              <Slider
                style={{ flex: 1, marginHorizontal: 8 }}
                minimumValue={0}
                maximumValue={100}
                value={equalizerState[band]}
                onValueChange={(v) => onEqualizerChange(band, Math.round(v))}
                minimumTrackTintColor={colors.primary}
                maximumTrackTintColor={colors.muted}
                thumbTintColor={colors.primary}
                disabled={disabled}
              />
              <Text
                style={{
                  width: 28,
                  textAlign: "right",
                  fontSize: 13,
                  color: colors.secondary,
                }}
              >
                {equalizerState[band]}
              </Text>
            </View>
          ))}
        </View>
      )}
    </View>
  );
}
