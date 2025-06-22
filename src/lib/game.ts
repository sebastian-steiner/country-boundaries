import { countries, shuffle, emptyGame, game, settings } from "$lib";

export function initGame() {
  let remainingCountries = countries.flatMap((c) => [c]);
  shuffle(remainingCountries);
  game.current = emptyGame();
  game.current.remaining = remainingCountries;
  pickNext();
}

export function pickNext() {
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

export function markCorrect() {
  game.current.remaining = game.current.remaining.filter((_, i) => i !== 0);
  pickNext();
}

export function markFalse() {
  game.current.remaining = shuffle(game.current.remaining);
  pickNext();
}

export function revealName() {
  if (settings.current.orientAfterGuess) {
    game.current.rotation = 0;
  }
  game.current.reveal = true;
}
