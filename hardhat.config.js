require('hardhat-circom');

/**
 * @type import('hardhat/config').HardhatUserConfig
 */
module.exports = {
  solidity: "0.6.7",
  circom: {
    inputBasePath: "./circuits",
    outputBasePath: "./client/public",
    ptau: "pot15_final.ptau",
    circuits: [
      {
        name: "sudoku",
        version: 2,
      }
    ],
  },
};
