<template>
  <main
    class="relative h-screen w-full flex items-center justify-center md:flex-row flex-col bg-linear-to-tl from-purple-800 to-red-600 font-nunito p-5"
  >
    <!-- Player 0 -->
    <section
      :class="[
        'player flex flex-1 flex-col items-center justify-between max-w-md h-2/3 md:rounded-tl-lg md:rounded-l-lg px-18 pt-13 pb-20 md:p-16 transition-all duration-700 md:my-6',
        winner === 0
          ? 'bg-gray-900 text-pink-600'
          : winner === 1
            ? 'bg-white/20'
            : player0Active
              ? 'bg-white/40'
              : 'bg-white/20',
      ]"
    >
      <h2 class="name text-2xl md:text-5xl font-light uppercase mb-4">
        {{ winner === 0 ? "Winner!" : "Player 1" }}
      </h2>
      <p class="score text-5xl font-light text-pink-800 md:text-7xl mb-auto">
        {{ scores[0] }}
      </p>

      <div
        class="current rounded-lg bg-pink-800/80 px-10 py-4 text-center text-white"
      >
        <p class="current-label text-sm uppercase tracking-widest opacity-80">
          Current
        </p>
        <p class="current-score text-4xl font-bold">{{ currentScores[0] }}</p>
      </div>
    </section>

    <!-- Dice -->
    <img
      v-if="dice !== null"
      :src="`src/assets/dice/dice-${dice}.png`"
      alt="Dice"
      class="dice absolute top-0 -right-9 md:left-1/2 md:top-110 lg:top-80 -translate-x-1/2 transform shadow-2xl"
      :class="{ 'md:hidden': dice === null, 'animate-shake': dice === 1 }"
    />

    <!-- Desktop Buttons -->
    <div
      class="btn-container w-full absolute top-50 left-1/2 flex -translate-x-1/2 flex-col gap-6 max-md:hidden"
    >
      <button @click="newGame" class="btn btn--new">🔄 New game</button>
      <button @click="rollDice" :disabled="!playing" class="btn btn--roll">
        🎲 Roll dice
      </button>
      <button @click="holdScore" :disabled="!playing" class="btn btn--hold">
        📥 Hold
      </button>
    </div>

    <!-- Mobile Buttons -->
    <div
      class="btn-container-mobile fixed bottom-85 left-0 right-0 z-50 flex justify-around bg-pink-800 py-4 md:hidden"
    >
      <button @click="newGame" class="w-10 h-10 rounded-full bg-white/60">
        🔄
      </button>
      <button
        @click="rollDice"
        :disabled="!playing"
        class="w-10 h-10 rounded-full bg-white/60"
      >
        🎲
      </button>
      <button
        @click="holdScore"
        :disabled="!playing"
        class="w-10 h-10 rounded-full bg-white/60"
      >
        📥
      </button>
    </div>

    <!-- Player 1 -->
    <section
      :class="[
        'player flex flex-1 flex-col items-center max-w-md h-2/3 md:rounded-tr-lg md:rounded-r-lg px-18 pt-20 pb-13 md:p-16 transition-all duration-700 md:my-6',
        winner === 1
          ? 'bg-gray-900 text-pink-600'
          : winner === 0
            ? 'bg-white/20'
            : player1Active
              ? 'bg-white/40'
              : 'bg-white/20',
      ]"
    >
      <h2 class="name text-2xl md:text-5xl font-light uppercase mb-4">
        {{ winner === 1 ? "Winner!" : "Player 2" }}
      </h2>
      <p class="score text-5xl font-light text-pink-800 md:text-7xl mb-auto">
        {{ scores[1] }}
      </p>

      <div
        class="current rounded-lg bg-pink-800/80 px-10 py-4 text-center text-white"
      >
        <p class="current-label text-sm uppercase tracking-widest opacity-80">
          Current
        </p>
        <p class="current-score text-4xl font-bold">{{ currentScores[1] }}</p>
      </div>
    </section>
  </main>
</template>

<script setup lang="ts">
import { usePigGame } from "@/stores/usePigGame";

const {
  dice,
  scores,
  currentScores,
  playing,
  winner,
  rollDice,
  holdScore,
  player0Active,
  player1Active,
  newGame,
} = usePigGame(100);
</script>

<style scoped>
.animate-shake {
  animation: shake 0.6s ease-in-out;
}
@keyframes shake {
  0%,
  100% {
    transform: translateX(0);
  }
  20% {
    transform: translateX(-10px) rotate(-5deg);
  }
  40% {
    transform: translateX(10px) rotate(5deg);
  }
  60% {
    transform: translateX(-10px) rotate(-5deg);
  }
  80% {
    transform: translateX(10px) rotate(5deg);
  }
}
</style>
