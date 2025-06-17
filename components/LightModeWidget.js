// components\LightModeWidget.js

import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Switch,
  ToastAndroid,
  Platform,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import Slider from "@react-native-community/slider";
import { Ionicons } from "@expo/vector-icons";

const COLORS = [
  "#ff4444",
  "#ffa726",
  "#ffe234",
  "#b2ff59",
  "#4caf50",
  "#26e7c3",
  "#1e90ff",
  "#8f00ff",
  "#f03294",
  "#ff6ec7",
  "#ff6f00",
  "#ffffff",
];

function getToneColor(color, tone) {
  if (!color) return "#fff";
  if (tone === 3) return color;
  let amt = (tone - 3) * 24;
  const clamp = (n) => Math.max(0, Math.min(255, n));
  let c = color.replace("#", "");
  let r = parseInt(c.substr(0, 2), 16),
    g = parseInt(c.substr(2, 2), 16),
    b = parseInt(c.substr(4, 2), 16);
  r = clamp(r - amt);
  g = clamp(g - amt);
  b = clamp(b - amt);
  return `#${r.toString(16).padStart(2, "0")}${g
    .toString(16)
    .padStart(2, "0")}${b.toString(16).padStart(2, "0")}`;
}

const defaultZoneSettings = {
  mode: "Off",
  brightness: 50,
  color: COLORS[0],
  tone: 3,
};

function Snackbar({ visible, message }) {
  if (!visible) return null;
  return (
    <View style={styles.snackbar}>
      <Text style={styles.snackbarText}>{message}</Text>
    </View>
  );
}

