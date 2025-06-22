import { emptyGame, type Game, type Settings } from "$lib";
import { PersistentState } from "@friendofsvelte/state";

export let game = new PersistentState<Game>(
  "game",
  emptyGame(),
  "sessionStorage"
);
export let settings = new PersistentState<Settings>(
  "settings",
  {
    rotateRandomly: true,
    orientAfterGuess: true,
  },
  "localStorage"
);
