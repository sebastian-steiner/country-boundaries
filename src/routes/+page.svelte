<script lang="ts">
  import {
    game,
    settings,
    initGame,
    markFalse,
    markCorrect,
    revealName,
  } from "$lib";
  import { base } from "$app/paths";
  import settingsIcon from "$lib/images/settings.svg";
  import reloadIcon from "$lib/images/reload.svg";

  // don't re-initialize an already running game
  if (game.current?.country == null) {
    initGame();
  }

  // if changing settings, we should check that they're applied correctly
  if (!settings.current.rotateRandomly) {
    game.current.rotation = 0;
  } else if (!game.current.reveal) {
    game.current.rotation = Math.floor(Math.random() * 360);
  }
</script>

<main class="min-h-screen flex flex-col items-center justify-between">
  {#if game.current.country}
    <div class="w-full shadow-lg mb-4 flex justify-center">
      <div
        class="relative flex flex-row justify-center h-18 w-full items-center md:max-w-6xl"
      >
        <p class="w-full text-center text-gray-800 text-2xl font-semibold">
          {game.current.remaining.length}
          {game.current.remaining.length === 1 ? "country" : "countries"}
        </p>
        <div class="absolute right-4 flex flex-row">
          <button aria-label="Restart" on:click={() => initGame()}>
            <img alt="Restart" class="w-8 h-8" src={reloadIcon} />
          </button>
          <a aria-label="Settings" href={`${base ?? ""}/settings`}>
            <img alt="Settings Icon" class="w-8 h-8" src={settingsIcon} />
          </a>
        </div>
      </div>
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
      class="w-full flex flex-col items-center gap-4 mt-4 sm:mt-8 pb-6 sm:pb-8 p-4"
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
