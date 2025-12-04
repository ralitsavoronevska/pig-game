<template>
  <main class="relative h-screen w-full flex items-center justify-center md:flex-row flex-col bg-linear-to-tl from-purple-800 to-red-600 font-nunito p-5">

    <!-- Player 0 -->
    <section
      :class="[
        'player flex flex-1 flex-col items-center justify-between max-w-md h-2/3 md:rounded-tl-lg md:rounded-l-lg px-18 pt-13 pb-20 md:p-16 transition-all duration-700 md:my-6',
        winner === 0 ? 'bg-gray-900 text-pink-600' :
        winner === 1 ? 'bg-white/20' :
        player0Active ? 'bg-white/40' : 'bg-white/20'
      ]"
    >
      <h2 class="name text-2xl md:text-5xl font-light uppercase mb-4">
        {{ winner === 0 ? 'Winner!' : 'Player 1' }}
      </h2>
      <p class="score text-5xl font-light text-pink-800 md:text-7xl mb-auto">{{ scores[0] }}</p>

      <div class="current rounded-lg bg-pink-800/80 px-10 py-4 text-center text-white">
        <p class="current-label text-sm uppercase tracking-widest opacity-80">Current</p>
        <p class="current-score text-4xl font-bold">{{ currentScores[0] }}</p>
      </div>
    </section>

    <!-- Dice -->
    <img
      v-if="dice !== null"
      :src="`assets/dice/dice-${dice}.png`"
      alt="Dice"
      class="dice absolute top-0 -right-9 md:left-1/2 md:top-110 lg:top-80 -translate-x-1/2 transform shadow-2xl"
      :class="{ 'md:hidden': dice === null, 'animate-shake': dice === 1 }"
    />

    <!-- Desktop Buttons -->
    <div class="btn-container w-full absolute top-50 left-1/2 flex -translate-x-1/2 flex-col gap-6 max-md:hidden">
      <button @click="newGame" class="btn btn--new">🔄 New game</button>
      <button @click="rollDice" :disabled="!playing" class="btn btn--roll">🎲 Roll dice</button>
      <button @click="holdScore" :disabled="!playing" class="btn btn--hold">📥 Hold</button>
    </div>

    <!-- Mobile Buttons -->
    <div class="btn-container-mobile fixed bottom-85 left-0 right-0 z-50 flex justify-around bg-pink-800 py-4 md:hidden">
      <button @click="newGame" class="w-10 h-10 rounded-full bg-white/60">🔄</button>
      <button @click="rollDice" :disabled="!playing" class="w-10 h-10 rounded-full bg-white/60">🎲</button>
      <button @click="holdScore" :disabled="!playing" class="w-10 h-10 rounded-full bg-white/60">📥</button>
    </div>

    <!-- Player 1 -->
    <section
      :class="[
        'player flex flex-1 flex-col items-center max-w-md h-2/3 md:rounded-tr-lg md:rounded-r-lg px-18 pt-20 pb-13 md:p-16 transition-all duration-700 md:my-6',
        winner === 1 ? 'bg-gray-900 text-pink-600' :
        winner === 0 ? 'bg-white/20' :
        player1Active ? 'bg-white/40' : 'bg-white/20'
      ]"
    >
      <h2 class="name text-2xl md:text-5xl font-light uppercase mb-4">
        {{ winner === 1 ? 'Winner!' : 'Player 2' }}
      </h2>
      <p class="score text-5xl font-light text-pink-800 md:text-7xl mb-auto">{{ scores[1] }}</p>

      <div class="current rounded-lg bg-pink-800/80 px-10 py-4 text-center text-white">
        <p class="current-label text-sm uppercase tracking-widest opacity-80">Current</p>
        <p class="current-score text-4xl font-bold">{{ currentScores[1] }}</p>
      </div>
    </section>
  </main>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useSounds } from '@/composables/useSounds'
const { playRoll, playShutdown, playWin } = useSounds()

// State
const scores = ref([0, 0])
const currentScores = ref([0, 0])
const activePlayer = ref(0)
const playing = ref(true)
const dice = ref<number | null>(null)

// Computed
const player0Active = computed(() => activePlayer.value === 0)
const player1Active = computed(() => activePlayer.value === 1)
const winner = computed<number | null>(() => 
  (scores.value[0] ?? 0) >= 100 ? 0 : (scores.value[1] ?? 0) >= 100 ? 1 : null
)

// Methods
const newGame = () => {
  scores.value = [0, 0]
  currentScores.value = [0, 0]
  activePlayer.value = 0
  playing.value = true
  dice.value = null
}

const rollDice = () => {
  playRoll() // 🎲 CLACK CLACK!

  if (!playing.value) return

  const roll = Math.trunc(Math.random() * 6) + 1
  dice.value = roll

  if (roll !== 1) {
    // ensuring the index exists and avoid possible undefined access
    const idx = activePlayer.value ?? 0
    currentScores.value[idx] = (currentScores.value[idx] ?? 0) + roll
  } else {
    playShutdown() // 👎 A PLAYER LOSES A TURN!
    switchPlayer()
  }
}

const holdScore = () => {
  if (!playing.value) return

  // used a guarded index and explicit assignment to avoid undefined
  const idx = activePlayer.value ?? 0
  scores.value[idx] = (scores.value[idx] ?? 0) + (currentScores.value[idx] ?? 0)

  if (scores.value[idx] >= 100) {
    playWin()  // 🎉 VICTORY!
    playing.value = false
    dice.value = null
  } else {
    switchPlayer()
  }
}

const switchPlayer = () => {
  currentScores.value[activePlayer.value] = 0
  activePlayer.value = activePlayer.value === 0 ? 1 : 0

  // show the losing "1" for a moment → then switch
  setTimeout(() => {
    dice.value = null
  }, 1000)  // 1 second is perfect
}
</script>

<style scoped>
.animate-shake {
  animation: shake 0.6s ease-in-out;
}
@keyframes shake {
  0%, 100% { transform: translateX(0); }
  20% { transform: translateX(-10px) rotate(-5deg); }
  40% { transform: translateX(10px) rotate(5deg); }
  60% { transform: translateX(-10px) rotate(-5deg); }
  80% { transform: translateX(10px) rotate(5deg); }
}
</style>