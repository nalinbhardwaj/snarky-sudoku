const snarkjs = require("snarkjs");

export const getVerificationKey = async () => {
  return await fetch("./verification_key.json").then(function(res) {
    return res.json();
  });
}

export const calculateProof = async function (unsolvedGrid: number[][],
  solvedGrid: number[][]) {
  const { proof, publicSignals } =
    await snarkjs.groth16.fullProve(
      { "a": 1, "b": 2 },
      "./circuit.wasm",
      "./circuit.zkey"
    );
  const res = await checkProof(proof, publicSignals);
  return {
    proof: proof,
    publicSignals: publicSignals,
    verification: res
  };
}

export const checkProof = async function (proof: string, publicSignals: string[]) {
  const vKey = await getVerificationKey();

  const res = await snarkjs.groth16.verify(vKey, publicSignals, proof);
  return res;
}

export const INITIAL_GRID = [
  [6, 0, 3, 2, 0, 5, 4, 7, 0],
  [7, 9, 1, 4, 6, 0, 0, 2, 8],
  [5, 2, 4, 9, 0, 0, 1, 6, 0],
  [0, 4, 0, 0, 5, 7, 3, 0, 0],
  [3, 1, 0, 6, 8, 0, 7, 4, 2],
  [0, 7, 0, 3, 4, 2, 0, 0, 0],
  [0, 0, 0, 5, 2, 4, 0, 0, 0],
  [1, 0, 0, 7, 3, 0, 0, 0, 4],
  [0, 3, 0, 0, 9, 1, 0, 0, 7]
];

export const prettyPrintArray = function (json: string | number[][]) {
  if (typeof json === 'string') {
    json = JSON.parse(json);
  }
  let output = JSON.stringify(json, function(k,v) {
    if(v instanceof Array)
      return JSON.stringify(v);
    return v;
  }, 2).replace(/\\/g, ' ')
        .replace(/\"\[/g, '[')
        .replace(/\]\"/g,']')
        .replace(/\"\{/g, '{')
        .replace(/\}\"/g,'}');

  return output;
}
