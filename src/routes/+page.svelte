<script lang="ts">
  import {
    countries,
    type Settings,
    shuffle,
    type Game,
    emptyGame,
  } from "$lib";
  import { base } from "$app/paths";
  import { PersistentState } from "@friendofsvelte/state";

  let game = new PersistentState<Game>("game", emptyGame(), "sessionStorage");
  let settings = new PersistentState<Settings>(
    "settings",
    {
      rotateRandomly: true,
      orientAfterGuess: true,
    },
    "localStorage"
  );

  function initGame() {
    let remainingCountries = countries.flatMap((c) => [c]);
    shuffle(remainingCountries);
    game.current = emptyGame();
    game.current.remaining = remainingCountries;
    pickNext();
  }

  function pickNext() {
    if (game.current.remaining.length === 0) {
      game.current.country = undefined;
      return;
    }

    game.current.country = game.current.remaining[0];

    if (settings.current.rotateRandomly) {
      game.current.rotation = Math.floor(Math.random() * 360);
    } else {
      game.current.rotation = 0;
    }
    game.current.reveal = false;
  }

  function markCorrect() {
    game.current.remaining = game.current.remaining.filter((_, i) => i !== 0);
    pickNext();
  }

  function markFalse() {
    game.current.remaining = shuffle(game.current.remaining);
    pickNext();
  }

  function revealName() {
    if (settings.current.orientAfterGuess) {
      game.current.rotation = 0;
    }
    game.current.reveal = true;
  }

  // don't re-initialize an already running game
  if (game.current?.country == null) {
    initGame();
  }
</script>

<main class="min-h-screen flex flex-col items-center justify-between p-4">
  {#if game.current.country}
    <!-- Remaining counter -->
    <div class="w-full text-center text-gray-600 text-sm mb-2">
      <p class="w-full text-center text-gray-800 text-2xl font-semibold mb-4">
        Remaining: {game.current.remaining.length}
        {game.current.remaining.length === 1 ? "country" : "countries"}
      </p>
    </div>
    <div class="flex-grow flex items-center justify-center w-full">
      <div
        class="relative w-[80vw] max-w-xs sm:max-w-md aspect-square flex items-center justify-center"
      >
        <img
          src={`${base ?? ""}/countries/${game.current.country}`}
          alt="Country shape"
          class="w-[70%] h-[70%] object-contain transition-transform duration-300"
          style="transform: rotate({game.current.rotation}deg);"
        />
      </div>
    </div>

    <div
      class="w-full flex flex-col items-center gap-4 mt-4 sm:mt-8 pb-6 sm:pb-8"
    >
      {#if game.current.reveal}
        <p class="text-center text-xl font-semibold">
          {game.current.country
            .replace(".webp", "")
            .replace(/-/g, " ")
            .toUpperCase()}
        </p>
        <button
          on:click={markFalse}
          class="w-full max-w-sm bg-red-500 text-white py-3 rounded text-lg"
        >
          Wrong!
        </button>
        <button
          on:click={markCorrect}
          class="w-full max-w-sm bg-green-500 text-white py-3 rounded text-lg"
        >
          Correct!
        </button>
      {:else}
        <button
          on:click={revealName}
          class="w-full max-w-sm bg-blue-500 text-white py-3 rounded text-lg"
        >
          Reveal Name
        </button>
      {/if}
    </div>
  {/if}
</main>

<style>
  main {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
</style>
