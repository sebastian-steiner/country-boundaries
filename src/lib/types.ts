export interface Game {
  country: string | undefined;
  remaining: string[];
  rotation: number;
  reveal: boolean;
}

export let emptyGame = (): Game => {
  return {
    country: undefined,
    remaining: [],
    rotation: 0,
    reveal: false,
  };
};

export interface Settings {
  rotateRandomly: boolean;
  orientAfterGuess: boolean;
}
