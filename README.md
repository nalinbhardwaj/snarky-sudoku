# Snarky Sudoku

## Zero-knowledge Sudoku using zk-SNARKs

### [Circuit](https://github.com/nalinbhardwaj/snarky-sudoku/blob/main/circuits/sudoku.circom)

The circom circuit takes two signals as input, a puzzle grid that is a public signal, and a private signal containing your solution grid. It verifies your solution matches the public unsolved grid, and meets all the constraints necessary for a valid sudoku solution. It can be broken down into the following steps roughly:

- Verify input grids are "valid".
	- Every entry of puzzle grid must constrain `0 <= puzzle[i][j] <= 9`. 0 are used to mark empty cells.
	- Every entry of solution grid must constrain `1 <= solution[i][j] <= 9`, and further, if `puzzle[i][j]` is non-zero, `puzzle[i][j]` must be equal to `solution[i][j]`.
	- Both of the range checks are implemented using the [`InRange`](https://github.com/nalinbhardwaj/snarky-sudoku/blob/main/circuits/sudoku.circom#L4-L19) template, which itself uses [circomlib](https://github.com/iden3/circomlib) comparators.
- Verify that every row, column and subgrid have all numbers 1...9 exactly once.
	- This is implemented using the [`ContainsAll`](https://github.com/nalinbhardwaj/snarky-sudoku/blob/main/circuits/sudoku.circom#L21-L38) template. This uses a simple equality check between all pairs of cell values in the subset being considered.

Interesting circuit notes:
- I was originally trying to implement `ContainsAll` using a bitmask and XORing with `2**grid[i][j]` for each element in the subset. Turns out you cannot do this because this bitmask cannot be expressed as linear combinations of signals.
- `component` arrays need to be initialised before usage, you cannot initialise them dynamically (otherwise proof verification will always fail). All initialised `component`s must be used, otherwise proof verification will fail.

### [Frontend client](https://github.com/nalinbhardwaj/snarky-sudoku/tree/main/client)

Simple `Next.js` app using the compiled `wasm` circuit for generating and verifying proofs.

It consists of two pages:

- `/solve`: This page has two textareas for a puzzle and solution grid, and you can use this to generate a proof for your solution.
- `/verify`: This page has a textarea for a puzzle grid and a textarea for a proof, and you can use this to verify a proof for a puzzle.

### Developer setup

Use `node v14` for compilation of the circuit. You can use `yarn circom:dev` and `yarn circom:prod` in the root of the repo to do so. To start the frontend client locally, use `yarn dev` in the `/client` folder.

This project was made as part of [ETH Summer](https://summer.ethuniversity.org).
