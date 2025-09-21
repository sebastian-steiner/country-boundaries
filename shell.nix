{ pkgs ? import (fetchTarball "https://github.com/NixOS/nixpkgs/tarball/nixos-25.05") {} }:

pkgs.mkShellNoCC {
  packages = with pkgs; [
    (python313.withPackages (ps: with ps; [
      pandas
      jupyter
      ipython
      ]))
  ];

  shellHook = "jupyter notebook";
}