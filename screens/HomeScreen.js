import React from "react";
import { SafeAreaView, ScrollView } from "react-native";
import RestControl from "../components/RestControl";
import SmartCupControl from "../components/SmartCupControl";
import colors from "../constants/colors";

export default function HomeScreen() {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.background }}>
      <ScrollView contentContainerStyle={{ paddingVertical: 12 }}>
        <RestControl
          label="Back Rest"
          onPress={(action) => console.log("Back Rest", action)}
        />
        <RestControl
          label="Foot Rest"
          onPress={(action) => console.log("Foot Rest", action)}
        />
        <SmartCupControl
          state="off"
          onAction={(action) => console.log("Cup Action:", action)}
        />
      </ScrollView>
    </SafeAreaView>
  );
}
