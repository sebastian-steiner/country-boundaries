<script>
    import { countries } from "$lib";
  
    let current = 'vietnam.webp';
    let reveal = false;
    let rotation = 0;
  
    function pickRandom() {
      const index = Math.floor(Math.random() * countries.length);
      current = countries[index];
      reveal = false;
      rotation = Math.floor(Math.random() * 360);
    }
  
    function revealName() {
      reveal = true;
    }
  </script>
  
  <main class="min-h-screen flex flex-col items-center justify-between p-4">
    <div class="flex-grow flex items-center justify-center w-full">
    {#if current}
      <img
        src={`/countries/${current}`}
        alt="Country shape"
        class="max-w-xs sm:max-w-md w-full h-auto transition-transform duration-300"
        style="transform: rotate({rotation}deg);"
        />
    {/if}

    </div>
  
    <div class="w-full flex flex-col items-center gap-4 mt-4 sm:mt-8 pb-6 sm:pb-8">
      {#if reveal}
        <p class="text-center text-xl font-semibold">
          {current.replace('.webp', '').replace(/-/g, ' ').toUpperCase()}
        </p>
        <button on:click={pickRandom} class="w-full max-w-sm bg-blue-500 text-white py-3 rounded text-lg">
          Next
        </button>
      {:else}
        <button on:click={revealName} class="w-full max-w-sm bg-blue-500 text-white py-3 rounded text-lg">
          Reveal Name
        </button>
      {/if}
    </div>
  </main>
  
  <style>
    main {
      display: flex;
      flex-direction: column;
      align-items: center;
    }
  </style>
