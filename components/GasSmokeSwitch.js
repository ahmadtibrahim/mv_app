import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Switch,
  useWindowDimensions,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import colors from "../constants/colors";

export default function GasSmokeSwitch({ value, onValueChange }) {
  const { width } = useWindowDimensions();
  const isTablet = width > 600;
  const widgetWidth = isTablet ? 500 : width * 0.9;

  return (
    <View style={[styles.card, { width: widgetWidth, alignSelf: "center" }]}>
      <View style={styles.row}>
        <View style={styles.iconCircle}>
          <Ionicons name="warning-outline" size={22} color="#fff" />
        </View>
        <Text style={styles.label}>Gas / Smoke Detector</Text>
        <View style={{ flex: 1 }} />
        <Switch
          value={value}
          onValueChange={onValueChange}
          trackColor={{ false: colors.muted, true: colors.primary }}
          thumbColor={value ? colors.primary : "#fff"}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.surface,
    borderRadius: 18,
    padding: 16,
    marginVertical: 10,
    elevation: 3,
    shadowColor: colors.primary,
    shadowOpacity: 0.14,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
    borderWidth: 1,
    borderColor: colors.primaryLight,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  iconCircle: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: colors.primary,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 8,
  },
  label: {
    fontSize: 18,
    fontWeight: "600",
    color: colors.secondary,
    letterSpacing: 0.3,
  },
});
