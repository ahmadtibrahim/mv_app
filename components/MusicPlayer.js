import React, { useState, useEffect, useRef } from "react";
import {
  View,
  Text,
  Modal,
  FlatList,
  Pressable,
  StyleSheet,
  Dimensions,
} from "react-native";
import Slider from "@react-native-community/slider";
import { Ionicons } from "@expo/vector-icons";
import { babyModeMusicList } from "../data/babyModeMusicList";
import colors from "../constants/colors";

const { width } = Dimensions.get("window");

export default function MusicPlayer() {
  const [playlist] = useState(babyModeMusicList);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration] = useState(140);
  const [repeatMode, setRepeatMode] = useState("off");
  const [shuffle, setShuffle] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const timerRef = useRef(null);

  useEffect(() => {
    if (isPlaying) {
      timerRef.current = setInterval(() => {
        setCurrentTime((t) =>
          t + 1 >= duration
            ? (clearInterval(timerRef.current), duration)
            : t + 1
        );
      }, 1000);
    } else clearInterval(timerRef.current);
    return () => clearInterval(timerRef.current);
  }, [isPlaying, currentIndex]);

  const resetTrack = () => {
    setCurrentTime(0);
    setIsPlaying(true);
  };

  const handlePrev = () => {
    const idx = shuffle
      ? Math.floor(Math.random() * playlist.length)
      : Math.max(0, currentIndex - 1);
    setCurrentIndex(idx);
    resetTrack();
  };
  const handleNext = () => {
    let idx;
    if (shuffle) idx = Math.floor(Math.random() * playlist.length);
    else if (currentIndex + 1 < playlist.length) idx = currentIndex + 1;
    else if (repeatMode === "all") idx = 0;
    else return setIsPlaying(false);
    setCurrentIndex(idx);
    resetTrack();
  };
  const togglePlay = () => setIsPlaying((p) => !p);
  const toggleRepeat = () =>
    setRepeatMode((m) => (m === "off" ? "one" : m === "one" ? "all" : "off"));
  const toggleShuffle = () => setShuffle((s) => !s);

  const format = (sec) =>
    `${Math.floor(sec / 60)}:${sec % 60 < 10 ? "0" : ""}${sec % 60}`;

  return (
    <View style={styles.card}>
      <Pressable onPress={() => setModalVisible(true)} style={styles.header}>
        <View>
          <Text style={styles.label}>{playlist[currentIndex].title}</Text>
          <Text
            style={[styles.label, { fontSize: 14, color: colors.secondary }]}
          >
            {playlist[currentIndex].description}
          </Text>
        </View>
      </Pressable>

      <Slider
        style={{ width: width - 64, alignSelf: "center" }}
        minimumValue={0}
        maximumValue={duration}
        value={currentTime}
        onSlidingComplete={(v) => setCurrentTime(v)}
        minimumTrackTintColor={colors.primary}
        maximumTrackTintColor={colors.secondary}
        thumbTintColor={colors.primary}
      />
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          paddingHorizontal: 12,
        }}
      >
        <Text style={{ color: colors.secondary, fontSize: 12 }}>
          {format(currentTime)}
        </Text>
        <Text style={{ color: colors.secondary, fontSize: 12 }}>
          {format(duration)}
        </Text>
      </View>

      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-around",
          alignItems: "center",
          marginTop: 12,
        }}
      >
        <Pressable onPress={toggleShuffle}>
          <Ionicons
            name="shuffle"
            size={24}
            color={shuffle ? colors.primary : colors.secondary}
          />
        </Pressable>
        <Pressable onPress={handlePrev}>
          <Ionicons name="play-skip-back" size={28} color={colors.primary} />
        </Pressable>
        <Pressable
          onPress={togglePlay}
          style={{
            backgroundColor: colors.primary,
            borderRadius: 28,
            padding: 12,
          }}
        >
          <Ionicons
            name={isPlaying ? "pause" : "play"}
            size={32}
            color="#fff"
          />
        </Pressable>
        <Pressable onPress={handleNext}>
          <Ionicons name="play-skip-forward" size={28} color={colors.primary} />
        </Pressable>
        <Pressable onPress={toggleRepeat}>
          <Ionicons
            name={
              repeatMode === "off"
                ? "repeat"
                : repeatMode === "one"
                ? "repeat-once"
                : "repeat"
            }
            size={24}
            color={repeatMode === "off" ? colors.secondary : colors.primary}
          />
        </Pressable>
      </View>

      <Modal visible={modalVisible} animationType="slide" transparent>
        <View style={styles.backdrop}>
          <View style={styles.modal}>
            <Text style={[styles.label, { marginBottom: 12 }]}>
              Select a Song
            </Text>
            <FlatList
              data={playlist}
              keyExtractor={(item) => item.id}
              renderItem={({ item, index }) => (
                <Pressable
                  onPress={() => {
                    setCurrentIndex(index);
                    resetTrack();
                    setModalVisible(false);
                  }}
                  style={[
                    { paddingVertical: 8 },
                    index === currentIndex && {
                      backgroundColor: colors.surface,
                      borderRadius: 4,
                    },
                  ]}
                >
                  <Text
                    style={[
                      styles.label,
                      index === currentIndex && { color: colors.primaryLight },
                    ]}
                  >
                    {item.title}
                  </Text>
                </Pressable>
              )}
              style={{ maxHeight: 200, marginBottom: 12 }}
            />
            <Pressable
              onPress={() => setModalVisible(false)}
              style={{ alignSelf: "flex-end", padding: 6 }}
            >
              <Text style={[styles.label, { color: colors.primaryLight }]}>
                OK
              </Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.surface,
    borderRadius: 18,
    padding: 16,
    marginVertical: 10,
    elevation: 3,
    shadowColor: colors.primary,
    shadowOpacity: 0.13,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
    borderWidth: 1,
    borderColor: colors.primaryLight,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 10,
  },
  label: {
    fontSize: 18,
    fontWeight: "600",
    color: colors.secondary,
    letterSpacing: 0.3,
  },
  backdrop: {
    flex: 1,
    backgroundColor: "#00000088",
    justifyContent: "center",
    alignItems: "center",
  },
  modal: {
    width: width * 0.8,
    backgroundColor: colors.background,
    borderRadius: 8,
    padding: 16,
  },
});
