import { ref, computed } from "vue";
import { useSounds } from "@/composables/useSounds";
const { playRoll, playShutdown, playWin } = useSounds();

export function usePigGame(winScore = 100) {
  // State
  const scores = ref([0, 0]);
  const currentScores = ref([0, 0]);
  const activePlayer = ref(0);
  const playing = ref(true);
  const dice = ref<number | null>(null);

  // Computed
  const player0Active = computed(() => activePlayer.value === 0);
  const player1Active = computed(() => activePlayer.value === 1);
  const winner = computed<number | null>(() =>
    (scores.value[0] ?? 0) >= winScore
      ? 0
      : (scores.value[1] ?? 0) >= winScore
        ? 1
        : null,
  );

  // Methods
  const newGame = () => {
    scores.value = [0, 0];
    currentScores.value = [0, 0];
    activePlayer.value = 0;
    playing.value = true;
    dice.value = null;
  };

  const rollDice = () => {
    playRoll(); // 🎲 CLACK CLACK!

    if (!playing.value) return;

    const roll = Math.trunc(Math.random() * 6) + 1;
    dice.value = roll;

    if (roll !== 1) {
      // ensuring the index exists and avoid possible undefined access
      const idx = activePlayer.value ?? 0;
      currentScores.value[idx] = (currentScores.value[idx] ?? 0) + roll;
    } else {
      playShutdown(); // 👎 A PLAYER LOSES A TURN!
      switchPlayer();
    }
  };

  const holdScore = () => {
    if (!playing.value) return;

    // used a guarded index and explicit assignment to avoid undefined
    const idx = activePlayer.value ?? 0;
    scores.value[idx] =
      (scores.value[idx] ?? 0) + (currentScores.value[idx] ?? 0);

    if (scores.value[idx] >= winScore) {
      playWin(); // 🎉 VICTORY!
      playing.value = false;
      dice.value = null;
    } else {
      switchPlayer();
    }
  };

  const switchPlayer = () => {
    currentScores.value[activePlayer.value] = 0;
    activePlayer.value = activePlayer.value === 0 ? 1 : 0;

    // show the losing "1" for a moment → then switch
    setTimeout(() => {
      dice.value = null;
    }, 1000); // 1 second is perfect
  };

  return {
    winScore,
    dice,
    scores,
    currentScores,
    activePlayer,
    playing,
    winner,
    rollDice,
    holdScore,
    player0Active,
    player1Active,
    newGame,
  };
}
