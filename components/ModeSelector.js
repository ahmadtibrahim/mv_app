// components/ModeSelector.js

import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  useWindowDimensions,
} from "react-native";
import colors from "../constants/colors";
import { Ionicons } from "@expo/vector-icons";

export default function ModeSelector({
  label,
  options,
  selected,
  onSelect,
  icon,
  footer,
  headerRight,
}) {
  const { width } = useWindowDimensions();
  const isTablet = width > 600;
  const widgetWidth = isTablet ? 500 : width * 0.9;

  return (
    <View style={[styles.card, { width: widgetWidth, alignSelf: "center" }]}>
      <View style={styles.titleRow}>
        <View style={styles.iconCircle}>
          <Ionicons name={icon} size={22} color="#fff" />
        </View>
        <Text style={styles.label}>{label}</Text>
        {headerRight && <View style={styles.headerRight}>{headerRight}</View>}
      </View>
      <View style={styles.row}>
        {options.map((option) => (
          <TouchableOpacity
            key={option}
            style={[styles.button, selected === option && styles.buttonActive]}
            onPress={() => onSelect(option)}
          >
            <Text
              style={[
                styles.buttonText,
                selected === option && styles.buttonTextActive,
              ]}
            >
              {option}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
      {footer}
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
  titleRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
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
    fontSize: 20,
    fontWeight: "600",
    color: colors.secondary,
    alignSelf: "flex-start",
    letterSpacing: 0.3,
  },
  headerRight: {
    flexDirection: "row",
    alignItems: "center",
    marginLeft: "auto",
    gap: 6,
  },
  row: {
    flexDirection: "row",
    flexWrap: "nowrap",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 4,
    gap: 3,
  },
  button: {
    backgroundColor: colors.primary,
    paddingVertical: 12,
    paddingHorizontal: 12,
    borderRadius: 13,
    marginHorizontal: 2,
    minWidth: 52,
    alignItems: "center",
    borderWidth: 2,
    borderColor: colors.primary,
    marginBottom: 0,
  },
  buttonActive: {
    backgroundColor: "#fff",
    borderColor: colors.primary,
  },
  buttonText: {
    color: "#fff",
    fontSize: 15,
    fontWeight: "bold",
    letterSpacing: 0.2,
  },
  buttonTextActive: {
    color: colors.primary,
  },
});
