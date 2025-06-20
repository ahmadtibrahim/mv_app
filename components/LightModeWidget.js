// /components/LightModeWidget.js

import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Switch,
  ToastAndroid,
  Platform,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import Slider from "@react-native-community/slider";
import { Ionicons } from "@expo/vector-icons";
import gStyles from "../constants/globalStyles";
import colors from "../constants/colors";

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
    <View
      style={{
        position: "absolute",
        bottom: 10,
        left: 30,
        right: 30,
        backgroundColor: colors.primary,
        borderRadius: 12,
        padding: 10,
        zIndex: 1000,
      }}
    >
      <Text style={{ color: "#fff", textAlign: "center", fontWeight: "600" }}>
        {message}
      </Text>
    </View>
  );
}

export default function LightModeWidget({ disabled = false }) {
  const [advanced, setAdvanced] = useState(false);
  const [basicMode, setBasicMode] = useState("Off");
  const [basicBrightness, setBasicBrightness] = useState(50);
  const [basicColor, setBasicColor] = useState(COLORS[0]);
  const [basicTone, setBasicTone] = useState(3);
  const [toneActiveBasic, setToneActiveBasic] = useState(null);

  const [armrest, setArmrest] = useState({ ...defaultZoneSettings });
  const [toneActiveArmrest, setToneActiveArmrest] = useState(null);
  const [speakerFront, setSpeakerFront] = useState({ ...defaultZoneSettings });
  const [toneActiveFront, setToneActiveFront] = useState(null);
  const [speakerBack, setSpeakerBack] = useState({ ...defaultZoneSettings });
  const [toneActiveBack, setToneActiveBack] = useState(null);

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
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Text style={{ fontSize: 13, color: "#397afc" }}>Color Swatch</Text>
          <TouchableOpacity
            style={{ marginLeft: 8 }}
            onPress={() =>
              showToast("Tip: Long-press a color to adjust its tone!")
            }
            disabled={disabled}
          >
            <Ionicons name="help-circle-outline" size={18} color="#397afc" />
          </TouchableOpacity>
        </View>
        <View style={{ flexDirection: "row", flexWrap: "wrap", marginTop: 5 }}>
          {COLORS.map((c) => {
            const isSelected = selectedColor === c;
            const swatchColor = getToneColor(c, isSelected ? tone : 3);
            return (
              <TouchableOpacity
                key={c}
                style={{
                  width: 36,
                  height: 36,
                  borderRadius: 18,
                  backgroundColor: swatchColor,
                  margin: 5,
                  borderWidth: isSelected ? 3 : 1,
                  borderColor: isSelected ? "#397afc" : "#bbb",
                }}
                onPress={() => {
                  if (disabled) return;
                  setColor(c);
                  setTone(3);
                  setToneActive(null);
                }}
                onLongPress={() => {
                  if (disabled) return;
                  setToneActive(c);
                }}
                delayLongPress={250}
                activeOpacity={0.7}
                disabled={disabled}
              />
            );
          })}
        </View>
      </View>
    );
  }

  function renderToneSlider(
    selectedColor,
    tone,
    setTone,
    toneActive,
    setToneActive
  ) {
    if (!toneActive || selectedColor !== toneActive) return null;
    return (
      <View
        style={{ flexDirection: "row", alignItems: "center", marginTop: 10 }}
      >
        <Text style={{ color: "#397afc", fontWeight: "600" }}>Tone</Text>
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
          disabled={disabled}
        />
        <Text style={{ color: "#397afc" }}>Level {tone}</Text>
        <TouchableOpacity
          onPress={() => setToneActive(null)}
          style={{
            marginLeft: 12,
            backgroundColor: "#397afc",
            borderRadius: 7,
            paddingHorizontal: 14,
            paddingVertical: 5,
          }}
          disabled={disabled}
        >
          <Text style={{ color: "#fff", fontWeight: "600", fontSize: 15 }}>
            Done
          </Text>
        </TouchableOpacity>
      </View>
    );
  }

  function renderPreviewCircle(selectedColor, tone, label) {
    return (
      <View style={{ alignItems: "center", marginTop: 5 }}>
        <View
          style={{
            width: 40,
            height: 40,
            borderRadius: 20,
            backgroundColor: getToneColor(selectedColor, tone),
            borderColor: "#397afc",
            borderWidth: 2,
            marginBottom: 2,
          }}
        />
        <Text style={{ fontSize: 11, color: colors.secondary }}>{label}</Text>
      </View>
    );
  }

  // UI
  return (
    <View style={[gStyles.card, disabled && { opacity: 0.5 }]}>
      <Snackbar visible={snackbar.visible} message={snackbar.message} />
      <Text style={gStyles.label}>Light Mode</Text>
      {!advanced && (
        <>
          <View
            style={{
              borderRadius: 10,
              borderWidth: 1,
              borderColor: "#397afc",
              backgroundColor: "#f6f6f8",
              marginBottom: 8,
              overflow: "hidden",
            }}
          >
            <Picker
              selectedValue={basicMode}
              onValueChange={setBasicMode}
              dropdownIconColor="#397afc"
              enabled={!disabled}
            >
              <Picker.Item label="Off" value="Off" />
              <Picker.Item label="Solid" value="Solid" />
              <Picker.Item label="Fade" value="Fade" />
              <Picker.Item label="Pulse" value="Pulse" />
              <Picker.Item label="Rainbow" value="Rainbow" />
            </Picker>
          </View>
          <Text style={gStyles.label}>Brightness</Text>
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
            disabled={disabled}
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
            style={{
              marginTop: 10,
              backgroundColor: "#397afc",
              borderRadius: 8,
              padding: 9,
              alignSelf: "center",
            }}
            onPress={restoreAllBasic}
            disabled={disabled}
          >
            <Text style={{ color: "#fff", fontWeight: "bold" }}>
              Restore to Default
            </Text>
          </TouchableOpacity>
        </>
      )}

      <View
        style={{ flexDirection: "row", alignItems: "center", marginTop: 8 }}
      >
        <Switch
          value={advanced}
          onValueChange={setAdvanced}
          disabled={disabled}
        />
        <Text style={{ marginLeft: 8, color: "#397afc", fontWeight: "bold" }}>
          Advanced Setup
        </Text>
      </View>

      {advanced && (
        <>
          {/* Armrest */}
          <View style={{ marginTop: 10 }}>
            <Text style={[gStyles.label, { fontSize: 15 }]}>
              Armrest Light Control
            </Text>
            <View
              style={{
                borderRadius: 10,
                borderWidth: 1,
                borderColor: "#397afc",
                backgroundColor: "#f6f6f8",
                marginBottom: 8,
                overflow: "hidden",
              }}
            >
              <Picker
                selectedValue={armrest.mode}
                onValueChange={(v) =>
                  setArmrest((prev) => ({ ...prev, mode: v }))
                }
                dropdownIconColor="#397afc"
                enabled={!disabled}
              >
                <Picker.Item label="Off" value="Off" />
                <Picker.Item label="Solid" value="Solid" />
                <Picker.Item label="Fade" value="Fade" />
                <Picker.Item label="Pulse" value="Pulse" />
                <Picker.Item label="Rainbow" value="Rainbow" />
              </Picker>
            </View>
            <Text style={gStyles.label}>Brightness</Text>
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
              disabled={disabled}
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
              style={{
                marginTop: 8,
                backgroundColor: "#397afc",
                borderRadius: 8,
                padding: 9,
                alignSelf: "center",
              }}
              onPress={restoreArmrest}
              disabled={disabled}
            >
              <Text style={{ color: "#fff", fontWeight: "bold" }}>
                Restore Armrest
              </Text>
            </TouchableOpacity>
          </View>

          {/* Speaker: Front */}
          <View style={{ marginTop: 20 }}>
            <Text style={[gStyles.label, { fontSize: 15 }]}>
              Speaker Front Light Control
            </Text>
            <View
              style={{
                borderRadius: 10,
                borderWidth: 1,
                borderColor: "#397afc",
                backgroundColor: "#f6f6f8",
                marginBottom: 8,
                overflow: "hidden",
              }}
            >
              <Picker
                selectedValue={speakerFront.mode}
                onValueChange={(v) =>
                  setSpeakerFront((prev) => ({ ...prev, mode: v }))
                }
                dropdownIconColor="#397afc"
                enabled={!disabled}
              >
                <Picker.Item label="Off" value="Off" />
                <Picker.Item label="Solid" value="Solid" />
                <Picker.Item label="Fade" value="Fade" />
                <Picker.Item label="Pulse" value="Pulse" />
                <Picker.Item label="Rainbow" value="Rainbow" />
              </Picker>
            </View>
            <Text style={gStyles.label}>Brightness</Text>
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
              disabled={disabled}
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
              style={{
                marginTop: 8,
                backgroundColor: "#397afc",
                borderRadius: 8,
                padding: 9,
                alignSelf: "center",
              }}
              onPress={restoreSpeakerFront}
              disabled={disabled}
            >
              <Text style={{ color: "#fff", fontWeight: "bold" }}>
                Restore Front
              </Text>
            </TouchableOpacity>
          </View>

          {/* Speaker: Back */}
          <View style={{ marginTop: 20 }}>
            <Text style={[gStyles.label, { fontSize: 15 }]}>
              Speaker Back Light Control
            </Text>
            <View
              style={{
                borderRadius: 10,
                borderWidth: 1,
                borderColor: "#397afc",
                backgroundColor: "#f6f6f8",
                marginBottom: 8,
                overflow: "hidden",
              }}
            >
              <Picker
                selectedValue={speakerBack.mode}
                onValueChange={(v) =>
                  setSpeakerBack((prev) => ({ ...prev, mode: v }))
                }
                dropdownIconColor="#397afc"
                enabled={!disabled}
              >
                <Picker.Item label="Off" value="Off" />
                <Picker.Item label="Solid" value="Solid" />
                <Picker.Item label="Fade" value="Fade" />
                <Picker.Item label="Pulse" value="Pulse" />
                <Picker.Item label="Rainbow" value="Rainbow" />
              </Picker>
            </View>
            <Text style={gStyles.label}>Brightness</Text>
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
              disabled={disabled}
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
              style={{
                marginTop: 8,
                backgroundColor: "#397afc",
                borderRadius: 8,
                padding: 9,
                alignSelf: "center",
              }}
              onPress={restoreSpeakerBack}
              disabled={disabled}
            >
              <Text style={{ color: "#fff", fontWeight: "bold" }}>
                Restore Back
              </Text>
            </TouchableOpacity>
          </View>
        </>
      )}
    </View>
  );
}
