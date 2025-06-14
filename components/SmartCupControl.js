// components/SmartCupControl.js

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

export default function SmartCupControl({ onAction, state = "off" }) {
  const { width } = useWindowDimensions();
  const isTablet = width > 600;
  const widgetWidth = isTablet ? 500 : width * 0.9;

  return (
    <View style={[styles.card, { width: widgetWidth, alignSelf: "center" }]}>
      <Text style={styles.label}>Smart Cup</Text>
      <TouchableOpacity
        style={styles.openButton}
        onPress={() => onAction("open")}
      >
        <Text style={styles.openButtonText}>Open</Text>
      </TouchableOpacity>
      {/* Controls row */}
      <View style={styles.mainRow}>
        {/* HOT controls */}
        <View style={styles.sideGroup}>
          <View style={styles.buttonRow}>
            <TouchableOpacity
              style={[
                styles.tempButton,
                styles.hotButton,
                state === "hot2" && styles.activeHot,
              ]}
              onPress={() => onAction("hot2")}
            >
              <Text style={styles.tempButtonText}>≪</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.tempButton,
                styles.hotButton,
                state === "hot1" && styles.activeHot,
              ]}
              onPress={() => onAction("hot1")}
            >
              <Text style={styles.tempButtonText}>＜</Text>
            </TouchableOpacity>
          </View>
          <Text style={styles.sideLabel}>Hot</Text>
        </View>
        {/* Center cup/off */}
        <TouchableOpacity
          style={[
            styles.centerButton,
            state === "off" && { backgroundColor: colors.secondary },
          ]}
          onPress={() => onAction("off")}
        >
          <Ionicons
            name="cafe-outline"
            size={28}
            color="#fff"
            style={{ marginBottom: 2 }}
          />
          <Text style={styles.centerButtonText}>Off</Text>
        </TouchableOpacity>
        {/* COLD controls */}
        <View style={styles.sideGroup}>
          <View style={styles.buttonRow}>
            <TouchableOpacity
              style={[
                styles.tempButton,
                styles.coldButton,
                state === "cold1" && styles.activeCold,
              ]}
              onPress={() => onAction("cold1")}
            >
              <Text style={styles.tempButtonText}>＞</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.tempButton,
                styles.coldButton,
                state === "cold2" && styles.activeCold,
              ]}
              onPress={() => onAction("cold2")}
            >
              <Text style={styles.tempButtonText}>≫</Text>
            </TouchableOpacity>
          </View>
          <Text style={styles.sideLabel}>Cold</Text>
        </View>
      </View>
      <TouchableOpacity
        style={styles.openButton}
        onPress={() => onAction("close")}
      >
        <Text style={styles.openButtonText}>Close</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.surface,
    borderRadius: 22,
    padding: 16,
    marginVertical: 14,
    elevation: 4,
    shadowColor: colors.primary,
    shadowOpacity: 0.11,
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 9,
    borderWidth: 1.5,
    borderColor: colors.primaryLight,
  },
  label: {
    fontSize: 21,
    fontWeight: "700",
    marginBottom: 10,
    color: colors.secondary,
    letterSpacing: 1.2,
    alignSelf: "center",
  },
  mainRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 10,
    gap: 18,
  },
  sideGroup: {
    alignItems: "center",
    justifyContent: "center",
    minWidth: 100,
  },
  buttonRow: {
    flexDirection: "row",
    gap: 7,
  },
  tempButton: {
    width: 48,
    height: 48,
    borderRadius: 14,
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 2,
    backgroundColor: colors.muted,
    elevation: 2,
  },
  hotButton: {
    backgroundColor: "#ff4646",
  },
  coldButton: {
    backgroundColor: "#20b6ff",
  },
  activeHot: {
    borderWidth: 2.5,
    borderColor: "#ff6f61",
    backgroundColor: "#ff4646ee",
  },
  activeCold: {
    borderWidth: 2.5,
    borderColor: "#22d7ff",
    backgroundColor: "#20b6ffee",
  },
  tempButtonText: {
    fontSize: 22,
    fontWeight: "bold",
    color: colors.surface,
  },
  sideLabel: {
    fontSize: 13,
    color: colors.muted,
    marginTop: 6,
    fontWeight: "500",
    alignSelf: "center",
  },
  centerButton: {
    width: 68,
    height: 68,
    borderRadius: 34,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#3c3c44",
    elevation: 4,
    marginHorizontal: 14,
    marginVertical: 0,
  },
  centerButtonText: {
    fontSize: 15,
    color: "#fff",
    fontWeight: "700",
    letterSpacing: 0.6,
  },
  openButton: {
    backgroundColor: "#ececec",
    borderRadius: 9,
    paddingVertical: 6,
    paddingHorizontal: 22,
    marginVertical: 5,
    borderWidth: 1,
    borderColor: colors.primaryLight,
    alignSelf: "center",
  },
  openButtonText: {
    color: colors.primary,
    fontWeight: "bold",
    fontSize: 16,
    letterSpacing: 0.5,
  },
});
