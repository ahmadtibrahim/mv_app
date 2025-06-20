// components/GreyOutOverlay.js

import React from "react";
import { View, StyleSheet } from "react-native";

export default function GreyOutOverlay({ disabled = false, children }) {
  return (
    <View style={{ flex: 1 }}>
      {children}
      {disabled && <View style={styles.overlay} pointerEvents="auto" />}
    </View>
  );
}

const styles = StyleSheet.create({
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(220,220,220,0.5)",
    zIndex: 100,
  },
});
