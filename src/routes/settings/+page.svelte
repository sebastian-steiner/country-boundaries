<script>
  import { settings } from "$lib";
  import { base } from "$app/paths";
  import close from "$lib/images/close.svg";
</script>

<main class="min-h-screen flex flex-col items-center">
  <div class="w-full shadow-lg mb-4 flex justify-center">
    <div
      class="relative flex flex-row justify-center h-18 w-full items-center md:max-w-6xl"
    >
      <h1 class="text-4xl text-center">Game Settings</h1>
      <a aria-label="Close" class="absolute right-4" href={base ?? ""}>
        <img alt="Close Icon" class="w-8 h-8" src={close} />
      </a>
    </div>
  </div>
  <form class="w-full p-8 text-lg md:max-w-2xl">
    <div class="flex flex-row justify-between">
      <label for="random-orientation" class="capitalize"
        >Randomly rotate countries</label
      >
      <input
        type="checkbox"
        id="random-orientation"
        bind:checked={settings.current.rotateRandomly}
      />
    </div>
    <div class="flex flex-row justify-between">
      <label for="reset-rotation" class="capitalize"
        >Reset orientation after guess</label
      >
      <input
        type="checkbox"
        id="reset-orientation"
        disabled={!settings.current.rotateRandomly}
        bind:checked={settings.current.orientAfterGuess}
      />
    </div>
  </form>
</main>

<style>
</style>
