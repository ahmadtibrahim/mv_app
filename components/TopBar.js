// /components/TopBar.js

import React, { useState } from "react";
import { View, Text, TouchableOpacity, Modal, FlatList } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import colors from "../constants/colors";
import gStyles from "../constants/globalStyles";
import { useParty } from "../contexts/PartyContext";
import { availableChairs as availableChairsRaw } from "../data/availableChairs"; // use named import

export default function TopBar() {
  const {
    connectedChair,
    setConnectedChair,
    discoveredChairs = [],
    setDiscoveredChairs,
  } = useParty();

  const [modalVisible, setModalVisible] = useState(false);

  // Ensure availableChairs is always an array
  const availableChairs = Array.isArray(availableChairsRaw)
    ? availableChairsRaw
    : [];
  const chairsToShow =
    Array.isArray(discoveredChairs) && discoveredChairs.length
      ? discoveredChairs
      : availableChairs;

  const btColor = chairsToShow.length ? colors.primary : colors.secondary;

  return (
    <View style={gStyles.header}>
      <TouchableOpacity
        onPress={() => setDiscoveredChairs(availableChairs)}
        style={{ marginRight: 10 }}
      >
        <Ionicons name="bluetooth" size={28} color={btColor} />
      </TouchableOpacity>

      {connectedChair ? (
        <>
          <Text
            style={{
              fontWeight: "600",
              color: colors.primary,
              flex: 1,
              fontSize: 16,
              marginLeft: 10,
            }}
          >
            {connectedChair.name}
          </Text>
          <TouchableOpacity
            style={{
              minWidth: 100,
              paddingVertical: 8,
              paddingHorizontal: 20,
              backgroundColor: colors.primary,
              borderRadius: 8,
              alignItems: "center",
              justifyContent: "center",
              marginLeft: 12,
            }}
            onPress={() => setConnectedChair(null)}
          >
            <Text style={{ color: "#fff", fontWeight: "600", fontSize: 15 }}>
              Disconnect
            </Text>
          </TouchableOpacity>
        </>
      ) : (
        <>
          <TouchableOpacity
            style={{
              minWidth: 100,
              paddingVertical: 8,
              paddingHorizontal: 20,
              backgroundColor: colors.primary,
              borderRadius: 8,
              alignItems: "center",
              justifyContent: "center",
              marginLeft: 12,
            }}
            onPress={() => setModalVisible(true)}
            disabled={!chairsToShow.length}
          >
            <Text style={{ color: "#fff", fontWeight: "600", fontSize: 15 }}>
              {chairsToShow.length ? "Select Chair" : "No Chairs"}
            </Text>
          </TouchableOpacity>

          {/* Chair selection modal */}
          <Modal visible={modalVisible} transparent animationType="slide">
            <View
              style={{
                flex: 1,
                backgroundColor: "rgba(0,0,0,0.4)",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <View
                style={{
                  backgroundColor: "#fff",
                  borderRadius: 16,
                  padding: 20,
                  width: 300,
                  elevation: 7,
                  shadowColor: "#222",
                }}
              >
                <Text
                  style={{ fontWeight: "700", fontSize: 18, marginBottom: 16 }}
                >
                  Select a Chair
                </Text>
                <FlatList
                  data={chairsToShow}
                  keyExtractor={(item) => item.id?.toString() ?? item.name}
                  renderItem={({ item }) => (
                    <TouchableOpacity
                      style={{
                        padding: 14,
                        borderBottomWidth: 1,
                        borderBottomColor: "#f2f2f2",
                      }}
                      onPress={() => {
                        setConnectedChair(item);
                        setModalVisible(false);
                      }}
                    >
                      <Text style={{ fontSize: 16, color: colors.primary }}>
                        {item.name || item.id}
                      </Text>
                    </TouchableOpacity>
                  )}
                  ListEmptyComponent={<Text>No chairs found.</Text>}
                />
                <TouchableOpacity
                  style={{
                    marginTop: 18,
                    alignSelf: "center",
                    backgroundColor: colors.primary,
                    borderRadius: 8,
                    paddingVertical: 10,
                    paddingHorizontal: 30,
                  }}
                  onPress={() => setModalVisible(false)}
                >
                  <Text
                    style={{ color: "#fff", fontWeight: "700", fontSize: 15 }}
                  >
                    Cancel
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </Modal>
        </>
      )}
    </View>
  );
}
