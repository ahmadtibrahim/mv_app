import React from "react";
import { View, Text, StyleSheet, useWindowDimensions } from "react-native";
import { Picker } from "@react-native-picker/picker";
import colors from "../constants/colors";
import { availableChairs } from "../data/availableChairs";

// Layout labels for valid broadcast group sizes
const LAYOUTS = {
  2: ["L", "R"],
  3: ["L", "C", "R"],
  4: ["L", "LC", "RC", "R"],
};

export default function ChairLayoutSetup({
  broadcastTargets = [],
  layoutAssignments = {},
  setLayoutAssignments = () => {},
}) {
  const { width } = useWindowDimensions();

  // Filter valid targets and count
  const targets = broadcastTargets.filter((id) => typeof id === "string");
  const count = targets.length;
  // Only show if 2–4 chairs are selected
  if (count < 2 || count > 4) return null;

  // Use pre-defined positions
  const positions = LAYOUTS[count];

  const cardWidth = width * 0.9;
  const boxWidth = (cardWidth - (count - 1) * 8) / count;
  const boxHeight = boxWidth * 1.2;

  // map id→name
  const idToName = Object.fromEntries(
    availableChairs.map((c) => [c.id, c.name])
  );

  // Controlled assignments from parent
  const assign = (posKey, chairId) => {
    setLayoutAssignments((prev) => ({ ...prev, [posKey]: chairId }));
  };

  return (
    <View style={[styles.card, { width: cardWidth, alignSelf: "center" }]}>
      <View style={styles.row}>
        {positions.map((posKey) => {
          const used = Object.entries(layoutAssignments)
            .filter(([k]) => k !== posKey)
            .map(([, id]) => id);
          const options = targets.filter((id) => !used.includes(id));

          return (
            <View
              key={posKey}
              style={[styles.box, { width: boxWidth, height: boxHeight }]}
            >
              <Text style={styles.posLabel}>{posKey}</Text>
              <Picker
                selectedValue={layoutAssignments[posKey] || ""}
                onValueChange={(val) => assign(posKey, val)}
                style={styles.picker}
              >
                <Picker.Item label="Select…" value="" key="placeholder" />
                {options.map((id) => (
                  <Picker.Item key={id} label={idToName[id] || id} value={id} />
                ))}
              </Picker>
            </View>
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.surface,
    borderRadius: 18,
    padding: 12,
    marginVertical: 10,
    borderWidth: 1,
    borderColor: colors.primaryLight,
    elevation: 3,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  box: {
    backgroundColor: colors.backgroundSecondary,
    borderRadius: 12,
    padding: 8,
  },
  posLabel: {
    fontSize: 12,
    fontWeight: "600",
    color: colors.secondary,
    marginBottom: 4,
    textAlign: "center",
  },
  picker: {
    width: "100%",
    height: 50,
  },
});
