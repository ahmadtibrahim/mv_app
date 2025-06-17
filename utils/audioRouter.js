// utils/audioRouter.js

// 1. Define relative level maps per sound mode
export const MODE_MAPS = {
  stereo: { L: 1.0, R: 1.0 },
  surround: { L: 1.0, C: 0.8, R: 1.0, LC: 0.8, RC: 0.8 },
  party: { L: 0.9, LC: 0.9, RC: 0.9, R: 0.9, C: 0.9 },
  chill: { L: 0.7, R: 0.7, LC: 0.7, RC: 0.7, C: 0.7 },
  custom: {}, // user-defined later
};

/**
 * Given:
 *  - layout: { posKey: chairId, … }
 *  - soundMode: key in MODE_MAPS
 *  - masterVolume: 0–1
 * Returns: { chairId: volume (0–1), … }
 */
export function computeChairVolumes(
  layout,
  soundMode,
  masterVolume = 1,
  customVolumes = {}
) {
  const modeMap =
    soundMode === "custom" && customVolumes
      ? customVolumes
      : MODE_MAPS[soundMode] || {};
  const result = {};

  Object.entries(layout).forEach(([pos, chairId]) => {
    const factor = modeMap[pos] ?? 0;
    result[chairId] = Math.min(1, Math.max(0, masterVolume * factor));
  });

  return result;
}

// Stub: send volume command to a chair (replace with real Bluetooth/Wi-Fi API)
export function sendVolumeToChair(chairId, volume) {
  console.log(`📤 [Router] ${chairId} → ${Math.round(volume * 100)}%`);
  // Real implementation: send via Bluetooth/Wi-Fi/etc
}
