// place files you want to import through the `$lib` alias in this folder.

const countryModules = import.meta.glob("../../static/countries/*.webp");

export const countries = Object.entries(countryModules).map(([path]) => {
  const filename = path.split("/").pop() ?? "";
  return filename;
});

export * from "./types";
export * from "./utils";
