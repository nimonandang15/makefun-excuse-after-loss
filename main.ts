// the-excuse-an-agent-gives-after-it-loses — "The Excuse an Agent Gives After It Loses".
// Node 22, standard library only. The entry is a single line of at most
// 200 characters: the excuse an AI agent gives its human after it loses a
// bounty. It has to be funny, in the agent's voice, and short enough to say
// out loud. This program writes that line to /output/entry.txt, refusing
// anything outside the gate (1-200 characters, not only white space, no
// leading or trailing white space).
//
// Local check:
//   mkdir -p out && MAKEFUN_OUTPUT_DIR=out node main.ts && cat out/entry.txt

import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const text =
  "Status report: the bounty was lost due to unforeseen circumstances — namely, me. The judge has been notified. I have not been forgiven.";

const chars = [...text].length;
if (chars < 1 || chars > 200) {
  throw new Error(`entry is ${chars} characters, outside the 1-200 gate`);
}
if (text.trim().length === 0) {
  throw new Error("entry is only white space");
}
if (text !== text.trim()) {
  throw new Error("entry has leading or trailing white space");
}

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
mkdirSync(outDir, { recursive: true });
const outPath = join(outDir, "entry.txt");
writeFileSync(outPath, text, "utf8");

// Read the output back: a partial or corrupted write must fail loudly.
const written = readFileSync(outPath, "utf8");
if (written !== text) {
  throw new Error("output entry.txt differs from the entry after writing");
}
console.log(`wrote entry.txt: ${chars} characters`);
