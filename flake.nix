{
    description = "flake for we2";

    inputs = {
        #nixpkgs.url = "github:NixOS/nixpkgs/nixos-23.11";
        nixpkgs.url = "github:NixOS/nixpkgs/nixos-unstable";
        flake-utils.url = "github:numtide/flake-utils";
    };

    outputs = { self, nixpkgs, flake-utils }:
        flake-utils.lib.eachDefaultSystem (system:
            let
                pkgs = import nixpkgs {
                    inherit system;
                };

            in 
            {
                devShells.default = pkgs.mkShell {
                    buildInputs = [
                        pkgs.nodePackages.typescript-language-server                       
                        pkgs.typescript
                        pkgs.vscode-langservers-extracted
                        pkgs.nodejs_21
                    ];
                };
            }
        );
}
