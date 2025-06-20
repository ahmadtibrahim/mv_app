// /components/PushToTalk.js

import React, { useState } from "react";
import { View, Text, Pressable, StyleSheet } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import colors from "../constants/colors";
import gStyles from "../constants/globalStyles";

export default function PushToTalk({ onPressIn, onPressOut }) {
  const [speaking, setSpeaking] = useState(false);

  return (
    <View style={[gStyles.card, styles.card]}>
      <Pressable
        onPressIn={() => {
          setSpeaking(true);
          onPressIn?.();
        }}
        onPressOut={() => {
          setSpeaking(false);
          onPressOut?.();
        }}
        style={({ pressed }) => [
          styles.btn,
          (pressed || speaking) && styles.btnActive,
        ]}
      >
        <MaterialCommunityIcons
          name="microphone"
          size={20}
          color={speaking ? "#fff" : colors.primary}
        />
        <Text
          style={[gStyles.label, styles.label, speaking && { color: "#fff" }]}
        >
          Push to Talk
        </Text>
      </Pressable>
      <Text style={[gStyles.subLabel, styles.subLabel]}>
        Hold to speak through chair speaker
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    padding: 16,
    marginVertical: 10,
    borderRadius: 18,
  },
  btn: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 6,
    backgroundColor: colors.background,
  },
  btnActive: {
    backgroundColor: colors.primary,
  },
  label: {
    marginLeft: 8,
    fontSize: 16,
    fontWeight: "600",
    color: colors.primary,
  },
  subLabel: {
    marginTop: 6,
    fontSize: 12,
    color: colors.secondary,
  },
});
