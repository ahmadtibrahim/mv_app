// /components/RestControl.js

import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  useWindowDimensions,
} from "react-native";
import colors from "../constants/colors";

export default function RestControl({ label, onPress, disabled = false }) {
  const { width } = useWindowDimensions();
  const isTablet = width > 600;
  const widgetWidth = isTablet ? 500 : width * 0.9;

  return (
    <View
      style={[
        styles.card,
        {
          width: widgetWidth,
          alignSelf: "center",
          opacity: disabled ? 0.5 : 1,
        },
      ]}
    >
      <Text style={styles.label}>{label}</Text>
      <View style={styles.row}>
        <ControlButton
          label="≪"
          onPress={() => !disabled && onPress("back_fast")}
        />
        <ControlButton
          label="＜"
          onPress={() => !disabled && onPress("back")}
        />
        <ControlButton
          label="＞"
          onPress={() => !disabled && onPress("forward")}
        />
        <ControlButton
          label="≫"
          onPress={() => !disabled && onPress("forward_fast")}
        />
      </View>
    </View>
  );
}

function ControlButton({ label, onPress }) {
  return (
    <TouchableOpacity style={styles.button} onPress={onPress}>
      <Text style={styles.buttonText}>{label}</Text>
    </TouchableOpacity>
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
  label: {
    fontSize: 20,
    fontWeight: "600",
    marginBottom: 12,
    color: colors.secondary,
    alignSelf: "flex-start",
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
  button: {
    backgroundColor: colors.primary,
    paddingVertical: 16,
    paddingHorizontal: 18,
    borderRadius: 12,
    marginHorizontal: 6,
  },
  buttonText: {
    color: colors.surface,
    fontSize: 22,
    fontWeight: "bold",
  },
});
