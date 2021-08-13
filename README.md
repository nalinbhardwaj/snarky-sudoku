# Snarky Sudoku

## Zero-knowledge Sudoku using zk-SNARKs

Circuit with two signal input: one public unsolved grid, where 0s mark unfilled cells, and one solved grid as a private input.

### Solve

### Verify

## Gotchas during circuit dev

- instantiate before use for arrays
- proof is invalid if you leave stuff unused
- contains all elements - bitmask non trivial, interesting workaround
