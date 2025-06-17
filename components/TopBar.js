// components\TopBar.js

import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  useWindowDimensions,
  Platform,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import { Ionicons } from "@expo/vector-icons";
import { availableChairs } from "../data/availableChairs";
import colors from "../constants/colors";

export default function TopBar({ connectedChair, onConnect, onDisconnect }) {
  const [discovered, setDiscovered] = useState([]);
  const [selectedChair, setSelectedChair] = useState(null);
  const { width } = useWindowDimensions();
  const widgetWidth = width > 600 ? 500 : width * 0.9;

  const discover = () => {
    setDiscovered(availableChairs);
    setSelectedChair(null);
    onDisconnect?.();
  };

  const chairName = availableChairs.find((c) => c.id === connectedChair)?.name;

  return (
    <View style={[styles.container, { width: widgetWidth }]}>
      <View style={styles.left}>
        <TouchableOpacity onPress={discover} style={styles.iconButton}>
          <Ionicons
            name="bluetooth"
            size={28}
            color={discovered.length ? colors.primary : colors.secondary}
          />
        </TouchableOpacity>

        {!connectedChair && discovered.length > 0 && (
          <Picker
            selectedValue={selectedChair}
            style={styles.picker}
            itemStyle={styles.pickerItem}
            onValueChange={(v) => setSelectedChair(v)}
            mode="dropdown"
          >
            <Picker.Item label="Select Chair…" value={null} />
            {discovered.map((c) => (
              <Picker.Item
                key={c.id}
                label={c.name}
                value={c.id}
                color={colors.primary}
              />
            ))}
          </Picker>
        )}

        {connectedChair && (
          <Text style={styles.connectedText}>{chairName}</Text>
        )}
      </View>

      <View style={styles.right}>
        {!connectedChair ? (
          discovered.length > 0 && (
            <TouchableOpacity
              style={[styles.btn, !selectedChair && { opacity: 0.5 }]}
              disabled={!selectedChair}
              onPress={() => onConnect(selectedChair)}
            >
              <Text style={styles.btnText}>Connect</Text>
            </TouchableOpacity>
          )
        ) : (
          <TouchableOpacity
            style={styles.btn}
            onPress={() => {
              onDisconnect();
              setDiscovered([]);
              setSelectedChair(null);
            }}
          >
            <Text style={styles.btnText}>Disconnect</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignSelf: "center",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: colors.surface,
    borderRadius: 18,
    paddingVertical: 12,
    paddingHorizontal: 16,
    marginVertical: 10,
    elevation: 3,
    shadowColor: colors.primary,
    shadowOpacity: 0.13,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
    borderWidth: 1,
    borderColor: colors.primaryLight,
  },
  left: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  iconButton: {
    padding: 8,
  },
  picker: {
    flex: 1,
    height: 50,
    marginLeft: 12,
    color: colors.primary,
  },
  pickerItem: {
    height: 50,
    fontSize: 16,
  },
  connectedText: {
    marginLeft: 12,
    fontSize: 16,
    fontWeight: "600",
    color: colors.primary,
  },
  right: {
    flexDirection: "row",
    alignItems: "center",
  },
  btn: {
    minWidth: 100,
    paddingVertical: 12,
    paddingHorizontal: 20,
    backgroundColor: colors.primary,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    marginLeft: 12,
  },
  btnText: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 14,
  },
});
