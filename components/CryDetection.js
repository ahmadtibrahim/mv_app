// /components/CryDetection.js

import React from "react";
import { View, Text, StyleSheet, Switch } from "react-native";
import { MaterialCommunityIcons, Ionicons } from "@expo/vector-icons";
import colors from "../constants/colors";
import gStyles from "../constants/globalStyles";

export default function CryDetection({
  cryEnabled = false,
  onCryToggle = () => {},
  liveEnabled = false,
  onLiveToggle = () => {},
}) {
  return (
    <View style={[gStyles.card, styles.card]}>
      <View style={styles.row}>
        <MaterialCommunityIcons
          name="baby-face-outline"
          size={20}
          color={colors.primary}
        />
        <View style={styles.texts}>
          <Text style={[gStyles.label, styles.title]}>Cry Detection</Text>
          <Text style={[gStyles.subLabel, styles.subtitle]}>
            Tap to enable/disable
          </Text>
        </View>
        <Switch
          value={cryEnabled}
          onValueChange={onCryToggle}
          trackColor={{ false: colors.secondary, true: colors.primary }}
          thumbColor={cryEnabled ? colors.accent : colors.background}
          ios_backgroundColor={colors.backgroundSecondary}
        />
      </View>

      <View style={styles.row}>
        <Ionicons name="ear-outline" size={20} color={colors.primary} />
        <View style={styles.texts}>
          <Text style={[gStyles.label, styles.title]}>Live Hear</Text>
          <Text style={[gStyles.subLabel, styles.subtitle]}>
            Keep mic on for live audio
          </Text>
        </View>
        <Switch
          value={liveEnabled}
          onValueChange={onLiveToggle}
          trackColor={{ false: colors.secondary, true: colors.primary }}
          thumbColor={liveEnabled ? colors.accent : colors.background}
          ios_backgroundColor={colors.backgroundSecondary}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    padding: 16,
    marginVertical: 5,
    borderRadius: 18,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 12,
  },
  texts: {
    flex: 1,
    marginLeft: 8,
  },
  title: {
    fontSize: 16,
    fontWeight: "600",
    color: colors.primary,
  },
  subtitle: {
    fontSize: 12,
    color: colors.secondary,
    marginTop: 2,
  },
});
