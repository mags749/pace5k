import { setAudioModeAsync, AudioPlayer } from "expo-audio";
import type { IntervalType } from "@shared/constants/schedule";

// ─── Tone Configuration ───────────────────────────────────────────────────────

const TONES: Record<string, { frequency: number; duration: number }> = {
  beep:      { frequency: 880, duration: 120 },
  run:       { frequency: 660, duration: 450 },
  walk:      { frequency: 440, duration: 450 },
  warmup:    { frequency: 550, duration: 600 },
  cooldown:  { frequency: 330, duration: 600 },
  complete:  { frequency: 770, duration: 900 },
};

// ─── Audio Mode Presets ───────────────────────────────────────────────────────

/**
 * Normal background mode — app audio mixes with music/video at full volume.
 * Called once on init and after every chime finishes.
 */
async function setBackgroundMode(): Promise<void> {
  await setAudioModeAsync({
    playsInSilentModeIOS: true,
    staysActiveInBackground: true,
    // iOS: mix alongside other audio without lowering it
    interruptionModeIOS: "mixWithOthers",
    // Android: do not duck others while in background mode
    shouldDuckAndroid: false,
    interruptionModeAndroid: "duckOthers",
  });
}

/**
 * Chime mode — ducks background music/video so the interval chime is clearly
 * audible. Reverted to backgroundMode as soon as playback finishes.
 */
async function setChimeMode(): Promise<void> {
  await setAudioModeAsync({
    playsInSilentModeIOS: true,
    staysActiveInBackground: true,
    // iOS: request ducking of other audio
    interruptionModeIOS: "duckOthers",
    // Android: duck other audio
    shouldDuckAndroid: true,
    interruptionModeAndroid: "duckOthers",
  });
}

// ─── Audio Init ───────────────────────────────────────────────────────────────

let initialized = false;

async function ensureAudio(): Promise<void> {
  if (initialized) return;
  try {
    await setBackgroundMode();
    initialized = true;
  } catch {
    // Silently fail — haptics will still give feedback
  }
}

// ─── WAV Builder ──────────────────────────────────────────────────────────────

function buildWavBase64(frequency: number, durationMs: number): string {
  const sampleRate = 22050;
  const numSamples = Math.floor((sampleRate * durationMs) / 1000);
  const samples = new Int16Array(numSamples);

  for (let i = 0; i < numSamples; i++) {
    const t = i / sampleRate;
    const envelope = Math.min(1, Math.min(i / 80, (numSamples - i) / 80));
    samples[i] = Math.floor(envelope * 28000 * Math.sin(2 * Math.PI * frequency * t));
  }

  const dataSize = samples.byteLength;
  const buffer = new ArrayBuffer(44 + dataSize);
  const view = new DataView(buffer);

  const writeStr = (offset: number, str: string) => {
    for (let i = 0; i < str.length; i++) view.setUint8(offset + i, str.charCodeAt(i));
  };

  writeStr(0, "RIFF");
  view.setUint32(4, 36 + dataSize, true);
  writeStr(8, "WAVE");
  writeStr(12, "fmt ");
  view.setUint32(16, 16, true);
  view.setUint16(20, 1, true);
  view.setUint16(22, 1, true);
  view.setUint32(24, sampleRate, true);
  view.setUint32(28, sampleRate * 2, true);
  view.setUint16(32, 2, true);
  view.setUint16(34, 16, true);
  writeStr(36, "data");
  view.setUint32(40, dataSize, true);

  const bytes = new Uint8Array(buffer);
  bytes.set(new Uint8Array(samples.buffer), 44);

  let binary = "";
  for (let i = 0; i < bytes.byteLength; i++) {
    binary += String.fromCharCode(bytes[i] as number);
  }

  if (typeof btoa !== "undefined") return btoa(binary);

  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
  let result = "";
  for (let i = 0; i < binary.length; i += 3) {
    const a = binary.charCodeAt(i);
    const b = i + 1 < binary.length ? binary.charCodeAt(i + 1) : 0;
    const c = i + 2 < binary.length ? binary.charCodeAt(i + 2) : 0;
    result += chars[a >> 2];
    result += chars[((a & 3) << 4) | (b >> 4)];
    result += i + 1 < binary.length ? chars[((b & 15) << 2) | (c >> 6)] : "=";
    result += i + 2 < binary.length ? chars[c & 63] : "=";
  }
  return result;
}

// ─── Public API ───────────────────────────────────────────────────────────────

async function playTone(key: string): Promise<void> {
  const tone = TONES[key];
  if (!tone) return;

  let player: AudioPlayer | null = null;

  try {
    await ensureAudio();

    // Duck background music/video before chime plays
    await setChimeMode();

    const uri = `data:audio/wav;base64,${buildWavBase64(tone.frequency, tone.duration)}`;
    player = new AudioPlayer({ uri });

    // Play and wait for completion so we can restore volume precisely
    await new Promise<void>((resolve) => {
      const subscription = player!.addListener("playbackStatusUpdate", (status) => {
        if (status.didJustFinish) {
          subscription.remove();
          resolve();
        }
      });
      player!.play();
    });
  } catch {
    // Visual/haptic fallback still works
  } finally {
    // Always restore full background volume and release the player
    try { player?.release(); } catch { /* ignore */ }
    try { await setBackgroundMode(); } catch { /* ignore */ }
  }
}

export const audioService = {
  playBeep: () => playTone("beep"),
  playIntervalStart: (type: IntervalType) => playTone(type),
  playComplete: () => playTone("complete"),
};
