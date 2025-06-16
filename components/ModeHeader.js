import React from "react";
import { View, TouchableOpacity, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function ModeHeader({
  isActive,
  onBack,
  showToggle,
  toggleValue,
  onToggle,
}) {
  return (
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        paddingHorizontal: 10,
        height: 56,
        marginTop: 2,
      }}
    >
      <TouchableOpacity
        disabled={isActive}
        onPress={!isActive ? onBack : undefined}
        style={{ padding: 8 }}
      >
        <Ionicons
          name="arrow-back"
          size={28}
          color={isActive ? "#bbb" : "#397afc"}
        />
      </TouchableOpacity>
      {showToggle && (
        <TouchableOpacity
          onPress={onToggle}
          style={{
            flexDirection: "row",
            alignItems: "center",
            padding: 7,
            borderRadius: 15,
            backgroundColor: toggleValue ? "#4b7bec" : "#eee",
          }}
        >
          <Ionicons
            name={toggleValue ? "power" : "power-outline"}
            size={22}
            color={toggleValue ? "#fff" : "#bbb"}
          />
          <Text
            style={{
              color: toggleValue ? "#fff" : "#bbb",
              fontWeight: "700",
              marginLeft: 6,
            }}
          >
            {toggleValue ? "Active" : "Off"}
          </Text>
        </TouchableOpacity>
      )}
    </View>
  );
}
