// screens/ModesScreen.js

import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  useWindowDimensions,
} from "react-native";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import colors from "../constants/colors";

// List of modes
const MODES = [
  {
    key: "Standard",
    icon: <Ionicons name="apps" size={32} color="#fff" />,
    color: "#3c82f7",
    screen: "StandardMode",
  },
  {
    key: "Game",
    icon: <Ionicons name="game-controller" size={32} color="#fff" />,
    color: "#a259fa",
    // screen: "GameMode"
  },
  {
    key: "Movie",
    icon: <Ionicons name="film" size={32} color="#fff" />,
    color: "#ff6954",
    // screen: "MovieMode"
  },
  {
    key: "Party",
    icon: <Ionicons name="balloon" size={32} color="#fff" />,
    color: "#f4c141",
    // screen: "PartyMode"
  },
  {
    key: "Relax",
    icon: <Ionicons name="cafe" size={32} color="#fff" />,
    color: "#50e3c2",
    // screen: "RelaxMode"
  },
  {
    key: "Karaoke",
    icon: <Ionicons name="mic" size={32} color="#fff" />,
    color: "#ff85a1",
    // screen: "KaraokeMode"
  },
  {
    key: "Baby",
    icon: (
      <MaterialCommunityIcons
        name="baby-bottle-outline"
        size={32}
        color="#fff"
      />
    ),
    color: "#65d4ff",
    screen: "BabyMode", // ← updated to match App.js registration
  },
  {
    key: "Security",
    icon: <Ionicons name="shield-checkmark" size={32} color="#fff" />,
    color: "#677cf5",
    // screen: "SecurityMode"
  },
];

export default function ModesScreen() {
  const navigation = useNavigation();
  const { width } = useWindowDimensions();
  const isTablet = width > 600;
  const widgetWidth = isTablet ? 500 : width * 0.9;

  return (
    <View style={[styles.container, { width: widgetWidth }]}>
      <Text style={styles.title}>Modes</Text>
      <View style={styles.grid}>
        {MODES.map(({ key, icon, color, screen }) => (
          <TouchableOpacity
            key={key}
            style={styles.modeButton}
            activeOpacity={0.7}
            onPress={screen ? () => navigation.navigate(screen) : undefined}
          >
            <View style={[styles.iconCircle, { backgroundColor: color }]}>
              {icon}
            </View>
            <Text style={styles.modeLabel}>{key}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignSelf: "center",
    paddingTop: 16,
    paddingBottom: 8,
    flex: 1,
    backgroundColor: colors.background,
  },
  title: {
    fontSize: 26,
    fontWeight: "700",
    color: colors.primary,
    alignSelf: "center",
    marginBottom: 16,
    letterSpacing: 1,
  },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    gap: 8,
  },
  modeButton: {
    alignItems: "center",
    justifyContent: "center",
    width: "23%",
    marginVertical: 12,
    minWidth: 72,
    maxWidth: 100,
  },
  iconCircle: {
    width: 62,
    height: 62,
    borderRadius: 31,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 6,
    elevation: 2,
    shadowColor: "#444",
    shadowOpacity: 0.09,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
  },
  modeLabel: {
    fontSize: 14,
    fontWeight: "600",
    color: colors.secondary,
    textAlign: "center",
    marginTop: 2,
    letterSpacing: 0.2,
  },
});
