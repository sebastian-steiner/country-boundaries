<script lang="ts">
    import { countries } from "$lib";
    import { base } from '$app/paths';
  
    let remainingCountries: Array<String> = [];
    let current: String | undefined = 'vietnam.webp';
    let reveal = false;
    let rotation = 0;

    function initGame() {
      remainingCountries = countries.flatMap(c => [c]);
      shuffle(remainingCountries);
      pickNext();
    }

    function shuffle<T>(array: T[]): T[] {
      let currentIndex = array.length,  randomIndex;

      // While there remain elements to shuffle.
      while (currentIndex != 0) {
    
        // Pick a remaining element.
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;
    
        // And swap it with the current element.
        [array[currentIndex], array[randomIndex]] = [
          array[randomIndex], array[currentIndex]];
      }
    
      return array;
    }
  
    function pickNext() {
      if (remainingCountries.length === 0) {
        current = undefined;
        return;
      }

      current = remainingCountries[0];
      rotation = Math.floor(Math.random() * 360);
      reveal = false;
      console.log(remainingCountries.length)
    }

    function markCorrect() {
      remainingCountries = remainingCountries.filter((c, i) => i !== 0);
      pickNext();
    }

    function markFalse() {
      shuffle(remainingCountries);
      pickNext();
    }
  
    function revealName() {
      reveal = true;
    }

    initGame();
  </script>
  
  <main class="min-h-screen flex flex-col items-center justify-between p-4">
    {#if current}
    <!-- Remaining counter -->
    <div class="w-full text-center text-gray-600 text-sm mb-2">
      {#if current}
      <p class="w-full text-center text-gray-800 text-2xl font-semibold mb-4">
       Remaining: {remainingCountries.length} {remainingCountries.length === 1 ? 'country' : 'countries'}
      </p>
     {/if}
    </div>
    <div class="flex-grow flex items-center justify-center w-full">
      <div class="relative w-[80vw] max-w-xs sm:max-w-md aspect-square flex items-center justify-center">
        <img
          src={`${base ?? ''}/countries/${current}`}
         alt="Country shape"
          class="w-[70%] h-[70%] object-contain transition-transform duration-300"
          style="transform: rotate({rotation}deg);"
          />
        </div>
    </div>
  
    <div class="w-full flex flex-col items-center gap-4 mt-4 sm:mt-8 pb-6 sm:pb-8">
      {#if reveal}
        <p class="text-center text-xl font-semibold">
          {current.replace('.webp', '').replace(/-/g, ' ').toUpperCase()}
        </p>
        <button on:click={markFalse} class="w-full max-w-sm bg-red-500 text-white py-3 rounded text-lg">
          Wrong!
        </button>
        <button on:click={markCorrect} class="w-full max-w-sm bg-green-500 text-white py-3 rounded text-lg">
          Correct!
        </button>
      {:else}
        <button on:click={revealName} class="w-full max-w-sm bg-blue-500 text-white py-3 rounded text-lg">
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
