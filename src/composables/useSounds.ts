import { Howl } from "howler";

// IMPORT SOUNDS FROM ASSETS
import rolligSoundFile from "@/assets/sounds/rolling-dice.mp3";
import shutdownSoundFile from "@/assets/sounds/shutdown.mp3";
import victorySoundFile from "@/assets/sounds/victory.mp3";

const roll = new Howl({
  src: [rolligSoundFile],
  volume: 0.8,
});

const shutdown = new Howl({
  src: [shutdownSoundFile],
  volume: 0.8,
});

const win = new Howl({
  src: [victorySoundFile],
  volume: 0.8,
});

export const useSounds = () => ({
  playRoll: () => roll.play(),
  playShutdown: () => shutdown.play(),
  playWin: () => win.play(),
});
