// /components/PartySoundControl.js

import React, { useState } from "react";
import { View, Text, Switch } from "react-native";
import { Picker } from "@react-native-picker/picker";
import Slider from "@react-native-community/slider";
import gStyles from "../constants/globalStyles";
import colors from "../constants/colors";
import { partySoundModes, partySoundToggles } from "../data/partySoundMode";

export default function PartySoundControl({
  value,
  onChange,
  toggles,
  onToggle,
  disabled = false,
}) {
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
    <View style={[gStyles.card, disabled && { opacity: 0.5 }]}>
      <Text style={gStyles.label}>Party Sound Mode</Text>
      <View
        style={{
          borderRadius: 10,
          borderWidth: 1,
          borderColor: colors.primaryLight,
          backgroundColor: "#f6f6f8",
          marginBottom: 14,
          overflow: "hidden",
          width: "100%",
          minHeight: 44,
          justifyContent: "center",
        }}
      >
        <Picker
          selectedValue={value}
          onValueChange={onChange}
          dropdownIconColor={colors.primary}
          enabled={!disabled}
        >
          {partySoundModes.map((mode) => (
            <Picker.Item key={mode.key} label={mode.label} value={mode.key} />
          ))}
        </Picker>
      </View>
      <View style={{ marginBottom: 10 }}>
        {partySoundToggles.map((t) => (
          <View
            key={t.key}
            style={{
              flexDirection: "row",
              alignItems: "center",
              marginBottom: 2,
            }}
          >
            <Switch
              value={!!toggles[t.key]}
              onValueChange={() => onToggle(t.key)}
              trackColor={{ false: colors.secondary, true: colors.primary }}
              thumbColor={!!toggles[t.key] ? colors.accent : colors.background}
              disabled={disabled}
            />
            <Text
              style={{
                fontSize: 15,
                fontWeight: "500",
                color: colors.primary,
                marginLeft: 3,
                marginRight: 3,
              }}
            >
              {t.label}
            </Text>
            <Text
              style={{
                fontSize: 12,
                color: colors.secondary,
                marginLeft: 2,
                flex: 1,
              }}
            >
              {t.description}
            </Text>
          </View>
        ))}
      </View>
      {/* Equalizer shows only if mode is custom */}
      {value === "custom" && (
        <View
          style={{
            marginTop: 12,
            borderTopWidth: 1,
            borderTopColor: colors.primaryLight,
            paddingTop: 10,
          }}
        >
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
              <View
                style={{ flex: 1, alignItems: "center", marginHorizontal: 8 }}
              >
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
              <Text
                style={{
                  width: 28,
                  textAlign: "right",
                  fontSize: 13,
                  color: colors.secondary,
                }}
              >
                {equalizer[band]}
              </Text>
            </View>
          ))}
        </View>
      )}
    </View>
  );
}
