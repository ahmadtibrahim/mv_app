// /components/LiveCam.js

import React, { useState } from "react";
import {
  View,
  Text,
  Pressable,
  ImageBackground,
  Modal,
  Dimensions,
  StyleSheet,
} from "react-native";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import colors from "../constants/colors";
import gStyles from "../constants/globalStyles";

const { width, height } = Dimensions.get("window");

export default function LiveCam({
  snapshotUri = null,
  onPressSnapshot = () => {},
  isDetectionActive = true,
}) {
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [rotation, setRotation] = useState(0);
  const [liveActive, setLiveActive] = useState(false);

  const toggleFullscreen = () => setIsFullscreen((f) => !f);
  const rotate = () => setRotation((r) => (r + 90) % 360);

  const handleToggleLive = () => {
    if (!liveActive) {
      onPressSnapshot();
    } else {
      console.log("Snap mode activated");
    }
    setLiveActive(!liveActive);
  };

  const renderPlaceholder = (styleProps) => (
    <Pressable
      onPress={handleToggleLive}
      style={[styleProps, styles.placeholder]}
    >
      <Text style={styles.placeholderDefaultText}>Last detected snapshot</Text>
      <Text style={styles.placeholderTextBold}>
        {liveActive ? "(Tap switch to Snap)" : "(Tap to go Live)"}
      </Text>
    </Pressable>
  );

  const renderImage = (styleProps) =>
    snapshotUri ? (
      <ImageBackground
        source={{ uri: snapshotUri }}
        style={[styleProps, styles.image]}
        imageStyle={styles.imageStyle}
      />
    ) : (
      renderPlaceholder(styleProps)
    );

  return (
    <View style={[gStyles.card, styles.card]}>
      <Text style={[gStyles.label, styles.title]}>Live Cam</Text>

      <Modal
        visible={isFullscreen}
        transparent
        animationType="fade"
        onRequestClose={toggleFullscreen}
      >
        <View style={styles.fullscreenContainer} pointerEvents="box-none">
          {renderImage({
            width,
            height,
            transform: [{ rotate: `${rotation}deg` }],
          })}
          <View style={styles.fullControls} pointerEvents="box-none">
            <Pressable onPress={rotate} style={styles.controlBtn}>
              <Ionicons name="sync" size={28} color={colors.primary} />
            </Pressable>
            <Pressable onPress={toggleFullscreen} style={styles.controlBtn}>
              <Ionicons name="contract" size={28} color={colors.primary} />
            </Pressable>
          </View>
        </View>
      </Modal>

      {!isFullscreen && (
        <View style={styles.snapshot}>
          {renderImage({
            width: "100%",
            height: 160,
            transform: [{ rotate: `${rotation}deg` }],
          })}
          <View style={styles.inlineControls}>
            <Pressable onPress={rotate} style={styles.smallBtn}>
              <Ionicons name="sync" size={20} color={colors.primary} />
            </Pressable>
            <Pressable onPress={toggleFullscreen} style={styles.smallBtn}>
              <Ionicons name="expand" size={20} color={colors.primary} />
            </Pressable>
          </View>
        </View>
      )}

      <View style={styles.footer}>
        <MaterialCommunityIcons
          name="motion-sensor"
          size={20}
          color={isDetectionActive ? colors.primary : colors.secondary}
        />
        <Text
          style={[
            styles.statusText,
            { color: isDetectionActive ? colors.primary : colors.secondary },
          ]}
        >
          {isDetectionActive
            ? "Motion/AI Detection Active"
            : "Detection Inactive"}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    // Only override card-specific tweaks, leave color/border/shadow to gStyles.card!
    padding: 16,
    marginVertical: 10,
    borderRadius: 18,
  },
  title: {
    // This lets you tweak label size/weight globally and only override here if needed
    marginBottom: 8,
  },
  snapshot: {
    backgroundColor: colors.background,
    borderRadius: 8,
    height: 160,
    overflow: "hidden",
  },
  image: { width: "100%", height: "100%" },
  imageStyle: { borderRadius: 8 },
  placeholder: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  placeholderDefaultText: {
    color: colors.secondary,
    fontSize: 14,
    textAlign: "center",
  },
  placeholderTextBold: {
    fontWeight: "700",
    color: colors.primary,
    marginTop: 4,
  },
  inlineControls: {
    position: "absolute",
    top: 8,
    right: 8,
    flexDirection: "row",
  },
  smallBtn: {
    marginLeft: 8,
    backgroundColor: colors.background,
    padding: 4,
    borderRadius: 4,
  },
  fullscreenContainer: {
    flex: 1,
    backgroundColor: "#000",
    justifyContent: "center",
    alignItems: "center",
  },
  fullControls: {
    position: "absolute",
    top: 32,
    right: 16,
    flexDirection: "row",
  },
  controlBtn: {
    marginLeft: 12,
    backgroundColor: colors.background,
    padding: 8,
    borderRadius: 6,
  },
  footer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 8,
  },
  statusText: {
    marginLeft: 6,
    fontSize: 14,
  },
});