export default function LightModeWidget() {
  const [advanced, setAdvanced] = useState(false);

  // Basic (non-advanced)
  const [basicMode, setBasicMode] = useState("Off");
  const [basicBrightness, setBasicBrightness] = useState(50);
  const [basicColor, setBasicColor] = useState(COLORS[0]);
  const [basicTone, setBasicTone] = useState(3);
  const [toneActiveBasic, setToneActiveBasic] = useState(null);

  // Advanced: Armrest (both sides together)
  const [armrest, setArmrest] = useState({ ...defaultZoneSettings });
  const [toneActiveArmrest, setToneActiveArmrest] = useState(null);

  // Advanced: Speaker front
  const [speakerFront, setSpeakerFront] = useState({ ...defaultZoneSettings });
  const [toneActiveFront, setToneActiveFront] = useState(null);

  // Advanced: Speaker back
  const [speakerBack, setSpeakerBack] = useState({ ...defaultZoneSettings });
  const [toneActiveBack, setToneActiveBack] = useState(null);

  // Snackbar/Toast state
  const [snackbar, setSnackbar] = useState({ visible: false, message: "" });

  function showToast(msg) {
    if (Platform.OS === "android") ToastAndroid.show(msg, ToastAndroid.SHORT);
    setSnackbar({ visible: true, message: msg });
    setTimeout(() => setSnackbar({ visible: false, message: "" }), 1800);
  }

  function restoreAllBasic() {
    setBasicMode("Off");
    setBasicBrightness(50);
    setBasicColor(COLORS[0]);
    setBasicTone(3);
    setToneActiveBasic(null);
    showToast("Restored basic settings");
  }

  function restoreArmrest() {
    setArmrest({ ...defaultZoneSettings });
    setToneActiveArmrest(null);
    showToast("Restored armrest lights");
  }

  function restoreSpeakerFront() {
    setSpeakerFront({ ...defaultZoneSettings });
    setToneActiveFront(null);
    showToast("Restored speaker front lights");
  }

  function restoreSpeakerBack() {
    setSpeakerBack({ ...defaultZoneSettings });
    setToneActiveBack(null);
    showToast("Restored speaker back lights");
  }

  // ---- Rendering reusable swatch grid ----
  function renderSwatchGrid(
    selectedColor,
    setColor,
    setTone,
    tone,
    toneActive,
    setToneActive
  ) {
    return (
      <View style={{ marginTop: 6 }}>
        <View style={styles.swatchHeader}>
          <Text style={{ fontSize: 13, color: "#397afc" }}>Color Swatch</Text>
          <TouchableOpacity
            style={{ marginLeft: 8 }}
            onPress={() =>
              showToast("Tip: Long-press a color to adjust its tone!")
            }
          >
            <Ionicons name="help-circle-outline" size={18} color="#397afc" />
          </TouchableOpacity>
        </View>
        <View style={styles.swatchGrid}>
          {COLORS.map((c) => {
            const isSelected = selectedColor === c;
            const swatchColor = getToneColor(c, isSelected ? tone : 3);
            return (
              <TouchableOpacity
                key={c}
                style={[
                  styles.swatch,
                  {
                    backgroundColor: swatchColor,
                    borderWidth: isSelected ? 3 : 1,
                    borderColor: isSelected ? "#397afc" : "#bbb",
                  },
                ]}
                onPress={() => {
                  setColor(c);
                  setTone(3);
                  setToneActive(null);
                }}
                onLongPress={() => setToneActive(c)}
                delayLongPress={250}
                activeOpacity={0.7}
              />
            );
          })}
        </View>
      </View>
    );
  }

  // ---- Rendering reusable tone slider ----
  function renderToneSlider(
    selectedColor,
    tone,
    setTone,
    toneActive,
    setToneActive
  ) {
    if (!toneActive || selectedColor !== toneActive) return null;
    return (
      <View style={styles.toneRow}>
        <Text style={styles.toneLabel}>Tone</Text>
        <Slider
          style={{ width: 130, marginHorizontal: 10 }}
          minimumValue={1}
          maximumValue={5}
          step={1}
          value={tone}
          onValueChange={setTone}
          minimumTrackTintColor="#397afc"
          maximumTrackTintColor="#ccc"
          thumbTintColor={getToneColor(selectedColor, tone)}
        />
        <Text style={styles.toneLabel}>Level {tone}</Text>
        <TouchableOpacity
          onPress={() => setToneActive(null)}
          style={{
            marginLeft: 12,
            backgroundColor: "#397afc",
            borderRadius: 7,
            paddingHorizontal: 14,
            paddingVertical: 5,
          }}
        >
          <Text style={{ color: "#fff", fontWeight: "600", fontSize: 15 }}>
            Done
          </Text>
        </TouchableOpacity>
      </View>
    );
  }

  // ---- Rendering reusable preview circle ----
  function renderPreviewCircle(selectedColor, tone, label) {
    return (
      <View style={{ alignItems: "center", marginTop: 5 }}>
        <View
          style={[
            styles.previewCircle,
            {
              backgroundColor: getToneColor(selectedColor, tone),
              borderColor: "#397afc",
            },
          ]}
        />
        <Text style={styles.affectsLabel}>{label}</Text>
      </View>
    );
  }

  // UI
  return (
    <View style={styles.card}>
      <Snackbar visible={snackbar.visible} message={snackbar.message} />
      <Text style={styles.label}>Light Mode</Text>
      {!advanced && (
        <>
          <View style={styles.pickerWrap}>
            <Picker
              selectedValue={basicMode}
              onValueChange={setBasicMode}
              style={styles.picker}
              dropdownIconColor="#397afc"
            >
              <Picker.Item label="Off" value="Off" />
              <Picker.Item label="Solid" value="Solid" />
              <Picker.Item label="Fade" value="Fade" />
              <Picker.Item label="Pulse" value="Pulse" />
              <Picker.Item label="Rainbow" value="Rainbow" />
            </Picker>
          </View>
          <Text style={styles.label}>Brightness</Text>
          <Slider
            style={{ width: "100%", marginVertical: 6 }}
            minimumValue={0}
            maximumValue={100}
            step={5}
            value={basicBrightness}
            onValueChange={setBasicBrightness}
            minimumTrackTintColor="#397afc"
            maximumTrackTintColor="#ccc"
            thumbTintColor="#7e46fa"
          />
          {basicMode === "Solid" &&
            renderSwatchGrid(
              basicColor,
              setBasicColor,
              setBasicTone,
              basicTone,
              toneActiveBasic,
              setToneActiveBasic
            )}
          {basicMode === "Solid" &&
            renderToneSlider(
              basicColor,
              basicTone,
              setBasicTone,
              toneActiveBasic,
              setToneActiveBasic
            )}
          {basicMode === "Solid" &&
            renderPreviewCircle(basicColor, basicTone, "Affects: All Zones")}
          <TouchableOpacity
            style={styles.restoreButton}
            onPress={restoreAllBasic}
          >
            <Text style={styles.restoreButtonText}>Restore to Default</Text>
          </TouchableOpacity>
        </>
      )}

      <View
        style={{ flexDirection: "row", alignItems: "center", marginTop: 8 }}
      >
        <Switch value={advanced} onValueChange={setAdvanced} />
        <Text style={{ marginLeft: 8, color: "#397afc", fontWeight: "bold" }}>
          Advanced Setup
        </Text>
      </View>

      {advanced && (
        <>
          {/* Armrest */}
          <View style={{ marginTop: 10 }}>
            <Text style={styles.advTitle}>Armrest Light Control</Text>
            <View style={styles.pickerWrap}>
              <Picker
                selectedValue={armrest.mode}
                onValueChange={(v) =>
                  setArmrest((prev) => ({ ...prev, mode: v }))
                }
                style={styles.picker}
                dropdownIconColor="#397afc"
              >
                <Picker.Item label="Off" value="Off" />
                <Picker.Item label="Solid" value="Solid" />
                <Picker.Item label="Fade" value="Fade" />
                <Picker.Item label="Pulse" value="Pulse" />
                <Picker.Item label="Rainbow" value="Rainbow" />
              </Picker>
            </View>
            <Text style={styles.label}>Brightness</Text>
            <Slider
              style={{ width: "100%", marginVertical: 6 }}
              minimumValue={0}
              maximumValue={100}
              step={5}
              value={armrest.brightness}
              onValueChange={(v) =>
                setArmrest((prev) => ({ ...prev, brightness: v }))
              }
              minimumTrackTintColor="#397afc"
              maximumTrackTintColor="#ccc"
              thumbTintColor="#7e46fa"
            />
            {armrest.mode === "Solid" &&
              renderSwatchGrid(
                armrest.color,
                (c) => setArmrest((prev) => ({ ...prev, color: c })),
                (t) => setArmrest((prev) => ({ ...prev, tone: t })),
                armrest.tone,
                toneActiveArmrest,
                setToneActiveArmrest
              )}
            {armrest.mode === "Solid" &&
              renderToneSlider(
                armrest.color,
                armrest.tone,
                (t) => setArmrest((prev) => ({ ...prev, tone: t })),
                toneActiveArmrest,
                setToneActiveArmrest
              )}
            {armrest.mode === "Solid" &&
              renderPreviewCircle(
                armrest.color,
                armrest.tone,
                "Affects: Both Armrests"
              )}
            <TouchableOpacity
              style={styles.restoreButton}
              onPress={restoreArmrest}
            >
              <Text style={styles.restoreButtonText}>Restore Armrest</Text>
            </TouchableOpacity>
          </View>

          {/* Speaker: Front */}
          <View style={{ marginTop: 20 }}>
            <Text style={styles.advTitle}>Speaker Front Light Control</Text>
            <View style={styles.pickerWrap}>
              <Picker
                selectedValue={speakerFront.mode}
                onValueChange={(v) =>
                  setSpeakerFront((prev) => ({ ...prev, mode: v }))
                }
                style={styles.picker}
                dropdownIconColor="#397afc"
              >
                <Picker.Item label="Off" value="Off" />
                <Picker.Item label="Solid" value="Solid" />
                <Picker.Item label="Fade" value="Fade" />
                <Picker.Item label="Pulse" value="Pulse" />
                <Picker.Item label="Rainbow" value="Rainbow" />
              </Picker>
            </View>
            <Text style={styles.label}>Brightness</Text>
            <Slider
              style={{ width: "100%", marginVertical: 6 }}
              minimumValue={0}
              maximumValue={100}
              step={5}
              value={speakerFront.brightness}
              onValueChange={(v) =>
                setSpeakerFront((prev) => ({ ...prev, brightness: v }))
              }
              minimumTrackTintColor="#397afc"
              maximumTrackTintColor="#ccc"
              thumbTintColor="#7e46fa"
            />
            {speakerFront.mode === "Solid" &&
              renderSwatchGrid(
                speakerFront.color,
                (c) => setSpeakerFront((prev) => ({ ...prev, color: c })),
                (t) => setSpeakerFront((prev) => ({ ...prev, tone: t })),
                speakerFront.tone,
                toneActiveFront,
                setToneActiveFront
              )}
            {speakerFront.mode === "Solid" &&
              renderToneSlider(
                speakerFront.color,
                speakerFront.tone,
                (t) => setSpeakerFront((prev) => ({ ...prev, tone: t })),
                toneActiveFront,
                setToneActiveFront
              )}
            {speakerFront.mode === "Solid" &&
              renderPreviewCircle(
                speakerFront.color,
                speakerFront.tone,
                "Affects: Front Speakers"
              )}
            <TouchableOpacity
              style={styles.restoreButton}
              onPress={restoreSpeakerFront}
            >
              <Text style={styles.restoreButtonText}>Restore Front</Text>
            </TouchableOpacity>
          </View>

          {/* Speaker: Back */}
          <View style={{ marginTop: 20 }}>
            <Text style={styles.advTitle}>Speaker Back Light Control</Text>
            <View style={styles.pickerWrap}>
              <Picker
                selectedValue={speakerBack.mode}
                onValueChange={(v) =>
                  setSpeakerBack((prev) => ({ ...prev, mode: v }))
                }
                style={styles.picker}
                dropdownIconColor="#397afc"
              >
                <Picker.Item label="Off" value="Off" />
                <Picker.Item label="Solid" value="Solid" />
                <Picker.Item label="Fade" value="Fade" />
                <Picker.Item label="Pulse" value="Pulse" />
                <Picker.Item label="Rainbow" value="Rainbow" />
              </Picker>
            </View>
            <Text style={styles.label}>Brightness</Text>
            <Slider
              style={{ width: "100%", marginVertical: 6 }}
              minimumValue={0}
              maximumValue={100}
              step={5}
              value={speakerBack.brightness}
              onValueChange={(v) =>
                setSpeakerBack((prev) => ({ ...prev, brightness: v }))
              }
              minimumTrackTintColor="#397afc"
              maximumTrackTintColor="#ccc"
              thumbTintColor="#7e46fa"
            />
            {speakerBack.mode === "Solid" &&
              renderSwatchGrid(
                speakerBack.color,
                (c) => setSpeakerBack((prev) => ({ ...prev, color: c })),
                (t) => setSpeakerBack((prev) => ({ ...prev, tone: t })),
                speakerBack.tone,
                toneActiveBack,
                setToneActiveBack
              )}
            {speakerBack.mode === "Solid" &&
              renderToneSlider(
                speakerBack.color,
                speakerBack.tone,
                (t) => setSpeakerBack((prev) => ({ ...prev, tone: t })),
                toneActiveBack,
                setToneActiveBack
              )}
            {speakerBack.mode === "Solid" &&
              renderPreviewCircle(
                speakerBack.color,
                speakerBack.tone,
                "Affects: Back Speakers"
              )}
            <TouchableOpacity
              style={styles.restoreButton}
              onPress={restoreSpeakerBack}
            >
              <Text style={styles.restoreButtonText}>Restore Back</Text>
            </TouchableOpacity>
          </View>
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    borderRadius: 18,
    padding: 14,
    marginVertical: 12,
    borderWidth: 1,
    borderColor: "#97dbfc",
    width: "95%",
    alignSelf: "center",
    shadowColor: "#000",
    shadowOpacity: 0.03,
    shadowRadius: 8,
  },
  label: {
    fontWeight: "700",
    fontSize: 16,
    color: "#397afc",
    marginBottom: 4,
    marginTop: 6,
  },
  pickerWrap: {
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#b6e1fa",
    backgroundColor: "#f8faff",
    marginBottom: 8,
    overflow: "hidden",
    width: "100%",
    minHeight: 44,
    justifyContent: "center",
  },
  picker: {
    flex: 1,
    color: "#244173",
    fontSize: 16,
    paddingLeft: 8,
    minHeight: 44,
    width: "100%",
  },
  swatchHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 3,
  },
  swatchGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginTop: 2,
    justifyContent: "space-between",
  },
  swatch: {
    width: 40,
    height: 40,
    borderRadius: 20,
    margin: 6,
    borderColor: "#99cafc",
    justifyContent: "center",
    alignItems: "center",
  },
  toneRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 4,
    marginBottom: 6,
    justifyContent: "center",
  },
  toneLabel: {
    color: "#397afc",
    fontWeight: "600",
    fontSize: 14,
    marginHorizontal: 4,
  },
  previewCircle: {
    width: 34,
    height: 34,
    borderRadius: 17,
    marginTop: 10,
    alignSelf: "center",
    borderWidth: 2,
  },
  restoreButton: {
    marginTop: 12,
    alignSelf: "center",
    backgroundColor: "#f3f6fd",
    borderColor: "#397afc",
    borderWidth: 1.4,
    borderRadius: 12,
    paddingHorizontal: 22,
    paddingVertical: 8,
  },
  restoreButtonText: {
    color: "#397afc",
    fontWeight: "bold",
    fontSize: 15,
    letterSpacing: 0.5,
  },
  advTitle: {
    fontSize: 17,
    fontWeight: "700",
    marginBottom: 4,
    marginTop: 4,
    color: "#4b7bec",
  },
  affectsLabel: {
    marginTop: 6,
    fontSize: 13,
    color: "#829fd8",
    fontWeight: "600",
    letterSpacing: 0.3,
  },
  snackbar: {
    position: "absolute",
    bottom: 14,
    left: 0,
    right: 0,
    alignSelf: "center",
    backgroundColor: "#397afc",
    borderRadius: 18,
    paddingVertical: 10,
    paddingHorizontal: 22,
    zIndex: 10,
    alignItems: "center",
    elevation: 4,
  },
  snackbarText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 15,
  },
});
