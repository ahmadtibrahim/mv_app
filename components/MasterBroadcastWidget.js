// components\MasterBroadcastWidget.js

import React, { useState, useEffect } from "react";
import { View, Text, Pressable, StyleSheet, Switch } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { availableChairs } from "../data/availableChairs";
import colors from "../constants/colors";

export default function MasterBroadcastWidget({
  currentChairId,
  onBroadcast = () => {},
}) {
  // When currentChairId changes, always set master ON and select it
  const [isMaster, setIsMaster] = useState(true);
  const [targets, setTargets] = useState([currentChairId]);

  // Always keep master selected, update if currentChairId changes
  useEffect(() => {
    if (isMaster) {
      setTargets((prev) => {
        // Remove any old master and add new one (as first)
        const others = prev.filter((id) => id !== currentChairId);
        return [currentChairId, ...others];
      });
    } else {
      setTargets([]);
    }
  }, [isMaster, currentChairId]);

  // If master toggled ON, always keep master selected
  useEffect(() => {
    if (isMaster && !targets.includes(currentChairId)) {
      setTargets([currentChairId]);
    }
  }, [isMaster, currentChairId, targets]);

  // build list: master first
  const master = availableChairs.find((c) => c.id === currentChairId);
  const others = availableChairs.filter((c) => c.id !== currentChairId);
  const listData = master ? [master, ...others] : others;

  const toggleTarget = (id) => {
    if (!isMaster || id === currentChairId) return;
    setTargets((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  // At least master + 1
  const canBroadcast = targets.length >= 2;

  // Notify parent of changes
  useEffect(() => {
    onBroadcast(targets);
  }, [targets, onBroadcast]);

  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <Text style={styles.title}>Master Broadcast</Text>
        <Switch
          value={isMaster}
          onValueChange={setIsMaster}
          trackColor={{ false: colors.secondary, true: colors.primary }}
          thumbColor={isMaster ? colors.accent : colors.background}
          ios_backgroundColor={colors.backgroundSecondary}
        />
      </View>

      {isMaster &&
        listData.map((item) => {
          const isMasterItem = item.id === currentChairId;
          const checked = targets.includes(item.id);
          return (
            <Pressable
              key={item.id}
              style={styles.item}
              onPress={() => toggleTarget(item.id)}
              disabled={isMasterItem}
            >
              <Ionicons
                name={checked ? "checkbox" : "square-outline"}
                size={20}
                color={colors.primary}
              />
              <Text style={[styles.itemText, isMasterItem && styles.greyText]}>
                {item.name}
              </Text>
            </Pressable>
          );
        })}

      <Pressable
        style={[styles.broadcastBtn, !canBroadcast && styles.disabledBtn]}
        disabled={!canBroadcast}
        onPress={() => onBroadcast(targets)}
      >
        <Text style={styles.broadcastText}>Broadcast</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.surface,
    borderRadius: 18,
    padding: 16,
    marginVertical: 10,
    borderWidth: 1,
    borderColor: colors.primaryLight,
    elevation: 3,
    shadowColor: colors.primary,
    shadowOpacity: 0.13,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 12,
  },
  title: {
    fontSize: 16,
    fontWeight: "600",
    color: colors.primary,
  },
  item: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 8,
  },
  itemText: {
    marginLeft: 8,
    fontSize: 14,
    color: colors.secondary,
  },
  greyText: {
    color: colors.muted,
  },
  broadcastBtn: {
    alignSelf: "flex-end",
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: colors.primary,
    borderRadius: 8,
    marginTop: 12,
  },
  disabledBtn: {
    backgroundColor: colors.muted,
  },
  broadcastText: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 14,
  },
});
