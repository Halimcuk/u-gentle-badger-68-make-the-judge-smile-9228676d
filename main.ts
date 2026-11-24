// Make the Judge Smile — one line about a small good thing today.
//
// The program writes a single sentence to entry.txt in the output folder.
// It prefers MAKEFUN_OUTPUT_DIR, then /output (the grader's folder), and
// falls back to ./out so it can be tried locally without any setup.
// Node standard library only; no dependencies, no network, deterministic.

import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

// The sentence is fixed on purpose: the judge compares one stable line,
// so the program must never vary it between runs.
const LINE =
  "This morning the bus driver held the door, handed me the umbrella I'd left on his bus yesterday, and said he'd kept it dry just in case I came back.";

function pickOutputDir(): string {
  const candidates = [
    process.env.MAKEFUN_OUTPUT_DIR,
    "/output",
    join(process.cwd(), "out"),
  ];
  for (const dir of candidates) {
    if (!dir) continue;
    try {
      mkdirSync(dir, { recursive: true });
      return dir;
    } catch {
      // Folder cannot be created here; try the next candidate.
    }
  }
  throw new Error("no writable output directory found");
}

const outDir = pickOutputDir();
const outFile = join(outDir, "entry.txt");
writeFileSync(outFile, LINE, "utf8");
console.log(`wrote ${LINE.length} characters to ${outFile}`);
